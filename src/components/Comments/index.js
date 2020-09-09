import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { COMMENT, CREATE_COMMENT } from './constants';
import commentApi from 'api/comment';
import { connect } from 'react-redux';
import { isEmpty } from 'utils/commonUtil';
import CommentEditor from './CommentEditor';
import CommentNode from './CommentNode';
import ReactPaginate from 'react-paginate';

class Comment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.state = {
      page: 0,
      size: 10,
      gravatarSource: '//cdn.v2ex.com/gravatar',
      parent: new Map(),
      warnings: [],
    };
  }

  componentDidMount() {
    const { sheet, id } = this.props;
    const { page, size } = this.state;
    const param = {
      target: sheet,
      targetId: id,
      view: 'tree_view',
      page,
      size,
    };
    this.props.getComments(param);
  }

  getCommentCard(comments, clazz) {
    if (!comments || comments.length < 1) {
      return;
    }
    return comments.map((comment, index) => {
      const { parent } = this.state;
      parent.set(comment.id, comment.author);
      const parentName = !comment.parentId ? '' : parent.get(comment.parentId);
      return (
        <div className={classNames('x-comment-card', clazz)} key={index} id={comment.id}>
          <img className="x-comment-img" alt="" src={this.avatar(comment)} />
          {<CommentNode comment={comment} parentName={parentName} handleSubmit={e => this.handleSubmit(e)} />}

          {!comment.children || comment.children.length < 1 ? (
            ''
          ) : (
            <div className="vquote bg-light .border-0">{this.getCommentCard(comment.children)}</div>
          )}
        </div>
      );
    });
  }

  avatar(comment) {
    const { comment_gravatar_default } = this.props.options;
    const gravatarDefault = isEmpty(comment_gravatar_default) ? 'mm' : comment_gravatar_default;
    return this.state.gravatarSource + `/${comment.gravatarMd5}?s=256&d=` + gravatarDefault;
  }

  handleClickReply(id) {
    const { reply } = this.state;
    this.setState({
      replyId: id,
      reply: !reply,
    });
  }

  getEditor(e) {
    const { id, parentId, warning } = e;
    return <CommentEditor handleSubmit={e => this.handleSubmit(e)} id={id} parentId={parentId} warning={warning} />;
  }

  handleSubmit(e) {
    const { id, nick, mail, link, content } = e;
    this.props.createComment({
      author: nick,
      authorUrl: link,
      content: content,
      email: mail,
      postId: this.props.id,
      parentId: id,
      target: this.props.sheet,
    });
  }

  handlePageClick(data) {
    const { selected } = data;
    const { page, size } = this.state;
    if (selected === page) {
      return;
    }
    const { sheet, id } = this.props;
    this.setState({ page: selected });
    const param = {
      target: sheet,
      targetId: id,
      view: 'tree_view',
      page: selected,
      size,
    };

    this.props.getComments(param);
  }

  render() {
    const { comments, postComment } = this.props;
    if (isEmpty(Object.keys(comments))) {
      return this.getEditor({ id: 0, warning: '' });
    }
    let commentList = [];
    let count = 0;
    let hasPrevious = false;
    let hasNext = false;
    let pages = 0;
    if (!comments) {
      commentList = [];
    } else {
      const { content, commentCount, hasPrevious: previous, hasNext: next, pages: pageNum } = comments;
      commentList = content;
      count = commentCount;
      hasPrevious = previous;
      hasNext = next;
      pages = pageNum;
    }

    let warning = isEmpty(postComment) ? '' : postComment;
    return (
      <div className="main-comments font-sans">
        {this.getEditor({ id: 0, warning })}
        <div className="x-comment-count">
          <span className="x-comment-num">{count}</span> 评论
        </div>
        {commentList.length < 1 ? '' : <div className="x-comment-cards">{this.getCommentCard(commentList)}</div>}
        <nav className="pagination flex flex-row justify-center mt-8" role="navigation" aria-label="pagination">
          {!isEmpty(pages) && pages > 0 ? (
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
          ) : (
            ''
          )}
        </nav>
      </div>
    );
  }
}

Comment.propTypes = {
  createComment: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  comments: PropTypes.object,
  sheet: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  settings: PropTypes.object,
  options: PropTypes.array,
  postComment: PropTypes.string,
};

const mapStateToProps = state => ({
  comments: state[COMMENT].comments,
  postComment: state[COMMENT].postComment,
});

const mapDispatchToProps = dispatch => ({
  getComments: param => {
    commentApi.listComments(param).then(res => {
      dispatch({ type: COMMENT, payload: res.data });
    });
  },

  createComment: param => {
    commentApi.createComment(param).then(res => {
      dispatch({ type: CREATE_COMMENT, payload: res.message });
    });
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(Comment);
