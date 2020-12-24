import React from 'react';
import { array, string, func } from 'prop-types';
import styles from './Select.module.scss';

const Select = ({ className, options, value = -1, onChange }) => {
  return (
    <div className={[styles.select, className || ''].join(' ')}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        <option disabled value='-1'>--</option>
        {options.map(option =>
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>)
        }
      </select>
    </div>
  );
};

Select.propTypes = {
  className: string,
  options: array.isRequired,
  value: string,
  onChange: func
};

export default Select;
