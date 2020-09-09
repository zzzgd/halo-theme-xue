import React from 'react';

import styled from '@emotion/styled';

const Container = styled('div')`
  width: 100%;
  margin: 0 auto;
  padding: 6rem 1rem;
  max-width: 1024px;
`;

const FeaturesRoot = styled('div')`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-gap: 27.136px;
`;

const FeaturesList = styled('div')`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const FeaturesListContainer = styled('div')`
  grid-column: 1 / span 12;
`;

const FeatureItem = styled('div')`
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 72px;
`;

const Title = styled('h3')`
  font-size: 20px;
  font-family: 'Metropolis';
  font-weight: 600;
  margin: 0;
`;

const Content = styled('p')`
  line-height: 1.65;
  font-weight: 400;
`;

export function Features() {
  return (
    <Container id="features">
      <FeaturesRoot>
        <FeaturesListContainer>
          <FeaturesList>
            <FeatureItem>
              <Title>SEO</Title>

              <Content>features.seo</Content>
            </FeatureItem>

            <FeatureItem>
              <Title>redux-saga</Title>

              <Content>features.reduxSaga</Content>
            </FeatureItem>

            <FeatureItem>
              <Title>i18next</Title>

              <Content>features.i18next</Content>
            </FeatureItem>

            <FeatureItem>
              <Title>redux</Title>

              <Content>features.redux</Content>
            </FeatureItem>
          </FeaturesList>
        </FeaturesListContainer>
      </FeaturesRoot>
    </Container>
  );
}

export default Features;
