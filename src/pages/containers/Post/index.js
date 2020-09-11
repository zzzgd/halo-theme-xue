import React, { createRef } from 'react';
import PropTypes from 'prop-types';
import commonApi from 'api/common';
import userApi from 'api/user';
import postApi from 'api/post';
import Link from 'next/link';
import { connect } from 'react-redux';
import Viewer from 'viewerjs';
import $ from 'jquery';
import { ROUTER } from './constants';
import Layout from 'components/Layout';
import { isEmpty, obtainValueInArray } from 'utils/commonUtil';
import { markdown } from 'utils/markdown';
import { lineNumbersBlock } from 'utils/lineNumber';
import CoffeeButton from 'components/CoffeeButton';
import Tag from 'components/Tag';
import Comment from 'components/Comments';
import CoffeeModal from 'components/CoffeeModal';

let viewer = null;
class Post extends React.PureComponent {
  static getInitialProps = async ({ query }) => {
    const { id, slug } = query;
    const content = isEmpty(slug) ? await postApi.detail(id) : await postApi.detailBySlug(slug);
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const userProfile = await userApi.getProfile();
    const menus = await commonApi.getTreeMenus();
    return {
      options: options.data,
      settings: settings.data,
      userProfile: userProfile.data,
      postContent: content.data,
      menus: menus.data,
    };
  };

  constructor(props) {
    super(props);
    this.handleCoffeeButton = this.handleCoffeeButton.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
    this.state = {
      tocFixed: false,
      tocRightFixed: false,
      share: false,
      toc: createRef(),
      tocFlag: createRef(),
      coffeeModelOpen: false,
    };
  }
  componentDidMount() {
    this.initViewer();
    this.handleLineNumberAndClippy();
    // clipboard = new ClipboardJS('.btn');
  }

  handleCoffeeButton() {
    this.setState({ coffeeModelOpen: true });
  }

  handleClickClose() {
    this.setState({ coffeeModelOpen: false });
  }

  componentWillUnmount() {
    viewer = null;
    document.body.removeChild(document.getElementById('write'));
  }

  handleLineNumberAndClippy() {
    $('pre>code[class*="language-"]').each(function (i, block) {
      lineNumbersBlock(block);
    });
  }

  initViewer() {
    // viewer 图片灯箱功能
    viewer = new Viewer(document.getElementById('write'), {
      inline: false,
    });
  }

  render() {
    const { options, settings, userProfile, postContent, menus } = this.props;

    const loading =
      isEmpty(options) || isEmpty(settings) || isEmpty(postContent) || isEmpty(userProfile) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { tags, id, title, originalContent } = postContent;
    const { QR_code_zfb, QR_code_wx } = settings;
    const isShowCoffeeModel = !isEmpty(QR_code_zfb) || !isEmpty(QR_code_wx);
    const { coffeeModelOpen } = this.state;
    const blogUrl = obtainValueInArray(options, 'blog_url');
    const tagList = isEmpty(tags) ? [] : tags;
    const { avatar } = userProfile;

    return (
      <Layout
        loading={loading}
        options={options}
        settings={{ ...settings, enabled_index_cover_height: false }}
        post={{ ...postContent, avatar }}
        isPost={true}
        menus={menus}
        blogTitle={title}>
        <div>
          <div className="article-content content-container">
            <div
              className="container mx-auto px-4 md-content mt-8
            max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd"
              id="write">
              {markdown(originalContent)}
            </div>
          </div>
          <div className="container mx-auto px-4 mt-8 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd md-content">
            <blockquote className="post-copyright">
              <p>
                <b>Copyright: </b> 采用{' '}
                <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">
                  知识共享署名4.0
                </a>
                国际许可协议进行许可
              </p>
              <p>
                <b>
                  Links:{' '}
                  <Link href={`/post/${id}`}>
                    <a> {`${blogUrl}/post/${id}`}</a>
                  </Link>
                </b>
              </p>
            </blockquote>
          </div>
          <div className="container mx-auto px-4 mt-8 pb-4 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd coffee-tags">
            {!isShowCoffeeModel ? (
              ''
            ) : (
              <p className="flex flex-col justify-center pt-8 pb-8">
                <span className="text-center block pb-2">Buy me a cup of coffee ☕.</span>
                <CoffeeButton handleClick={() => this.handleCoffeeButton()} />
              </p>
            )}
            <p className="flex flex-row justify-start flex-wrap">
              {tagList.map((tag, index) => (
                <Tag name={tag.name} slug={`/tag/${tag.slug}`} key={index} />
              ))}
            </p>
            {!isShowCoffeeModel ? (
              ''
            ) : (
              <CoffeeModal
                zfb={QR_code_zfb}
                wechat={QR_code_wx}
                isOpen={coffeeModelOpen}
                handleClickClose={() => this.handleClickClose()}
              />
            )}
          </div>
          <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd">
            <Comment sheet={'posts'} id={id} settings={settings} options={options} />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

Post.propTypes = {
  options: PropTypes.array,
  settings: PropTypes.object,
  postContent: PropTypes.object,
  userProfile: PropTypes.object,
  router: PropTypes.object,
  menus: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
