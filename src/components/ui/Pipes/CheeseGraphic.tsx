import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type CheeseGraphicProps = {
  /**
   * サイズ
   * @default centered ? 26 : 26
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
   * 接続ポートを中心軸に揃える余白を持たせるか
   * @default true
   */
  centered?: boolean;
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
   * 太さ
   * @default 1.5
   */
  strokeWidth?: number;
  /**
   * 開口端面線を描画するか
   * @default true
   */
  closed?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const CheeseGraphic = ({
  size,
  width: widthProp,
  height: heightProp,
  centered = true,
  flipX = false,
  flipY = false,
  rotate = 0,
  strokeWidth = 1.5,
  closed = true,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: CheeseGraphicProps) => {
  const baseWidth = 26;
  const baseHeight = centered ? 26 : 22;

  const actualWidth = widthProp ?? size ?? baseWidth;
  const actualHeight = heightProp ?? size ?? (centered ? actualWidth : (actualWidth * 22) / 26);

  const sx = actualWidth / baseWidth;
  const sy = actualHeight / baseHeight;

  const r = (val: number) => Math.round(val * 100) / 100;

  const px = (origX: number) => r((origX - 10) * sx);
  const py = (origY: number) => (centered ? r((origY - 4) * sy) : r((origY - 9) * sy));

  const dTop = `M ${px(10)} ${py(10)} V ${py(9)} H ${px(11)} L ${px(13)} ${py(10)} H ${px(33)} L ${px(35)} ${py(9)} H ${px(36)} V ${py(10)}`;

  const dBottomLeft = `M ${px(10)} ${py(24)} V ${py(25)} H ${px(11)} L ${px(13)} ${py(24)} H ${px(16)} V ${py(27)} L ${px(15)} ${py(29)} V ${py(30)} H ${px(16)}`;

  const dBottomRight = `M ${px(36)} ${py(24)} V ${py(25)} H ${px(35)} L ${px(33)} ${py(24)} H ${px(30)} V ${py(27)} L ${px(31)} ${py(29)} V ${py(30)} H ${px(30)}`;

  const dRibs = `M ${px(13)} ${py(10)} V ${py(24)} M ${px(33)} ${py(10)} V ${py(24)} M ${px(16)} ${py(28)} H ${px(30)}`;

  const dClosed = closed
    ? `M ${px(10)} ${py(10)} V ${py(24)} M ${px(36)} ${py(10)} V ${py(24)} M ${px(16)} ${py(30)} H ${px(30)}`
    : '';

  const arcRadiusX = r(25 * sx);
  const arcRadiusY = r(190 * sy);
  const dArc = `M ${px(16)} ${py(24)} A ${arcRadiusX} ${arcRadiusY} 0 0 1 ${px(30)} ${py(24)}`;

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
        d={`${dTop} ${dBottomLeft} ${dBottomRight} ${dRibs} ${dClosed}`.trim()}
      />
      <path
        stroke="currentColor"
        strokeWidth={Math.max(0.7, r(strokeWidth * 0.67))}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dArc}
      />
    </svg>
  );
};

export const TeeGraphic = CheeseGraphic;
export const Cheese = CheeseGraphic;
