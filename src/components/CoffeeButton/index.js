import React from 'react';
import PropTypes from 'prop-types';

class CoffeeButton extends React.PureComponent {
  constructor(props) {
    super(props);
    this.clickButton = this.clickButton.bind(this);
  }
  clickButton() {
    this.props.handleClick();
  }

  render() {
    return (
      <button
        onClick={() => this.clickButton()}
        className="btn-primary rounded h-10 leading-10 w-32 mg-auto"
        id="buyCoffee">
        <img src={'/static/images/cuplogo-sm.png'} style={{ height: '13px' }} alt="cuplogo" />
        <span className="pt-1 pl-2">Coffee</span>
      </button>
    );
  }
}

CoffeeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default CoffeeButton;
