import React from 'react';
import PropTypes from 'prop-types';
import { obtainValueInArray, isEmpty } from 'utils/commonUtil';
import Badge from 'components/Badge';
import MoonMenu from 'components/MoonMenu';

class Footer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.checkNull = this.checkNull.bind(this);
    this.state = {
      dateTime: '',
    };
  }

  componentDidMount() {
    const notNull = this.checkNull();
    if (!notNull) {
      return;
    }
    this.timeStatistics(this.props.settings);
  }

  timeStatistics(settings) {
    const { TimeStatistics } = settings;
    if (TimeStatistics) {
      const BirthDay = new Date(TimeStatistics);
      const today = new Date();
      const timeold = today.getTime() - BirthDay.getTime();
      const msPerDay = 24 * 60 * 60 * 1000;
      const e_daysold = timeold / msPerDay;
      const daysold = Math.floor(e_daysold);
      const e_hrsold = (e_daysold - daysold) * 24;
      const hrsold = Math.floor(e_hrsold);
      this.setState({
        dateTime: daysold + '天' + hrsold + '小时',
      });
    }
  }

  checkNull() {
    const { settings, options } = this.props;
    return !(isEmpty(settings) || isEmpty(Object.keys(settings)) || isEmpty(options));
  }

  render() {
    const { settings, options } = this.props;
    const notNull = this.checkNull();
    if (!notNull) {
      return <div />;
    }
    const atomUrl = obtainValueInArray(options, 'atom_url');
    const themeBase = obtainValueInArray(options, 'theme_base');
    const blogFooterInfo = obtainValueInArray(options, 'blog_footer_info');

    const {
      sina,
      qq,
      telegram,
      twitter,
      github,
      zhihu,
      mail,
      rss,
      Icp,
      PublicSecurityRecord,
      TimeStatistics,
    } = settings;
    return (
      <footer className="footer mt-8">
        <div
          className="inner container mx-auto flex flex-row lg:justify-between
        md:justify-center items-center grid lg:grid-cols-2 md:grid-cols-1">
          <div className="offsite-links flex flex-row justify-center flex-wrap">
            {isEmpty(sina) ? (
              ''
            ) : (
              <a href={sina} className="circle pad-10" target="_blank" rel="noopener noreferrer">
                <span className="iconfont icon-weibo" />
              </a>
            )}
            {isEmpty(qq) ? (
              ''
            ) : (
              <a
                href={`//wpa.qq.com/msgrd?v=3&uin=${qq}&site=qq&menu=yes`}
                className="circle pad-10"
                target="_blank"
                rel="noopener noreferrer"
                title="QQ Chat">
                <span className="iconfont icon-tencentqq" />
              </a>
            )}
            {isEmpty(telegram) ? (
              ''
            ) : (
              <a
                href={`https://t.me/${telegram}`}
                className="circle pad-10"
                target="_blank"
                rel="noopener noreferrer"
                title="Telegram Chat">
                <span className="iconfont icon-telegram" />
              </a>
            )}
            {isEmpty(twitter) ? (
              ''
            ) : (
              <a href={twitter} className="circle pad-10" target="_blank" rel="noopener noreferrer" title="Twitter">
                <span className="iconfont icon-twitter" />
              </a>
            )}
            {isEmpty(github) ? (
              ''
            ) : (
              <a href={github} className="circle pad-10" target="_blank" rel="noopener noreferrer" title="Github">
                <span className="iconfont icon-github" />
              </a>
            )}
            {isEmpty(zhihu) ? (
              ''
            ) : (
              <a href={zhihu} className="circle pad-10" target="_blank" rel="noopener noreferrer" title="ZhiHu">
                <span className="iconfont icon-zhihu-circle-fill" />
              </a>
            )}
            {isEmpty(mail) ? (
              ''
            ) : (
              <a
                href={`mailto:${mail}`}
                className="circle pad-10"
                target="_blank"
                rel="noopener noreferrer"
                title="Email">
                <span className="iconfont icon-mail" />
              </a>
            )}
            {!rss ? (
              ''
            ) : (
              <a href={atomUrl} className="circle pad-10" target="_blank" rel="noopener noreferrer" title="RSS">
                <span className="iconfont icon-rss" />
              </a>
            )}
          </div>
          <div className="site-info flex flex-col justify-center">
            <div dangerouslySetInnerHTML={{ __html: blogFooterInfo }} className="blog-footer-info" />
            {isEmpty(Icp) ? (
              ''
            ) : (
              <p>
                <a href="http://beian.miit.gov.cn" target="_blank" rel="noopener noreferrer" className="text-xs">
                  {Icp}
                </a>
              </p>
            )}
            {isEmpty(PublicSecurityRecord) ? (
              ''
            ) : (
              <p
                style={{
                  display: 'inline-block',
                  backgroundImage: `url(${themeBase}/assets/images/beian.png)`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'top left',
                  backgroundSize: 'contain',
                  paddingLeft: '20px',
                }}>
                <a href="http://www.beian.gov.cn" target="_blank" rel="noopener noreferrer" className="text-xs">
                  {PublicSecurityRecord}
                </a>
              </p>
            )}

            <div className="badges">
              <Badge
                name={'Powered'}
                url={'http://halo.run'}
                value={<span className="badge-value bg-blue">Halo</span>}
              />
              <Badge
                name={'Theme'}
                url={'https://github.com/xzzai/halo-theme-xue.git'}
                value={<span className="badge-value bg-red">Xue</span>}
              />
              {isEmpty(TimeStatistics) ? (
                ''
              ) : (
                <Badge
                  name={'运行'}
                  url={'#'}
                  value={
                    <span className="badge-value bg-orange" id="span_dt_dt">
                      {this.state.dateTime}
                    </span>
                  }
                />
              )}
            </div>
          </div>
        </div>
        <MoonMenu />
      </footer>
    );
  }
}

Footer.propTypes = {
  settings: PropTypes.object,
  options: PropTypes.array,
};

export default Footer;
