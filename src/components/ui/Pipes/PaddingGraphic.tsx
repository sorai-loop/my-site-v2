import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type PaddingGraphicProps = {
  /**
   * 長さ
   * @default 4
   */
  width?: number;
  /**
   * エイリアス
   */
  length?: number;
  /**
   * 縦幅
   * @default 18
   */
  height?: number;
  /**
   * エイリアス
   */
  size?: number;
  /**
   * 狭い方の縦幅
   */
  innerHeight?: number;
  /**
   * 左右反転
   * @default false
   */
  flip?: boolean;
  /**
   * 段差の折れ目に縦線を描画するかどうか
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
  width: widthProp,
  length: lengthProp,
  height: heightProp,
  size,
  innerHeight: innerHeightProp,
  flip = false,
  showDivider = false,
  strokeWidth = 1.5,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: PaddingGraphicProps) => {
  const actualWidth = widthProp ?? lengthProp ?? 4;
  const actualHeight = heightProp ?? size ?? 18;
  const actualInnerHeight = innerHeightProp ?? (actualHeight * 14) / 18;

  const r = (val: number) => Math.round(val * 100) / 100;

  const innerTop = r((actualHeight - actualInnerHeight) / 2);
  const innerBottom = r(actualHeight - innerTop);

  const x1 = r(actualWidth * 0.25);
  const x2 = r(actualWidth * 0.75);
  const x3 = r(actualWidth);

  const dTop = flip
    ? `M 0 0 H ${x1} L ${x2} ${innerTop} H ${x3}`
    : `M 0 ${innerTop} H ${x1} L ${x2} 0 H ${x3}`;

  const dBottom = flip
    ? `M 0 ${r(actualHeight)} H ${x1} L ${x2} ${innerBottom} H ${x3}`
    : `M 0 ${innerBottom} H ${x1} L ${x2} ${r(actualHeight)} H ${x3}`;

  const dDivider = showDivider
    ? flip
      ? `M ${x1} 0 V ${r(actualHeight)} M ${x2} ${innerTop} V ${innerBottom}`
      : `M ${x1} ${innerTop} V ${innerBottom} M ${x2} 0 V ${r(actualHeight)}`
    : '';

  return (
    <svg
      viewBox={`0 0 ${r(actualWidth)} ${r(actualHeight)}`}
      width={r(actualWidth)}
      height={r(actualHeight)}
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
