import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { markdown } from 'utils/markdown';
import Warnings from './Warnings';
import { isEmpty } from 'utils/commonUtil';

class CommentEditor extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleEmoji = this.toggleEmoji.bind(this);
    this.togglePreview = this.togglePreview.bind(this);
    this.handleCloseWarning = this.handleCloseWarning.bind(this);
    this.addEmoji = this.addEmoji.bind(this);
    this.state = {
      nick: createRef(),
      mail: createRef(),
      link: createRef(),
      commentContent: createRef(),
      emojiHidden: true,
      previewHidden: true,
      previewContent: '',
      warning: '',
    };
  }

  handleSubmit(id, parentId) {
    const nick = this.state.nick.current.value;
    const mail = this.state.mail.current.value;
    const link = this.state.link.current.value;
    const content = this.state.commentContent.current.value;
    if (isEmpty(nick)) {
      this.setState({ warning: '昵称不能为空' });
      return;
    }
    if (isEmpty(mail)) {
      this.setState({ warning: '邮箱不能为空' });
      return;
    }
    if (isEmpty(content)) {
      this.setState({ warning: '评论内容不能为空' });
      return;
    }
    this.props.handleSubmit({
      id: id,
      parentId: parentId,
      nick: nick,
      mail: mail,
      link: link,
      content: content,
    });
    // 清空评论内容
    // this.state.commentContent.current.value = '';
    this.setState({ warning: '' });
  }

  handleCloseWarning() {
    this.setState({ warning: '' });
  }

  toggleEmoji() {
    const { emojiHidden } = this.state;
    this.setState({
      emojiHidden: !emojiHidden,
    });
  }

  togglePreview() {
    const { value } = this.state.commentContent.current;
    if (!value) {
      return;
    }
    const { previewHidden } = this.state;
    this.setState({
      previewHidden: !previewHidden,
      previewContent: value,
    });
  }

  addEmoji(e) {
    const { native } = e;
    const value = this.state.commentContent.current.value;
    // eslint-disable-next-line react/no-direct-mutation-state
    this.state.commentContent.current.value = value + native;
  }

  render() {
    const { id, parentId } = this.props;
    let warning = isEmpty(this.state.warning) ? this.props.warning : this.state.warning;
    if (!isEmpty(warning) && warning === 'OK') {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.commentContent.current.value = '';
    }
    return (
      <div className="x-comment-panel">
        <div className="x-comment-wrap">
          <div className="x-comment-header item3">
            <input
              name="nick"
              placeholder="昵称"
              className="x-comment-nick x-comment-input"
              type="text"
              ref={this.state.nick}
            />
            <input
              name="mail"
              placeholder="邮箱"
              className="x-comment-mail x-comment-input"
              type="email"
              ref={this.state.mail}
            />
            <input
              name="link"
              placeholder="网址(http://)"
              className="x-comment-link x-comment-input"
              type="text"
              ref={this.state.link}
            />
          </div>
          <div className="x-comment-edit">
            <textarea
              id="x-comment-editor"
              className="x-comment-editor x-comment-input"
              placeholder="写下你的想法..."
              ref={this.state.commentContent}
            />
          </div>
          <div className="x-comment-rot">
            <div className="x-comment-col x-comment-col-30">
              <span
                title="表情"
                className={classNames('x-comment-icon x-comment-emoji-btn', {
                  actived: !this.state.emojiHidden,
                })}
                onClick={() => this.toggleEmoji()}>
                <span className="iconfont icon-smile" />
              </span>
              <span
                title="预览"
                className={classNames('x-comment-icon x-comment-preview-btn', {
                  actived: !this.state.previewHidden,
                })}
                onClick={() => this.togglePreview()}>
                <span className="iconfont icon-preview" />
              </span>
            </div>
            <div className="x-comment-col x-comment-col-70 text-right">
              <button
                type="button"
                title="Cmd|Ctrl+Enter"
                className="x-comment-submit x-comment-btn"
                onClick={() => this.handleSubmit(id, parentId)}>
                提交
              </button>
            </div>
          </div>
          <div
            className={classNames('x-comment-input x-comment-preview', {
              hidden: this.state.previewHidden,
            })}>
            {isEmpty(this.state.previewContent) ? '' : markdown(this.state.previewContent)}
          </div>

          <div className="x-comment-warning">
            {isEmpty(warning) ? (
              ''
            ) : (
              <Warnings warning={warning} handleCloseWarning={() => this.handleCloseWarning()} />
            )}
          </div>
        </div>
      </div>
    );
  }
}

CommentEditor.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  parentId: PropTypes.number,
  warning: PropTypes.string,
};

export default CommentEditor;
