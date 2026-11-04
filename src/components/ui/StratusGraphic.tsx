import type { ComponentPropsWithoutRef } from 'react';
import CloudSVG from '../../assets/svg/StratusCloud.svg?react';

type StratusGraphicProps = ComponentPropsWithoutRef<typeof CloudSVG>;

export const StratusGraphic = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: StratusGraphicProps) => {
  return (
    <CloudSVG
      className={className}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};
