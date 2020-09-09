import React from 'react';
import PropTypes from 'prop-types';
import { formatDate, isEmpty } from 'utils/commonUtil';
import Link from 'next/link';

import { SimpleImg } from 'react-simple-img';

function PostCard({ post, settings, postIndex, blogUrl }) {
  const { topPriority, thumbnail, title, summary, visits, commentCount, createTime, id } = post;
  const { card_random_cover, card_random_cover_img_num, card_random_cover_img_suffix, card_hover_summary } = settings;
  const randomImgNum = isEmpty(card_random_cover_img_num) ? 0 : card_random_cover_img_num;
  let cardImg;
  if (thumbnail && thumbnail !== '') {
    cardImg = (
      <Link href={`/post/${id}`}>
        <SimpleImg
          height={200}
          width={'100%'}
          placeholder={'/static/images/loading.svg'}
          src={thumbnail}
          className="img-cover img-cover-bg"
        />
      </Link>
    );
  } else if (card_random_cover) {
    const thumbnailIndex = Math.abs(postIndex % parseInt(randomImgNum));
    cardImg = (
      <Link href={`/post/${id}`}>
        <SimpleImg
          height={200}
          width={'100%'}
          src={`${blogUrl}/thumbnail/thumbnail-${thumbnailIndex}.${card_random_cover_img_suffix}`}
          placeholder={'/static/images/loading.svg'}
          className="img-cover img-cover-bg"
        />
      </Link>
    );
  } else {
    cardImg = (
      <Link href={`/post/${id}`}>
        <span className="img-cover no-thumb">
          <span className="full-image placeholder-bg" role="img" aria-label="" />{' '}
        </span>
      </Link>
    );
  }

  return (
    <div className={'post-card m-auto mt-6'}>
      {topPriority > 0 ? (
        <div className="post-top">
          <div>置顶</div>
        </div>
      ) : (
        ''
      )}
      <header className="card-header card-img">{cardImg}</header>
      <div className="card-body">
        <p className="text-center text-xl tracking-wider svg-f text-clamp-1">
          <Link href={`/post/${id}`}>
            <span className="font-medium text-gray-700 post-title">{title}</span>
          </Link>
        </p>
        {card_hover_summary ? (
          <p className="post-excerpt text-sm tracking-wider text-clamp-3 font-sans">{summary}</p>
        ) : (
          ''
        )}
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
