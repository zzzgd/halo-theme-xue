import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import { POST_LIST, ROUTER, SEARCH_PAGE } from './constants';
import postApi from 'api/post';
import commonApi from 'api/common';
import ReactPaginate from 'react-paginate';
import { connect } from 'react-redux';
import { Router } from '../../../../server/routes';
import { getFormatDate, isEmpty } from 'utils/commonUtil';
import Layout from 'components/Layout';

class Search extends React.PureComponent {
  static async getInitialProps({ query }) {
    const { keyword } = query;
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const menus = await commonApi.getTreeMenus();
    const postList = await postApi.search({ page: 0, size: 10, keyword });
    const posts = postList.data;
    const { content } = posts;
    let latestPosts = [];
    if (isEmpty(content)) {
      const latestPostList = await postApi.latest({ size: 0, page: 0 });
      latestPosts = latestPostList.data;
    }
    return {
      options: options.data,
      settings: settings.data,
      menus: menus.data,
      posts: postList.data,
      latestPosts: latestPosts,
    };
  }

  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      size: 10,
      value: createRef(),
    };
  }

  handlePageClick(data) {
    const { keyword } = this.props.router.query;
    const { selected } = data;
    const { page } = this.state;
    if (selected === page) {
      return;
    }
    this.setState({ page: selected });
    this.props.getPostResultList({ ...this.state, page: selected, keyword });
  }

  handleSubmit() {
    const currentValue = this.state.value.current.value;
    if (isEmpty(currentValue)) {
      return;
    }
    Router.push(`/search?keyword=${currentValue}`);
  }

  searchPostResultList(posts) {
    return (
      <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ph-container cn-pd">
        <ul className="search-no-results">
          {posts.map((post, index) => {
            return (
              <li key={index}>
                <a href={`/post/${post.id}`} className="ah-hf ah-hv">
                  <span className="ah-dt">{getFormatDate(post.createTime)}</span>
                  <span className="ah-tt">{post.title}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  getNotFountResult(latestPosts) {
    const { content } = latestPosts;
    const posts = !content || content.length < 0 ? [] : content;

    return (
      <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ph-container cn-pd">
        <div id="post-list" className="post-list inner">
          <div className="">
            <form className="s-search" onSubmit={e => this.handleSubmit(e)}>
              <label className="sh-lab sh-br">
                <input
                  className="sh-ipt"
                  maxLength="30"
                  name="keyword"
                  spellCheck="false"
                  placeholder="Search"
                  autoComplete="off"
                  ref={this.state.value}
                />
                <i className="sh-icon iconfont icon-search"> </i>
              </label>
            </form>
          </div>
          <section className="no-results not-found">
            <header className="not-found-header">
              <h1 className="not-found-title">Sorry! Nothing Found...</h1>
            </header>
            <div className="page-content">
              <div className="sorry">
                <p>Checkout something funny.</p>
                <div className="sorry-inner">
                  <ul className="search-no-results">
                    {posts.map((post, index) => {
                      return (
                        <li key={index}>
                          <a href={`/post/${post.id}`} className="ah-hf ah-hv">
                            <span className="ah-dt">{getFormatDate(post.createTime)}</span>
                            <span className="ah-tt">{post.title}</span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }

  render() {
    const { options, posts, postList, menus, settings, latestPosts } = this.props;
    const loading = isEmpty(options) || isEmpty(posts) || isEmpty(settings) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }

    const { keyword } = this.props.router.query;
    const name = `关于「${keyword}」的搜索结果`;
    const { content, pages, hasPrevious, hasNext } = isEmpty(postList) ? posts : postList;
    const postContentList = isEmpty(content) ? [] : content;
    const count = isEmpty(pages) ? 0 : pages;
    return (
      <Layout loading={loading} menus={menus} options={options} settings={settings} blogTitle={name}>
        <div>
          {isEmpty(postContentList) || count < 1
            ? this.getNotFountResult(latestPosts)
            : this.searchPostResultList(postContentList)}

          {count < 1 ? (
            ''
          ) : (
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
          )}
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  postList: state[SEARCH_PAGE].postList,
  router: state[ROUTER],
});

const mapDispatchToProps = dispatch => ({
  getPostResultList: param => {
    postApi.search(param).then(res => {
      dispatch({ type: POST_LIST, payload: res.data });
    });
  },
});

Search.propTypes = {
  options: PropTypes.array,
  settings: PropTypes.object,
  postList: PropTypes.object,
  posts: PropTypes.object,
  userProfile: PropTypes.object,
  router: PropTypes.object,
  menus: PropTypes.array,
  latestPosts: PropTypes.array,
  getPostResultList: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
