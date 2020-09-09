import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import commonApi from 'api/common';
import categoryApi from 'api/category';
import ReactPaginate from 'react-paginate';
import { CATEGORY_PAGE, POST_LIST, ROUTER } from './constants';
import Layout from 'components/Layout';
import { isEmpty, obtainValueInArray } from 'utils/commonUtil';
import PostCard from 'components/PostCard';

class Category extends React.PureComponent {
  static async getInitialProps({ query }) {
    const { slug } = query;
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const size = isEmpty(options.data) ? 9 : obtainValueInArray(options.data, 'post_index_page_size');
    const categoryList = await categoryApi.getBySlug({ slug, page: 0, size });
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, posts: categoryList.data, menus: menus.data };
  }

  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      page: 0,
      size: 9,
    };
  }
  componentDidMount() {}

  handlePageClick(data) {
    const { selected } = data;
    const { page } = this.state;
    if (selected === page) {
      return;
    }
    const { options } = this.props;
    const size = isEmpty(options) ? 9 : obtainValueInArray(options, 'post_index_page_size');
    const { slug } = this.props.router.query;
    this.setState({ page: selected });
    this.props.getPostList({ size, page: selected, slug });
  }

  render() {
    const { settings, postList, options, posts, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(posts) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { tag_patternimg } = settings;

    const { slug } = this.props.router.query;
    // 系统配置项
    const categorySettings = { ...settings, name: slug, patternImg: tag_patternimg, enabled_index_cover_height: false };

    const { content, pages, hasPrevious, hasNext } = isEmpty(postList) ? posts : postList;
    return (
      <Layout loading={loading} options={options} settings={categorySettings} blogTitle={slug} menus={menus}>
        <div className="container mx-auto px-4 content-container">
          <div
            className="posts grid lg:grid-cols-3 md:grid-cols-2
          sm:grid-cols-2 xs:grid-cols-1 lg:gap-6 md:gap-4 sm:gap-3 mt-4">
            {content.map((post, index) => (
              <PostCard post={post} postIndex={index} settings={categorySettings} key={index} />
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
  postList: state[CATEGORY_PAGE].postList,
  router: state[ROUTER],
});

const mapDispatchToProps = dispatch => ({
  getPostList: param => {
    categoryApi.getBySlug(param).then(res => {
      dispatch({ type: POST_LIST, payload: res.data });
    });
  },
});

Category.propTypes = {
  options: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  postList: PropTypes.object.isRequired,
  posts: PropTypes.object,
  router: PropTypes.object,
  getPostList: PropTypes.func.isRequired,
  menus: PropTypes.array,
};

// const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default connect(mapStateToProps, mapDispatchToProps)(Category);
