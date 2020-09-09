import React from 'react';
import PropTypes from 'prop-types';

class Badge extends React.PureComponent {
  render() {
    const { url, name, value } = this.props;
    return (
      <div className="github-badge">
        <a style={{ color: '#fff' }} rel="license" href={url}>
          <span className="badge-subject">{name}</span>
          {value}
        </a>
      </div>
    );
  }
}

Badge.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.object,
};

export default Badge;
