import React from 'react';
import { string } from 'prop-types';
import { ReactSVG } from 'react-svg';

const Icon = ({ className, name, title }) => {
  const iconImage = require(`../../../img/${name}.svg`);
  return (
    <ReactSVG
      className={className}
      title={title || name}
      src={iconImage}
      wrapper={'span'}
    />
  );
};

Icon.propTypes = {
  className: string,
  name: string.isRequired,
  title: string
};

export default Icon;
