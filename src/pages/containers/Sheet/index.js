import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Viewer from 'viewerjs';
import $ from 'jquery';
import { ROUTER } from './constants';
import commonApi from 'api/common';
import sheetApi from 'api/sheet';
import { markdown } from 'utils/markdown';
import Comment from 'components/Comments';
import Layout from 'components/Layout';
import { isEmpty } from 'utils/commonUtil';

class Sheet extends React.PureComponent {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const sheetContent = await sheetApi.detail(slug);
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, sheetContent: sheetContent.data, menus: menus.data };
  }
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  componentDidMount() {}

  initViewer() {
    const write = $('#write');
    if (isEmpty(write)) {
      return;
    }
    // viewer 图片灯箱功能
    new Viewer(write[0], {
      inline: false,
    });
  }

  render() {
    const { options, sheetContent, settings, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(sheetContent) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { title, thumbnail, id, originalContent } = sheetContent;
    const sheetSetting = {
      ...this.props.settings,
      name: title,
      patternImg: thumbnail,
      enabled_index_cover_height: false,
    };
    return (
      <Layout
        loading={loading}
        settings={sheetSetting}
        options={options}
        isPost={false}
        blogTitle={title}
        menus={menus}>
        <div>
          <div
            className="container md-content mx-auto px-4 mt-16 max-w-6xl
             tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd content-container"
            id="write">
            {markdown(originalContent)}
          </div>
          <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd">
            <Comment sheet={'sheets'} id={id} settings={settings} options={options} />
          </div>
        </div>
      </Layout>
    );
  }
}

Sheet.propTypes = {
  settings: PropTypes.object,
  options: PropTypes.array,
  sheetContent: PropTypes.object,
  router: PropTypes.object,
  menus: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Sheet);
