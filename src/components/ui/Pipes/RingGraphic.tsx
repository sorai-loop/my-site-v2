import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type RingGraphicProps = {
  /**
   * リング（そろばん玉）の厚さ（横幅・X方向）
   * @default 22
   */
  thickness?: number;
  /**
   * `thickness` のエイリアス
   */
  width?: number;
  /**
   * リング（そろばん玉）の全高・外径（縦幅・Y方向）
   * @default 32
   */
  height?: number;
  /**
   * `height` のエイリアス
   */
  size?: number;
  /**
   * 水平方向（左右）反転
   * @default false
   */
  flipX?: boolean;
  /**
   * 垂直方向（上下）反転
   * @default false
   */
  flipY?: boolean;
  /**
   * 回転角度（度単位、例: 90 で垂直パイプ用、180, 270, 45）
   * @default 0
   */
  rotate?: number;
  /**
   * 線の太さ
   * @default 1.5
   */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const RingGraphic = ({
  thickness,
  width: widthProp,
  height: heightProp,
  size,
  flipX = false,
  flipY = false,
  rotate = 0,
  strokeWidth = 1.5,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: RingGraphicProps) => {
  const actualThickness = thickness ?? widthProp ?? 22;
  const actualHeight = heightProp ?? size ?? 32;

  const sx = actualThickness / 22;
  const sy = actualHeight / 32;

  const r = (val: number) => Math.round(val * 100) / 100;
  // Ring.svg の基準座標 (x: 9〜31, y: 0〜32) を (0, 0) 起点にマッピング
  const px = (origX: number) => r((origX - 9) * sx);
  const py = (origY: number) => r(origY * sy);

  // 外郭（そろばん玉の胴体）
  const dOuter = `M ${px(18)} ${py(0)} H ${px(22)} L ${px(31)} ${py(4)} V ${py(28)} L ${px(22)} ${py(32)} H ${px(18)} L ${px(9)} ${py(28)} V ${py(4)} Z`;

  // 中央の縦線2本
  const dVerticals = `M ${px(17)} ${py(0)} V ${py(32)} M ${px(23)} ${py(0)} V ${py(32)}`;

  const transforms = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
    rotate !== 0 ? `rotate(${rotate}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${actualThickness} ${actualHeight}`}
      width={actualThickness}
      height={actualHeight}
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
        d={dOuter}
      />
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dVerticals}
      />
    </svg>
  );
};

export const Ring = RingGraphic;
