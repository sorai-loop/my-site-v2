import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type StraightPipeGraphicProps = {
  /**
   * 長さ
   * @default 120
   */
  length?: number;
  /**
   * 管幅Y
   * @default 24
   */
  width?: number;
  /**
   * `管幅
   */
  pipeWidth?: number;
  /**
   * 線の太さ
   * @default 1.5
   */
  strokeWidth?: number;
  /**
   * 両端の開口部を塞ぐ縦線を描画するかどうか
   * @default false
   */
  closed?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'strokeWidth'>;

export const StraightPipeGraphic = ({
  length = 120,
  width: widthProp,
  pipeWidth: pipeWidthProp,
  strokeWidth = 1.5,
  closed = false,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: StraightPipeGraphicProps) => {
  const actualWidth = pipeWidthProp ?? widthProp ?? 24;

  const d = closed
    ? `M 0 0 H ${length} M 0 ${actualWidth} H ${length} M 0 0 V ${actualWidth} M ${length} 0 V ${actualWidth}`
    : `M 0 0 H ${length} M 0 ${actualWidth} H ${length}`;

  return (
    <svg
      viewBox={`0 0 ${length} ${actualWidth}`}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      style={{
        overflow: 'visible',
        ...style,
      }}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={d}
      />
    </svg>
  );
};

export const StraightGraphic = StraightPipeGraphic;
