import React from 'react';
import Home from 'pages/containers/Home';

export class IndexPage extends React.PureComponent {
  render() {
    return <Home />;
  }
}

IndexPage.getInitialProps = async () => ({
  namespacesRequired: ['common', 'banner', 'features'],
});

export default IndexPage;
