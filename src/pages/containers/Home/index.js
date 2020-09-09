import React from 'react';
import PropTypes from 'prop-types';
import commonApi from 'api/common';
import postApi from 'api/post';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';
import { HOME_PAGE, POST_LIST } from './constants';
import Layout from 'components/Layout';
import { obtainValueInArray, isEmpty } from 'utils/commonUtil';
import PostCard from 'components/PostCard';

class Home extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const size = isEmpty(options.data) ? 9 : obtainValueInArray(options.data, 'post_index_page_size');
    const postList = await postApi.list({ page: 0, size });
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, postList: postList.data, menus: menus.data };
  }
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      page: 0,
      size: 9,
    };
  }

  handlePageClick(data) {
    const { selected } = data;
    const { page } = this.state;
    if (selected === page) {
      return;
    }
    const { size } = this.state;
    this.setState({ page: selected });
    this.props.getPostList({ size, page: selected });
  }

  render() {
    const { settings, postList, options, posts, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(postList) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { home_title, home_cover } = settings;
    const blogUrl = obtainValueInArray(options, 'blog_url');
    const blogTitle = obtainValueInArray(options, 'blog_title');
    const { content, pages, hasPrevious, hasNext } = isEmpty(posts) ? postList : posts;
    const title = isEmpty(home_title) ? blogTitle : home_title;
    return (
      <Layout
        loading={loading}
        blogTitle={title}
        settings={{ ...settings, patternImg: home_cover }}
        options={options}
        menus={menus}>
        <div className="container mx-auto px-4 content-container">
          <div
            className="posts grid lg:grid-cols-3 md:grid-cols-2
          sm:grid-cols-2 xs:grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 mt-4">
            {content.map((post, index) => (
              <PostCard post={post} postIndex={index} settings={settings} key={index} blogUrl={blogUrl} />
            ))}
          </div>
          <nav className="pagination flex flex-row justify-center mt-8" role="navigation" aria-label="pagination">
            <ReactPaginate
              previousLabel={hasPrevious ? <span className="iconfont icon-left"> </span> : ''}
              nextLabel={hasNext ? <span className="iconfont icon-right"> </span> : ''}
              previousLinkClassName={'pagination-circle'}
              nextLinkClassName={'pagination-circle'}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination-list flex flex-row'}
              pageClassName={''}
              pageLinkClassName={'pagination-circle'}
              activeLinkClassName={'is-current'}
              pageCount={pages}
              // initialPage={1}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
            />
          </nav>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  posts: state[HOME_PAGE].postList,
});

const mapDispatchToProps = dispatch => ({
  getPostList: param => {
    postApi.list(param).then(res => {
      dispatch({ type: POST_LIST, payload: res.data });
    });
  },
});

Home.propTypes = {
  options: PropTypes.array,
  settings: PropTypes.object,
  postList: PropTypes.object,
  posts: PropTypes.object,
  router: PropTypes.object,
  getPostList: PropTypes.func.isRequired,
  menus: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
