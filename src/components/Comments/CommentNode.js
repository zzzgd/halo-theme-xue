import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty, timeAgo, decodeHTML } from 'utils/commonUtil';
import CommentEditor from './CommentEditor';
import ua from 'ua-parser-js';
import { markdown } from 'utils/markdownUtil';
import $ from 'jquery';
import Viewer from 'viewerjs';

class CommentNode extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClickReply = this.handleClickReply.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      reply: false,
      content: '',
    };
  }

  componentDidMount() {
    const { comment } = this.props;
    if (!isEmpty(comment)) {
      const { content, id } = comment;

      this.setState(
        {
          content: markdown(decodeHTML(content)),
        },
        () => {
          const commentNode = $(`#commentNode-${id}`);
          if (!isEmpty(commentNode)) {
            new Viewer(commentNode[0], {
              inline: false,
            });
          }
        }
      );
    }
  }

  handleClickReply() {
    const { reply } = this.state;
    this.setState({
      reply: !reply,
    });
  }

  getOs(userAgent) {
    const parser = new ua();
    parser.setUA(userAgent);
    const result = parser.getResult();
    return result.os.name + ' ' + result.os.version;
  }

  getBrowserName(userAgent) {
    const parser = new ua();
    parser.setUA(userAgent);
    const result = parser.getResult();
    return result.browser.name + ' ' + result.browser.version;
  }

  handleSubmit(e) {
    this.props.handleSubmit(e);
  }

  getEditor(id, parentId) {
    return <CommentEditor handleSubmit={e => this.handleSubmit(e)} id={id} parentId={parentId} />;
  }

  render() {
    const { comment, parentName } = this.props;
    return (
      <div className="x-comment-h" id={`commentNode-${comment.id}`}>
        <div className="x-comment-head">
          <a className="x-comment-nick" href={comment.authorUrl} target="_blank" rel="noopener noreferrer">
            {comment.author}
          </a>
          <span className="x-comment-sys">{this.getBrowserName(comment.userAgent)}</span>
          <span className="x-comment-sys">{this.getOs(comment.userAgent)}</span>
        </div>
        <div className="x-comment-meta">
          <span className="x-comment-time">{timeAgo(comment.createTime)}</span>
          <span className="x-comment-at" onClick={() => this.handleClickReply(comment.id)}>
            {this.state.reply ? '取消回复' : '回复'}
          </span>
        </div>
        <div className="x-comment-content md-content" data-expand="查看更多...">
          {!parentName ? '' : <span className="comment-author-tag">@{parentName} </span>}
          {this.state.content}
        </div>

        <div className="x-comment-reply-wrapper">
          {this.state.reply ? this.getEditor(comment.id, comment.parentId) : ''}
        </div>
      </div>
    );
  }
}

CommentNode.propTypes = {
  comment: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  parentName: PropTypes.string,
};

export default CommentNode;
