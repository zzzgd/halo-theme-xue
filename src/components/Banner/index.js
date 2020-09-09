import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'utils/commonUtil';

class Banner extends React.PureComponent {
  render() {
    const { settings, blogTitle, options, isHome } = this.props;

    if (isEmpty(settings) || isEmpty(settings) || isEmpty(blogTitle) || isEmpty(options)) {
      return <div />;
    }

    const { patternImg, home_description, enabled_index_cover_height } = settings;
    let bgContent = '';
    if (patternImg) {
      bgContent = (
        <div className="cover-bg">
          <img src={patternImg} className="z-auto" alt="" />
        </div>
      );
    } else {
      bgContent = <div className="default-cover-bg" />;
    }
    const scrollDown = enabled_index_cover_height ? (
      <a className="arrow-down" href="#arch">
        {' '}
        <span className="screen-reader-text">Scroll Down</span>{' '}
      </a>
    ) : (
      ''
    );
    return (
      <header className={`bg-cover post-cover ${enabled_index_cover_height ? 'hg-100' : ''}`}>
        {bgContent}
        <div className="cover-content flex justify-center">
          <div className="inner flex flex-col justify-center">
            <h2 className="cover-title text-left md:text-4xl lg:text-4xl xl:text-5xl">{blogTitle}</h2>
            {isHome ? <p className="slogan text-center">{home_description}</p> : ''}
            {scrollDown}
          </div>
        </div>
      </header>
    );
  }
}

Banner.propTypes = {
  settings: PropTypes.object,
  blogTitle: PropTypes.string,
  options: PropTypes.array,
  isHome: PropTypes.bool,
};

export default Banner;
