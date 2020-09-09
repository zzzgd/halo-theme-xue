import React from 'react';
import PropTypes from 'prop-types';
import { Router } from '../../../server/routes';
import styled from '@emotion/styled';

const ItemLink = styled.a`
  color: #757575;
  text-decoration: none;
  margin-left: -5px;
  margin-right: 2rem;
  padding: 5px;

  &:hover {
    cursor: pointer;
    color: #000;
  }
`;

function handleClick(href) {
  Router.pushRoute(href);
}

const Link = ({ href, children }) => (
  <ItemLink role="button" onClick={() => handleClick(href)}>
    {children}
  </ItemLink>
);

Link.propTypes = {
  href: PropTypes.string,
  children: PropTypes.node,
};

export default Link;
