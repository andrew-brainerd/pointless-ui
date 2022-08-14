import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import styles from './MaterialTextInput.module.scss';

interface MaterialTextInputProps {
  input: {
    name: string,
    value: string,
    onChange: (e: Event) => void
  },
  meta: {
    touched: boolean,
    error: string
  },
  defaultValue: string,
  value: string,
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const StyledTextInput = styled(TextField)({
  background: '#e8f0fe',
  display: 'flex',
  marginRight: '25px',
  width: '100%'
});

const MaterialTextInput = ({
  input,
  meta,
  value,
  onChange,
  ...props
}: MaterialTextInputProps) => {
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
      variant='filled'
      {...props}
    />
  );
};

export default MaterialTextInput;
