import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import OutsideClickHandler from 'react-outside-click-handler';

class CoffeeModal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this);
    this.clickZfb = this.clickZfb.bind(this);
    this.clickWx = this.clickWx.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);
    this.state = {
      modalTitle: '支付宝',
      zfbVisible: true,
      wxVisible: false,
    };
  }

  componentDidMount() {
    // 标题
    const { zfb } = this.props;
    if (!zfb || zfb === '') {
      this.setState({
        modalTitle: '微信支付',
        zfbVisible: false,
        wxVisible: true,
      });
    }
  }

  // 点击微信支付按钮
  clickWx() {
    this.setState({
      modalTitle: '微信支付',
      zfbVisible: false,
      wxVisible: true,
    });
  }

  // 点击支付宝
  clickZfb() {
    this.setState({
      modalTitle: '支付宝',
      zfbVisible: true,
      wxVisible: false,
    });
  }

  // 点击关闭按钮
  handleClose() {
    this.props.handleClickClose();
  }

  handleOutsideClick() {
    this.props.handleClickClose();
  }

  render() {
    const { zfb, wechat, isOpen } = this.props;
    const ariaHidden = !isOpen;
    const { modalTitle, zfbVisible, wxVisible } = this.state;
    return (
      <div
        className={classNames('modal micromodal-slide', {
          'is-open': isOpen,
        })}
        aria-hidden={ariaHidden}
        role="dialog">
        <div className="modal__overlay model_bg" tabIndex="-1" data-micromodal-close="">
          <div
            className="modal__container"
            role="dialog"
            aria-modal="true"
            id="modalContainer"
            aria-labelledby="modal-1-title">
            <OutsideClickHandler onOutsideClick={() => this.handleOutsideClick()}>
              <header className="modal__header">
                <h2 className="modal__title">{modalTitle}</h2>
                <button
                  className="modal__close"
                  aria-label="Close modal"
                  id="closeCoffeeModalBtn"
                  onClick={() => this.handleClose()}
                />
              </header>
              <div className="modal__content flex flex-row justify-center">
                {!zfb || zfb === '' ? (
                  ''
                ) : (
                  <div
                    id="qrCodeZfb"
                    className={classNames('pay-code-invisible', {
                      'qr-code-visible': zfbVisible,
                    })}>
                    <img className="qr_code_zfb qr-code" src={zfb} alt="AliPay" />
                  </div>
                )}
                {!wechat || wechat === '' ? (
                  ''
                ) : (
                  <div
                    id="qrCodeWx"
                    className={classNames('pay-code-invisible', {
                      'qr-code-visible': wxVisible,
                    })}>
                    <img className="qr_code_wx qr-code" src={wechat} alt="WeiXinPay" />
                  </div>
                )}
              </div>
              <footer className="modal__footer flex flex-row justify-center">
                {!zfb || zfb === '' ? (
                  ''
                ) : (
                  <button className={classNames('modal__btn zfb-btn code-btn')} onClick={() => this.clickZfb()}>
                    支付宝
                  </button>
                )}
                {!wechat || wechat === '' ? (
                  ''
                ) : (
                  <button className={classNames('modal__btn wx-btn code-btn')} onClick={() => this.clickWx()}>
                    微信
                  </button>
                )}
              </footer>
            </OutsideClickHandler>
          </div>
        </div>
      </div>
    );
  }
}

CoffeeModal.propTypes = {
  zfb: PropTypes.string,
  wechat: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  handleClickClose: PropTypes.func.isRequired,
};

export default CoffeeModal;
