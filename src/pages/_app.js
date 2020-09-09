import React from 'react';
import App from 'next/app';

import { wrapper } from 'store/with-redux-store';
import { ConnectedRouter } from 'connected-next-router';

import 'typeface-metropolis';
import '@typefaces-pack/typeface-inter';
import 'assets/styles/index.scss';
import 'viewerjs/dist/viewer.min.css';
import 'highlight.js/styles/github.css';
import 'justifiedGallery/dist/css/justifiedGallery.min.css';

class Xue extends App {
  static getInitialProps = async ({ Component, ctx }) => {
    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
        query: ctx.query,
      },
    };
  };
  render() {
    const { Component, pageProps } = this.props;
    return (
      <React.StrictMode>
        <ConnectedRouter>
          <Component {...pageProps} />
        </ConnectedRouter>
      </React.StrictMode>
    );
  }
}

export default wrapper.withRedux(Xue);
