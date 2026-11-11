import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type PaddingGraphicProps = {
  /**
   * 横幅
   * @default 4
   */
  width?: number;
  /**
   * エイリアス
   */
  length?: number;
  /**
   * 縦幅（広い方）
   * @default 18
   */
  height?: number;
  /**
   * エイリアス
   */
  size?: number;
  /**
   * 縦幅（狭い方）
   */
  innerHeight?: number;
  /**
   * 左右反転
   * @default false
   */
  flip?: boolean;
  /**
   * 水平反転
   * @default false
   */
  flipX?: boolean;
  /**
   * 垂直反転
   * @default false
   */
  flipY?: boolean;
  /**
   * 回転角度
   * @default 0
   */
  rotate?: number;
  /**
   * 段差の折れ目に縦線を描画するか
   * @default false
   */
  showDivider?: boolean;
  /**
   * 太さ
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
  flipX = false,
  flipY = false,
  rotate = 0,
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

  const isFlipped = flip || flipX;

  const dTop = isFlipped
    ? `M 0 0 H ${x1} L ${x2} ${innerTop} H ${x3}`
    : `M 0 ${innerTop} H ${x1} L ${x2} 0 H ${x3}`;

  const dBottom = isFlipped
    ? `M 0 ${r(actualHeight)} H ${x1} L ${x2} ${innerBottom} H ${x3}`
    : `M 0 ${innerBottom} H ${x1} L ${x2} ${r(actualHeight)} H ${x3}`;

  const dDivider = showDivider
    ? isFlipped
      ? `M ${x1} 0 V ${r(actualHeight)} M ${x2} ${innerTop} V ${innerBottom}`
      : `M ${x1} ${innerTop} V ${innerBottom} M ${x2} 0 V ${r(actualHeight)}`
    : '';

  const transforms = [
    flipY ? 'scaleY(-1)' : '',
    rotate !== 0 ? `rotate(${rotate}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ');

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
        transform: transforms || undefined,
        transformOrigin: 'center',
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
