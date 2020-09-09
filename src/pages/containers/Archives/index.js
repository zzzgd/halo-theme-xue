import React from 'react';
import PropTypes from 'prop-types';
import { getDateMonth, getFormatDate, isEmpty } from 'utils/commonUtil';
import { ROUTER } from './constants';
import Layout from 'components/Layout';
import commonApi from 'api/common';
import archivesApi from 'api/archives';
import { connect } from 'react-redux';

class Archives extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const postList = await archivesApi.listByYear();
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, archiveData: postList.data, menus: menus.data };
  }
  componentDidMount() {}

  getArchiveMonth(posts) {
    if (isEmpty(posts)) {
      posts = [];
    }
    let month = '';
    let tree = '';
    for (let i = 0; i < posts.length; i++) {
      const { id, title, createTime } = posts[i];
      const href = `/post/${id}`;
      const currentMonth = getDateMonth(createTime);
      const formatDate = getFormatDate(createTime);
      if (currentMonth !== month) {
        tree += `<header class="absolute mh-hd af-bg-fff mh-bg "> ${currentMonth} 月</header>`;
        month = currentMonth;
      }
      tree += `<a class="ah-hf ah-hv" href=${href}>
                            <span class="ah-dt">${formatDate}</span>
                            <span class="ah-tt">${title} </span>
                         </a>`;
    }
    return tree;
  }

  sortPost(posts) {
    if (isEmpty(posts)) {
      posts = [];
    }
    posts.sort((a, b) => {
      return b['createTime'] - a['createTime']; //localeCompare 字符串比较
    });
    return posts;
  }

  render() {
    const { options, settings, archiveData, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(archiveData) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }

    const { archives_patternimg } = settings;
    const archiveSettings = {
      ...settings,
      name: '归档',
      patternImg: archives_patternimg,
      enabled_index_cover_height: false,
    };
    let archiveTree = '';
    if (archiveData.length > 0) {
      for (let i = 0; i < archiveData.length; i++) {
        const post = archiveData[i];
        const { year, posts } = post;
        this.sortPost(posts);
        archiveTree += `<section class="arch-year">
                        <h1 class="year-title relative">${year}</h1>
                        <div class="relative pl-12">
                            ${this.getArchiveMonth(posts)}
                        </div>
                    </section>`;
      }
    }
    return (
      <Layout
        loading={loading}
        options={options}
        settings={archiveSettings}
        blogTitle={'归档'}
        isPost={false}
        menus={menus}>
        <div
          className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd content-container"
          dangerouslySetInnerHTML={{ __html: archiveTree }}
        />
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

Archives.propTypes = {
  settings: PropTypes.object,
  options: PropTypes.array,
  archiveData: PropTypes.array,
  menus: PropTypes.array,
};

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(Archives);
