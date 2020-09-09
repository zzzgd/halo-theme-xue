import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

class DaySwitch extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleChangeMode = this.handleChangeMode.bind(this);
  }

  handleChangeMode() {
    this.props.handleChangeMode();
  }

  render() {
    const { daySwitch } = this.props;
    return (
      <div className="day-night-switch" onClick={() => this.handleChangeMode()}>
        <div
          className={classNames('onOff', {
            daySwitch: daySwitch,
          })}>
          <div className="star star1" />
          <div className="star star2" />
          <div className="star star3" />
          <div className="star star4" />
          <div className="star star5" />
          <div className="star sky" />
          <div className="sunMoon">
            <div className="crater crater1" />
            <div className="crater crater2" />
            <div className="crater crater3" />
            <div className="cloud part1" />
            <div className="cloud part2" />
          </div>
        </div>
      </div>
    );
  }
}

DaySwitch.propTypes = {
  handleChangeMode: PropTypes.func.isRequired,
  daySwitch: PropTypes.bool.isRequired,
};

export default DaySwitch;
