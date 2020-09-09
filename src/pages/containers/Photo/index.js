import React from 'react';
import PropTypes from 'prop-types';
import commonApi from 'api/common';
import photoApi from 'api/photo';
import { connect } from 'react-redux';
import Layout from 'components/Layout';
import { isEmpty, archivePhotos } from 'utils/commonUtil';
import 'justifiedGallery/dist/js/jquery.justifiedGallery.min';
import $ from 'jquery';
import { ROUTER } from './constants';
import Viewer from 'viewerjs';

class Photo extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const photoList = await photoApi.latest();
    const menus = await commonApi.getTreeMenus();
    return {
      options: options.data,
      settings: settings.data,
      photoList: archivePhotos(photoList.data),
      menus: menus.data,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      photos: [],
    };
  }
  componentDidMount() {
    if (typeof $.fn.justifiedGallery === 'function') {
      const galleryItem = $('.justified-gallery > p > .gallery-item');
      if (galleryItem.length > 0) {
        galleryItem.unwrap();
      }
      $('.justified-gallery').justifiedGallery({ rowHeight: 230, margins: 4 });
    }
    this.initViewer();
  }

  initViewer() {
    const write = $('#gallery-content');
    if (isEmpty(write)) {
      return;
    }
    // viewer 图片灯箱功能
    new Viewer(write[0], {
      inline: false,
    });
  }

  render() {
    const { settings, options, photoList, menus } = this.props;
    const loading = isEmpty(photoList) || isEmpty(settings) || isEmpty(menus);
    if (loading) {
      return <Layout menus={menus} loading={loading} />;
    }
    const { photos_patternimg } = settings;

    const { slug } = this.props.router.query;
    const photoSettings = { ...settings, name: slug, patternImg: photos_patternimg, enabled_index_cover_height: false };
    return (
      <Layout loading={loading} options={options} settings={photoSettings} blogTitle={slug} menus={menus}>
        <div className="container mx-auto px-4 content-container">
          <div
            className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed
          sm:leading-normal ph-container cn-pd photos-page content-container">
            <div className="photos-box article-content" id="gallery-content">
              <div>
                {photoList.map((teams, index) => {
                  const { team, photos } = teams;
                  return (
                    <div key={index}>
                      <h3 className="w-full m-4">{isEmpty(team) ? '默认相册' : team}</h3>
                      <div className="justified-gallery">
                        {photos.map((photo, i) => {
                          return (
                            <a className="gallery-item jg-entry entry-visible" href="javascript:void(0)" key={i}>
                              <img src={photo.url} data-src={photo.url} alt={photo.name} />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

Photo.propTypes = {
  options: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  photoList: PropTypes.array.isRequired,
  router: PropTypes.object,
  menus: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Photo);
