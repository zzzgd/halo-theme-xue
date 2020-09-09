import React, { createRef } from 'react';
import classNames from 'classnames';
import $ from 'jquery';
import OutsideClickHandler from 'react-outside-click-handler';
import * as Scroll from 'react-scroll';
import { Router } from '../../../server/routes';

import { isEmpty } from 'utils/commonUtil';

const scroll = Scroll.animateScroll;

class MoonMenu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClickButton = this.handleClickButton.bind(this);
    this.handleCkSearch = this.handleCkSearch.bind(this);
    this.handleExitSearch = this.handleExitSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.moonMenuListener = this.moonMenuListener.bind(this);
    this.state = {
      hidden: true,
      value: createRef(),
      btnClick: false,
      moonMenu: createRef(),
    };
  }

  componentDidMount() {
    window.addEventListener('load', this.moonMenuListener);
    window.addEventListener('scroll', this.moonMenuListener);
  }

  moonMenuListener() {
    // Get scroll percent
    const offsetHeight = $(window).height();
    const scrollHeight = $(document).height();
    const scrollTop = $(window).scrollTop();

    let percent = Math.round((scrollTop / (scrollHeight - offsetHeight)) * 100);
    if (percent > 100) percent = 100;

    const menuIcon = document.querySelector('.moon-menu-icon');
    const menuText = document.querySelector('.moon-menu-text');
    if (!percent) {
      percent = 0;
      menuIcon.style.display = 'block';
      menuText.style.display = 'none';
      $('g.moon-dot').show();
    } else {
      menuIcon.style.display = 'none';
      menuText.style.display = 'block';
      menuText.innerHTML = percent + '%';
      $('g.moon-dot').hide();
    }

    // Update strokeDasharray
    const length = 196;
    document.querySelector('.moon-menu-border').style.strokeDasharray = (percent * length) / 100 + ' ' + length;
  }

  handleClickButton() {
    // 右下角的小点
    this.toggleCircle();
    const { btnClick } = this.state;
    this.setState({
      btnClick: !btnClick,
    });
    // 点击了
    const childItems = document.querySelectorAll('.moon-menu-item');
    if (!btnClick) {
      for (let i = 0; i < childItems.length; i++) {
        childItems[i].style.opacity = 0.9;
      }
    } else {
      for (let i = 0; i < childItems.length; i++) {
        childItems[i].style.opacity = 0;
      }
    }
  }

  ckBack2Top() {
    scroll.scrollToTop({
      smooth: true,
    });
  }

  ckBack2Bottom() {
    scroll.scrollToBottom({
      smooth: true,
    });
  }

  handleCkSearch() {
    const { hidden } = this.state;
    this.setState({ hidden: !hidden });
  }

  handleExitSearch() {
    this.setState({ hidden: true });
  }

  handleOutsideClick() {
    this.setState({ hidden: true });
  }

  handleSubmit() {
    const value = this.state.value.current.value;
    if (isEmpty(value)) {
      return;
    }
    const searchBox = $('#searchBox');
    searchBox.toggleClass('hidden');
    Router.push(`/search?keyword=${value}`);
  }

  toggleCircle() {
    const $moonDot = $('g.moon-dot');
    const firstCircle = $moonDot.children('circle:first');
    const lastCircle = $moonDot.children('circle:last');
    const cy = $(firstCircle).attr('cy');
    if (cy === '0') {
      $(firstCircle).attr('cx', '0');
      $(firstCircle).attr('cy', '-.8rem');
      $(lastCircle).attr('cx', '0');
      $(lastCircle).attr('cy', '.8rem');
    } else {
      $(firstCircle).attr('cx', '-.8rem');
      $(firstCircle).attr('cy', '0');
      $(lastCircle).attr('cx', '.8rem');
      $(lastCircle).attr('cy', '0');
    }
  }

  render() {
    return (
      <div className="moon-menu" ref={this.state.moonMenu}>
        <div
          className={classNames('moon-menu-items', {
            'item-ani': this.state.btnClick,
            active: this.state.btnClick,
          })}>
          <span className="moon-menu-item iconfont icon-up" onClick={() => this.ckBack2Top()} />
          <span className="moon-menu-item iconfont icon-down" onClick={() => this.ckBack2Bottom()} />
          <span className="moon-menu-item iconfont icon-search" onClick={() => this.handleCkSearch()} />
          {/*<span className="moon-menu-item iconfont icon-toc"> </span>*/}
        </div>

        <div className="moon-menu-button" onClick={() => this.handleClickButton()}>
          <svg className="moon-menu-bg">
            <circle className="moon-menu-cricle" cx="50%" cy="50%" r="44%" />
            <circle className="moon-menu-border" cx="50%" cy="50%" r="48%" />
            <g className="moon-dot">
              <circle r=".2rem" cx="0" cy="-.8rem" />
              <circle r=".2rem" />
              <circle r=".2rem" cx="0" cy=".8rem" />
            </g>
          </svg>
          <div className="moon-menu-content">
            <div
              className={classNames('moon-menu-icon', {
                active: this.state.btnClick,
              })}
            />
            <div className="moon-menu-text" />
          </div>
        </div>

        <form onSubmit={e => this.handleSubmit(e)}>
          <div
            className={classNames('search-box', {
              hidden: this.state.hidden,
            })}
            id="searchBox">
            <div className="search-ipt ipt ipt-w">
              <OutsideClickHandler onOutsideClick={() => this.handleOutsideClick()}>
                <div className="ipt-ct ct-bg search-container" id="searchInput">
                  <label className="sh-lab">
                    <input
                      className="sh-ipt"
                      maxLength="30"
                      name="keyword"
                      ref={this.state.value}
                      spellCheck="false"
                      placeholder="Search"
                      autoComplete="off"
                      style={{ outline: 'none' }}
                    />
                    <i className="sh-icon iconfont icon-search"> </i>
                  </label>
                  <a className="sh-exit iconfont icon-exit" role="button" onClick={() => this.handleExitSearch()} />
                </div>
              </OutsideClickHandler>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default MoonMenu;
