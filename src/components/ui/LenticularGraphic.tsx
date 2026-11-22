import type { ComponentPropsWithoutRef } from 'react';
import Lenticular from '../../assets/svg/Lenticular.svg?react';

type LenticularGraphicProps = ComponentPropsWithoutRef<typeof Lenticular>;

export const LenticularGraphic = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: LenticularGraphicProps) => {
  return (
    <Lenticular
      className={className}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};
