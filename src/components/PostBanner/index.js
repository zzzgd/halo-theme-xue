import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '../../../server/routes';
import { formatDate, isEmpty, obtainValueInArray } from 'utils/commonUtil';
import Head from 'next/head';

class PostBanner extends React.PureComponent {
  render() {
    const { options, post } = this.props;
    const { thumbnail, title, avatar, visits, createTime, categories } = post;
    let bgContent;
    if (thumbnail) {
      bgContent = (
        <div className="cover-bg">
          <img src={thumbnail} className="z-auto" alt={title} />
        </div>
      );
    } else {
      bgContent = <div className="placeholder-bg" />;
    }
    const cate = isEmpty(categories) ? [] : categories;
    const keywords = obtainValueInArray(options, 'seo_keywords');
    const description = obtainValueInArray(options, 'seo_description');
    const folder = isEmpty(categories) ? (
      ''
    ) : (
      <span className="iconfont icon-folder" style={{ fontSize: '14px' }}>
        {' '}
      </span>
    );
    return (
      <header className={`bg-cover post-cover`} id="postHeader">
        <Head>
          <title>{title}</title>
          <meta name="keywords" content={keywords} />
          <meta name="description" content={description} />
        </Head>
        {bgContent}
        <div className="cover-content post-cover-content flex justify-center">
          <div className="inner flex flex-col justify-center">
            <p className="post-title cover-title text-base lg:text-4xl xl:text-5xl md:text-3xl">{title}</p>
            <div className="post-meta">
              <div className="post-meta-wrap">
                <img className="author-avatar" srcSet={`${avatar}, ${avatar} 2x`} src={avatar} alt="" />
                <span className="post-author">{visits} 次访问</span>
                <time className="published" dateTime={formatDate(createTime)}>
                  {formatDate(createTime)}
                </time>
              </div>
              <div className="text-center post-categories">
                {folder}
                {cate.map((category, index) => (
                  <Link href={`/category/${category.slug}`} key={index}>
                    <span className={'post-category'}> · {category.name} </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

PostBanner.propTypes = {
  post: PropTypes.object,
  options: PropTypes.array,
};

export default PostBanner;
