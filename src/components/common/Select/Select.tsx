import styles from './Select.module.scss';

interface Option {
  label: string,
  value: string
}

interface Props {
  className?: string,
  options: Array<Option>,
  value?: number,
  onChange: (value: string) => void
}

const Select = ({ className, options, value = -1, onChange }: Props) => {
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

export default Select;
