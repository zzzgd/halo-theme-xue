import React from 'react';
import PropTypes from 'prop-types';
import marked from 'marked';
import ReactPaginate from 'react-paginate';
import Layout from 'components/Layout';
import { connect } from 'react-redux';
import { formatDate2CHN, isEmpty, obtainValueInArray } from 'utils/commonUtil';
import { JOURNAL_LIST, JOURNALS_PAGE, ROUTER } from './constants';
import journalsApi from 'api/journals';
import commonApi from 'api/common';
import userApi from 'api/user';

class Journals extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const userProfile = await userApi.getProfile();
    const size = isEmpty(options.data) ? 9 : obtainValueInArray(options.data, 'post_index_page_size');
    const journalList = await journalsApi.list({ page: 0, size });
    const menus = await commonApi.getTreeMenus();
    return {
      options: options.data,
      settings: settings.data,
      journalInitialList: journalList.data,
      userProfile: userProfile.data,
      menus: menus.data,
    };
  }
  constructor(props) {
    super(props);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      page: 0,
      size: 9,
    };
  }
  componentDidMount() {
    // this.props.getJournalList({ ...this.state });
  }

  handlePageClick(data) {
    const { selected } = data;
    const { page } = this.state;
    if (selected === page) {
      return;
    }
    const { options } = this.props;
    const size = isEmpty(options) ? 9 : obtainValueInArray(options, 'post_index_page_size');
    this.setState({ page: selected });
    this.props.getJournalList({ ...this.state, size, page: selected });
  }

  render() {
    const { options, journalList, settings, userProfile, journalInitialList, menus } = this.props;
    const loading =
      isEmpty(options) || isEmpty(settings) || isEmpty(journalInitialList) || isEmpty(userProfile) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { journals_patternimg } = settings;
    const journalSettings = {
      ...settings,
      name: '日志',
      patternImg: journals_patternimg,
      enabled_index_cover_height: false,
    };
    const { content, pages, hasPrevious, hasNext } = isEmpty(journalList) ? journalInitialList : journalList;
    const { avatar, nickname } = userProfile;
    const blogUrl = obtainValueInArray(options, 'blog_url');
    return (
      <Layout
        loading={loading}
        settings={journalSettings}
        options={options}
        isPost={false}
        blogTitle={'日志'}
        menus={menus}>
        <div>
          <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd content-container">
            <div className="journal-tree">
              <ol className="comment-list">
                {content.map((journal, index) => {
                  const suffix = index % 2 === 0 ? 'odd' : 'even';
                  return (
                    <li id="li-comment-611" className={`tree-hole-body tree-hole-${suffix}`} key={index}>
                      <div id="comment-611">
                        <img className="avatar" src={avatar} alt={nickname} width="40" height="40" />
                        <div className="tree-hole-box">
                          <div className="tree-hole-author">
                            <a href={blogUrl} rel="external nofollow">
                              aa
                            </a>{' '}
                            {formatDate2CHN(journal.createTime)}
                          </div>
                          <p>{marked(journal.content)}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
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

Journals.propTypes = {
  options: PropTypes.array.isRequired,
  settings: PropTypes.object.isRequired,
  journalList: PropTypes.object,
  journalInitialList: PropTypes.object,
  router: PropTypes.object,
  getJournalList: PropTypes.func.isRequired,
  userProfile: PropTypes.object,
  menus: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state,
  journalList: state[JOURNALS_PAGE].journalList,
  router: state[ROUTER],
});

const mapDispatchToProps = dispatch => ({
  getJournalList: param => {
    journalsApi.list(param).then(res => {
      dispatch({ type: JOURNAL_LIST, payload: res.data });
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Journals);
