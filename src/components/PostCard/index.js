import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { formatDate, isEmpty } from 'utils/commonUtil';
import Link from 'next/link';
import LazyLoad from 'react-lazyload';
import Spiner from '../Spiner';

class PostCard extends React.PureComponent {
  substring(str) {
    if (isEmpty(str)) {
      return str;
    }
    if (str.length < 40) {
      return str;
    }
    return str.substring(0, 40) + '...';
  }

  getCardImg(param) {
    const {
      thumbnail,
      card_random_cover,
      postIndex,
      randomImgNum,
      card_random_cover_img_suffix,
      blogUrl,
      summary,
      title,
      id,
      card_hover_summary,
    } = param;
    let cardImg;
    if (!isEmpty(thumbnail)) {
      cardImg = (
        <LazyLoad once={true} placeholder={<Spiner />} debounce={500}>
          <Link href={`/post/${id}`}>
            <figure className={classNames('', { 'effect-jazz': card_hover_summary })}>
              <img
                src={thumbnail}
                className="img-cover img-cover-bg"
                style={{ height: '200', width: '100%' }}
                alt={title}
              />
              {card_hover_summary ? (
                <figcaption>
                  <p className="post-excerpt font-sans">
                    <span>{this.substring(summary)}</span>
                  </p>
                </figcaption>
              ) : (
                ''
              )}
            </figure>
          </Link>
        </LazyLoad>
      );
    } else if (card_random_cover) {
      const thumbnailIndex = Math.abs(postIndex % parseInt(randomImgNum));
      cardImg = (
        <LazyLoad once={true} placeholder={<Spiner />} debounce={500}>
          <Link href={`/post/${id}`}>
            <figure className={classNames('', { 'effect-jazz': card_hover_summary })}>
              <img
                src={`${blogUrl}/thumbnail/thumbnail-${thumbnailIndex}.${card_random_cover_img_suffix}`}
                className="img-cover img-cover-bg"
                alt={title}
                style={{ height: '200', width: '100%' }}
              />
              {card_hover_summary ? (
                <figcaption>
                  <p className="post-excerpt font-sans">
                    <span>{this.substring(summary)}</span>
                  </p>
                </figcaption>
              ) : (
                ''
              )}
            </figure>
          </Link>
        </LazyLoad>
      );
    } else {
      cardImg = (
        <Link href={`/post/${id}`}>
          <figure className={classNames('', { 'effect-jazz': card_hover_summary })}>
            <span className="img-cover no-thumb">
              <span className="full-image placeholder-bg" role="img" aria-label="" />{' '}
            </span>
            {card_hover_summary ? (
              <figcaption>
                <p className="post-excerpt font-sans">
                  <span>{this.substring(summary)}</span>
                </p>
              </figcaption>
            ) : (
              ''
            )}
          </figure>
        </Link>
      );
    }
    return cardImg;
  }

  render() {
    const { post, settings, postIndex, blogUrl } = this.props;
    const { topPriority, title, visits, commentCount, createTime, id } = post;
    const { card_random_cover_img_num } = settings;
    const randomImgNum = isEmpty(card_random_cover_img_num) ? 0 : card_random_cover_img_num;

    return (
      <div className={'post-card m-auto mt-6'}>
        {topPriority > 0 ? (
          <div className="post-top">
            <div>置顶</div>
          </div>
        ) : (
          ''
        )}
        <header className="card-header card-img">
          {this.getCardImg({ ...post, ...settings, postIndex, blogUrl, randomImgNum })}
        </header>
        <div className="card-body">
          <p className="text-center text-xl tracking-wider svg-f text-clamp-1">
            <Link href={`/post/${id}`}>
              <span className="font-medium text-gray-700 post-title">{title}</span>
            </Link>
          </p>
        </div>
        <footer className="card-footer svg-f">
          <span className="post-time lh-25 mr-auto">
            <span className="iconfont icon-calendar lh-25 f-10" style={{ marginRight: '5px', fontSize: '14px' }} />
            <span className="published">{formatDate(createTime)}</span>
          </span>
          <div className="lh-25">
            <span className="visitors-count">
              <span className="iconfont icon-Eyesight" style={{ marginRight: '2px', fontSize: '14px' }} />
              <span>{visits}</span>
            </span>
            <span className="visitors-comment" style={{ marginLeft: '5px' }}>
              <span className="iconfont icon-comment" style={{ marginRight: '2px', fontSize: '8px' }} />
              <span>{commentCount}</span>
            </span>
          </div>
        </footer>
      </div>
    );
  }
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    topPriority: PropTypes.number,
    thumbnail: PropTypes.string,
    fullPath: PropTypes.string,
    title: PropTypes.string,
    summary: PropTypes.string,
    visits: PropTypes.number,
    commentCount: PropTypes.number,
    createTime: PropTypes.number,
  }).isRequired,
  settings: PropTypes.shape({
    card_random_cover: PropTypes.bool,
    card_random_cover_img_num: PropTypes.string,
    card_random_cover_img_suffix: PropTypes.string,
    card_hover_summary: PropTypes.bool,
  }),
  postIndex: PropTypes.number.isRequired,
  blogUrl: PropTypes.string,
};

export default PostCard;
