import type { ComponentPropsWithoutRef } from 'react';
import Nimbus from '../../assets/svg/Nimubus.svg?react';

type NimbusGraphicProps = ComponentPropsWithoutRef<typeof Nimbus>;

export const NimbusGraphic = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: NimbusGraphicProps) => {
  return (
    <Nimbus
      className={className}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};

export const NimbusGrapic = NimbusGraphic;
