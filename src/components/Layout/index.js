import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Spiner from 'components/Spiner';
import PostBanner from 'components/PostBanner';
import Head from 'next/head';
import { obtainValueInArray } from '../../utils/commonUtil';

function Layout({ children, loading, settings, blogTitle = 'Blog', options, isPost, post, menus, isHome }) {
  const keywords = obtainValueInArray(options, 'seo_keywords');
  const description = obtainValueInArray(options, 'seo_description');
  const favicon = obtainValueInArray(options, 'blog_favicon');

  return (
    <>
      <Head>
        <title>{blogTitle}</title>
        <meta name="keywords" content={keywords} />
        <meta name="description" content={description} />
        <link rel="shortcut icon" type="images/x-icon" href={favicon} />
      </Head>
      <Header menus={menus} />
      <main className="cd-main-content">
        <div className="main">
          {isPost ? (
            <PostBanner post={post} options={options} />
          ) : (
            <Banner settings={settings} blogTitle={blogTitle} options={options} isHome={isHome} />
          )}
          {loading ? <Spiner /> : children}
        </div>
        <Footer settings={settings} options={options} />
      </main>
    </>
  );
}

Layout.propTypes = {
  children: PropTypes.node,
  loading: PropTypes.bool.isRequired,
  settings: PropTypes.object,
  blogTitle: PropTypes.string,
  options: PropTypes.array,
  isPost: PropTypes.bool,
  isHome: PropTypes.bool,
  post: PropTypes.object,
  menus: PropTypes.array.isRequired,
};

export default Layout;
