import React from 'react';
import PropTypes from 'prop-types';
import Header from 'components/Header';
import Banner from 'components/Banner';
import Footer from 'components/Footer';
import Spiner from 'components/Spiner';
import PostBanner from 'components/PostBanner';

function Layout({ children, loading, settings, blogTitle, options, isPost, post, menus }) {
  return (
    <>
      <Header menus={menus} />
      <main className="cd-main-content">
        <div className="main">
          {isPost ? (
            <PostBanner post={post} options={options} />
          ) : (
            <Banner settings={settings} blogTitle={blogTitle} options={options} />
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
  post: PropTypes.object,
  menus: PropTypes.array.isRequired,
};

export default Layout;
