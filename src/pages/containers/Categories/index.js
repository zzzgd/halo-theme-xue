import React from 'react';
import PropTypes from 'prop-types';
import Tag from 'components/Tag';
import Layout from 'components/Layout';
import { connect } from 'react-redux';
import { ROUTER } from './constants';
import commonApi from 'api/common';
import categoryApi from 'api/category';
import { isEmpty } from 'utils/commonUtil';

class Categories extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const categoryList = await categoryApi.list();
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, categoryList: categoryList.data, menus: menus.data };
  }

  render() {
    const { settings, categoryList, options, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(categoryList) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }

    const { tag_patternimg } = settings;
    const categoriesSettings = {
      settings,
      name: '归档列表',
      patternImg: tag_patternimg,
      enabled_index_cover_height: false,
    };
    return (
      <Layout
        loading={loading}
        options={options}
        settings={categoriesSettings}
        isPost={false}
        blogTitle={'归档列表'}
        menus={menus}>
        <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd content-container">
          <p className="flex flex-row justify-start flex-wrap">
            {categoryList.map((category, index) => (
              <Tag
                slug={`/category/${category.slug}`}
                name={category.name}
                postCount={category.postCount}
                key={index}
              />
            ))}
          </p>
        </div>
      </Layout>
    );
  }
}

Categories.propTypes = {
  options: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  categoryList: PropTypes.array.isRequired,
  router: PropTypes.object,
  menus: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
