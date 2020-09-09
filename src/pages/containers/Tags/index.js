import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'components/Tag';
import Layout from 'components/Layout';
import { connect } from 'react-redux';
import { ROUTER } from './constants';
import commonApi from 'api/common';
import tagApi from 'api/tag';
import { isEmpty } from 'utils/commonUtil';

class Tags extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const tagList = await tagApi.list();
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, tagList: tagList.data, menus: menus.data };
  }

  componentDidMount() {}

  render() {
    const { settings, tagList, options, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(tagList) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { tag_patternimg } = settings;
    const tagsSettings = { settings, name: '标签列表', patternImg: tag_patternimg, enabled_index_cover_height: false };
    return (
      <Layout
        loading={loading}
        options={options}
        settings={tagsSettings}
        isPost={false}
        blogTitle={'标签列表'}
        menus={menus}>
        <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd content-container">
          <p className="flex flex-row justify-start flex-wrap">
            {tagList.map((tag, index) => (
              <Tag slug={`/tag/${tag.slug}`} name={tag.name} postCount={tag.postCount} key={index} />
            ))}
          </p>
        </div>
      </Layout>
    );
  }
}

Tags.propTypes = {
  options: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  tagList: PropTypes.array.isRequired,
  router: PropTypes.object,
  menus: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
