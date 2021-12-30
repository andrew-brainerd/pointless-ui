import React from 'react';
import { bool, func, shape, string } from 'prop-types';
import { styled } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import styles from './MaterialTextInput.module.scss';

const StyledTextInput = styled(TextField)({
  background: '#e8f0fe',
  display: 'flex',
  marginRight: '25px',
  width: '100%'
});

const MaterialTextInput = ({ input, meta, value, onChange, ...props }) => {
  console.log('Text Props', props);
  return (
    <StyledTextInput
      name={input.name}
      value={value || input.value}
      onChange={onChange || input.onChange}
      error={meta.touched && !!meta.error}
      helperText={meta.touched && meta.error}
      FormHelperTextProps={{
        classes: {
          error: styles.error
        }
      }}
      variant="filled"
      {...props}
    />
  );
};

MaterialTextInput.propTypes = {
  input: shape({
    name: string,
    value: string,
    onChange: func
  }),
  meta: shape({
    touched: bool,
    error: string
  }),
  defaultValue: string
};

export default MaterialTextInput;
