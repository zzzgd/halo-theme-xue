import React from 'react';
import PropTypes from 'prop-types';

class LinkCard extends React.PureComponent {
  render() {
    const { url, name, logo, placeholder, description } = this.props;
    let image;
    if (!logo && logo !== '') {
      image = <img src={logo} alt={name} />;
    } else if (!placeholder || placeholder !== '') {
      image = <img src={placeholder} alt={name} />;
    } else {
      image = <img src="https://cdn.jsdelivr.net/gh/xzzai/static@v1.0.1/placeholder.jpg" alt={name} />;
    }
    return (
      <a className="lk-card-im card-item-vel block" href={url} target="_blank" rel="noopener noreferrer">
        <div className="media">
          <div className="media-left">
            <figure className="image is-64x64">{image}</figure>
          </div>
          <div className="media-content">
            <p className="lk-title">{name}</p>
            <p className="lk-desc">{description}</p>
          </div>
        </div>
      </a>
    );
  }
}

LinkCard.propTypes = {
  url: PropTypes.string,
  name: PropTypes.string.isRequired,
  logo: PropTypes.string,
  placeholder: PropTypes.string,
  description: PropTypes.string,
};

export default LinkCard;
