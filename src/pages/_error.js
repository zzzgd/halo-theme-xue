import React from 'react';
import BodyClassName from 'react-body-classname';

class NotFound extends React.PureComponent {
  render() {
    return (
      <BodyClassName className="not-found">
        <div className="body404">
          <div className="info404">
            <header id="header404" className="clearfix">
              <div className="site-name404">404</div>
            </header>
            <section>
              <div className="title404">
                <p>你似乎来到了没有知识的荒原.</p>
              </div>
              <a href="/">
                <span className="index404">回到首页</span>
              </a>
            </section>
          </div>
        </div>
      </BodyClassName>
    );
  }
}

export default NotFound;
