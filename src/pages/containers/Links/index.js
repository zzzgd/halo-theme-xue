import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { isEmpty } from 'utils/commonUtil';
import { ROUTER } from './constants';
import LinkCard from 'components/LinkCard';
import Layout from 'components/Layout';
import commonApi from 'api/common';
import linkApi from 'api/links';

class Links extends React.PureComponent {
  static async getInitialProps() {
    const options = await commonApi.getOptions();
    const settings = await commonApi.getSettings();
    const linkList = await linkApi.teamView();
    const menus = await commonApi.getTreeMenus();
    return { options: options.data, settings: settings.data, linkInitialList: linkList.data, menus: menus.data };
  }
  componentDidMount() {}

  render() {
    const { options, settings, linkList, linkInitialList, menus } = this.props;
    const loading = isEmpty(options) || isEmpty(settings) || isEmpty(linkInitialList) || isEmpty(menus);
    if (loading) {
      return <Layout loading={loading} menus={menus} />;
    }
    const { links_patternimg } = settings;
    const linkSettings = {
      ...this.props.settings,
      name: '友情链接',
      patternImg: links_patternimg,
      enabled_index_cover_height: false,
    };
    const { links_placeholder } = settings;
    const frineds = isEmpty(linkList) ? linkInitialList : linkList;
    return (
      <Layout
        loading={loading}
        settings={linkSettings}
        options={options}
        isPost={false}
        blogTitle={'友情链接'}
        menus={menus}>
        <div className="container mx-auto px-4 mt-16 max-w-6xl tracking-wider md:leading-relaxed sm:leading-normal ct-container cn-pd content-container">
          {frineds.map((link, index) => {
            const { team, links } = link;
            const teamBlock = !team || team === '' ? '' : <h3 className="w-full m-4">{team}</h3>;
            return (
              <div key={index}>
                {teamBlock}
                <div className="flex flex-row flex-wrap grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                  {links.map((l, index) => {
                    return (
                      <LinkCard
                        url={l.url}
                        logo={l.logo}
                        name={l.name}
                        description={l.description}
                        placeholder={links_placeholder}
                        key={index}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }
}

Links.propTypes = {
  settings: PropTypes.object,
  options: PropTypes.array,
  linkList: PropTypes.array,
  linkInitialList: PropTypes.array,
  menus: PropTypes.array,
};

const mapStateToProps = state => ({
  ...state,
  router: state[ROUTER],
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Links);
