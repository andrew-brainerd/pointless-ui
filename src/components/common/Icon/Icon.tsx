/* eslint-disable @typescript-eslint/no-var-requires */
import { ReactSVG } from 'react-svg';

interface Props {
  className?: string,
  name: string,
  title?: string
}

const Icon = ({ className, name, title }: Props) => {
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

export default Icon;
