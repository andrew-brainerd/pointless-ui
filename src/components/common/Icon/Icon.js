import React from 'react';
import { string, func } from 'prop-types';
import noop from '../../../utils/noop';

const Icon = ({ className, name, title, onClick }) => {
  const iconImage = require(`../../../img/${name}.png`);
  return (
    <img
      className={className}
      title={title || name}
      src={typeof iconImage === 'object' ? '' : iconImage}
      wrapper={'span'}
      onClick={onClick || noop}
      alt={name}
    />
  );
};

Icon.propTypes = {
  className: string,
  name: string.isRequired,
  title: string,
  onClick: func
};

export default Icon;
