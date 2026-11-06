import type { ComponentPropsWithoutRef } from 'react';
import DownArrow from '../../assets/svg/DownArrow.svg?react';

export type DownArrowIconProps = ComponentPropsWithoutRef<typeof DownArrow> & {
  className?: string;
  'aria-hidden'?: boolean | 'true' | 'false';
};

export const DownArrowIcon = ({
  className,
  'aria-hidden': ariaHidden = true,
  ...props
}: DownArrowIconProps) => {
  return (
    <DownArrow
      className={className}
      aria-hidden={ariaHidden}
      {...props}
    />
  );
};
