import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import BodyClassName from 'react-body-classname';
import $ from 'jquery';
import DaySwitch from 'components/DaySwitch';
import { getLocalStorage, isEmpty, setLocalStorage } from 'utils/commonUtil';

function moveNavigation() {
  const navigation = $('.cd-main-nav-wrapper');
  const screenSize = checkWindowWidth();

  if (screenSize) {
    //desktop screen - insert navigation inside header element
    navigation.detach();
    navigation.insertBefore('.cd-nav-trigger');
  } else {
    //mobile screen - insert navigation after .cd-main-content element
    navigation.detach();
    navigation.insertAfter('.cd-main-content');
  }
}

function checkWindowWidth() {
  var mq = window
    .getComputedStyle(document.querySelector('.nav-header'), '::before')
    .getPropertyValue('content')
    .replace(/"/g, '')
    .replace(/'/g, '');
  return mq !== 'mobile';
}

class Header extends React.PureComponent {
  constructor(props) {
    super(props);
    this.toggleOpenNavList = this.toggleOpenNavList.bind(this);
    this.handleChangeMode = this.handleChangeMode.bind(this);
    this.state = {
      isOpen: false,
      nightModeId: 'nightMode',
      daySwitch: true,
    };
  }

  componentDidMount() {
    let isNight = getLocalStorage(this.state.nightModeId);
    isNight = !isNight ? false : isNight;
    this.handleChangeMode(isNight);
    moveNavigation();
    this.extracted();
  }

  extracted() {
    $(window).on('resize', function () {
      !window.requestAnimationFrame ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
    });

    //mobile version - open/close navigation
    $('.cd-nav-trigger').on('click', function (event) {
      event.preventDefault();
      if ($('.nav-header').hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');

      $('.nav-header').toggleClass('nav-is-visible');
      $('.cd-main-nav').toggleClass('nav-is-visible');
      $('.cd-main-content').toggleClass('nav-is-visible');
    });

    //mobile version - go back to main navigation
    $('.go-back').on('click', function (event) {
      event.preventDefault();
      $('.cd-main-nav').removeClass('moves-out');
    });

    //open sub-navigation
    $('.cd-subnav-trigger').on('click', function (event) {
      event.preventDefault();
      $('.cd-main-nav').toggleClass('moves-out');
    });
  }

  handleChangeMode(isDay) {
    // 夜晚模式 false  白天模式 true
    const { nightModeId } = this.state;

    if (!isDay) {
      setLocalStorage(nightModeId, false);
      this.setState({ daySwitch: true });
    } else {
      setLocalStorage(nightModeId, true);
      this.setState({ daySwitch: false });
    }
  }

  toggleOpenNavList() {
    const { isOpen } = this.state;
    this.setState({
      isOpen: !isOpen,
    });
  }
  render() {
    const { menus } = this.props;
    const { daySwitch } = this.state;
    return (
      <BodyClassName
        className={classNames('', {
          night: !this.state.daySwitch,
        })}>
        <header className="nav-header">
          <div className="cd-logo">
            <DaySwitch daySwitch={daySwitch} handleChangeMode={() => this.handleChangeMode(daySwitch)} />
          </div>

          <nav className="cd-main-nav-wrapper">
            <ul className="cd-main-nav">
              {isEmpty(menus) ? (
                <li className="item">
                  <a href="/" className="link md:text-base sm:text-sm">
                    首页
                  </a>
                </li>
              ) : (
                menus.map((menu, index) => {
                  const { url, name, children } = menu;
                  return (
                    <li className="item" key={index}>
                      <a href={url} className={classNames('', { 'cd-subnav-trigger': !isEmpty(children) })}>
                        {name}
                      </a>

                      {isEmpty(children) ? (
                        ''
                      ) : (
                        <ul>
                          <li className="go-back">
                            <a href="#0">Menu</a>
                          </li>
                          {children.map((child, i) => {
                            const { url, name } = child;
                            return (
                              <li key={i}>
                                <a href={url}>{name}</a>
                              </li>
                            );
                          })}
                          <li>
                            <a href="#0" className="cd-subnav-trigger trigger-btn">
                              <span>close</span>
                            </a>
                          </li>
                        </ul>
                      )}
                    </li>
                  );
                })
              )}
            </ul>
          </nav>

          <a href="#0" className="cd-nav-trigger">
            Back <span />
          </a>
        </header>
      </BodyClassName>
    );
  }
}

Header.propTypes = {
  menus: PropTypes.array.isRequired,
};

export default Header;
