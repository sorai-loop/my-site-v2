import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type ElbowGraphicProps = {
  /**
   * サイズ
   * @default 28
   */
  size?: number;
  /**
   * 横幅
   */
  width?: number;
  /**
   * 縦幅
   */
  height?: number;
  /**
   * 太さ
   * @default 1.5
   */
  strokeWidth?: number;
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
   * 開口端面線を描画するか
   * @default true
   */
  closed?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const ElbowGraphic = ({
  size,
  width: widthProp,
  height: heightProp,
  strokeWidth = 1.5,
  flipX = false,
  flipY = false,
  rotate = 0,
  closed = true,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: ElbowGraphicProps) => {
  const actualSize = size ?? 28;
  const actualWidth = widthProp ?? actualSize;
  const actualHeight = heightProp ?? actualSize;

  const sx = actualWidth / 28;
  const sy = actualHeight / 28;

  const r = (val: number) => Math.round(val * 100) / 100;
  const px = (origX: number) => r((origX - 5) * sx);
  const py = (origY: number) => r((origY - 5) * sy);

  const dOuter = `M ${px(5)} ${py(5)} H ${px(8)} L ${px(9)} ${py(7)} H ${px(13)} A ${r(18 * sx)} ${r(18 * sy)} 0 0 1 ${px(31)} ${py(25)} V ${py(29)} L ${px(33)} ${py(30)} V ${py(33)}`;

  const dInner = `M ${px(5)} ${py(23)} H ${px(8)} L ${px(9)} ${py(21)} H ${px(11)} A ${r(6 * sx)} ${r(6 * sy)} 0 0 1 ${px(17)} ${py(27)} V ${py(29)} L ${px(15)} ${py(30)} V ${py(33)}`;

  const dRibs = `M ${px(9)} ${py(7)} V ${py(21)} M ${px(17)} ${py(29)} H ${px(31)}`;

  const dClosed = closed
    ? `M ${px(5)} ${py(5)} V ${py(23)} M ${px(15)} ${py(33)} H ${px(33)}`
    : '';

  const transforms = [
    flipX ? 'scaleX(-1)' : '',
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
        d={`${dOuter} ${dInner} ${dRibs} ${dClosed}`.trim()}
      />
    </svg>
  );
};

export const Elbow90Graphic = ElbowGraphic;
export const Elbow = ElbowGraphic;
