import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class Tag extends React.PureComponent {
  render() {
    const { slug, name, postCount } = this.props;
    return (
      <a href={slug}>
        <span className="post-tag mt-2 mb-2 mr-2">
          {name}
          <span
            className={classNames('tag-length', {
              hidden: !postCount,
            })}>
            {postCount}
          </span>
        </span>
      </a>
    );
  }
}

Tag.propTypes = {
  slug: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  postCount: PropTypes.number,
};

export default Tag;
