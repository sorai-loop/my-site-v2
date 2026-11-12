import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { DEFAULT_STROKE_WIDTH } from './pipeProportions';

export type PaddingGraphicProps = {
  /**
   * パディングの厚さ
   * @default 4
   */
  width?: number;
  /**
   * 縦幅
   * @default 18
   */
  height?: number;
  /**
   * 縦幅
   */
  innerHeight?: number;
  /**
   * 左右反転
   * @default false
   */
  flip?: boolean;
  /**
   * 段差の折れ目に縦線を描画するか
   * @default false
   */
  showDivider?: boolean;
  /**
   * 線の太さ
   * @default 1.5
   */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const PaddingGraphic = ({
  width = 4,
  height = 18,
  innerHeight,
  flip = false,
  showDivider = false,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: PaddingGraphicProps) => {
  const actualInnerHeight = innerHeight ?? (height * 14) / 18;

  const r = (val: number) => Math.round(val * 100) / 100;

  const innerTop = r((height - actualInnerHeight) / 2);
  const innerBottom = r(height - innerTop);

  const x1 = r(width * 0.25);
  const x2 = r(width * 0.75);
  const x3 = r(width);

  const dTop = flip
    ? `M 0 0 H ${x1} L ${x2} ${innerTop} H ${x3}`
    : `M 0 ${innerTop} H ${x1} L ${x2} 0 H ${x3}`;

  const dBottom = flip
    ? `M 0 ${r(height)} H ${x1} L ${x2} ${innerBottom} H ${x3}`
    : `M 0 ${innerBottom} H ${x1} L ${x2} ${r(height)} H ${x3}`;

  const dDivider = showDivider
    ? flip
      ? `M ${x1} 0 V ${r(height)} M ${x2} ${innerTop} V ${innerBottom}`
      : `M ${x1} ${innerTop} V ${innerBottom} M ${x2} 0 V ${r(height)}`
    : '';

  return (
    <svg
      viewBox={`0 0 ${r(width)} ${r(height)}`}
      width={r(width)}
      height={r(height)}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      style={{
        overflow: 'visible',
        display: 'inline-block',
        verticalAlign: 'middle',
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
        d={`${dTop} ${dBottom} ${dDivider}`.trim()}
      />
    </svg>
  );
};

export const Padding = PaddingGraphic;
