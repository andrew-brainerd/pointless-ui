import React from 'react';
import { node, bool } from 'prop-types';
import Loading from '../common/Loading/Loading';

const Content = ({ children, isLoadingUser }) => {
  return !isLoadingUser ? (
    <div id='content'>
      {children}
    </div>
  ) : <Loading />;
};

Content.propTypes = {
  children: node,
  isLoadingUser: bool
};

export default Content;
