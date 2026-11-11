import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type StraightPipeGraphicProps = {
  /**
   * 長さ
   * @default 120
   */
  length?: number;
  /**
   * 太さ
   * @default 16
   */
  width?: number;
  /**
   * エイリアス
   */
  pipeWidth?: number;
  /**
   * 縦向き
   * @default false
   */
  vertical?: boolean;
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
   * 両端の開口部を塞ぐ線を描画するかどうか
   * @default false
   */
  closed?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const StraightPipeGraphic = ({
  length = 120,
  width: widthProp,
  pipeWidth: pipeWidthProp,
  vertical = false,
  flipX = false,
  flipY = false,
  rotate = 0,
  strokeWidth = 1.5,
  closed = false,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: StraightPipeGraphicProps) => {
  const actualWidth = pipeWidthProp ?? widthProp ?? 16;

  const svgWidth = vertical ? actualWidth : length;
  const svgHeight = vertical ? length : actualWidth;

  const d = vertical
    ? closed
      ? `M 0 0 V ${length} M ${actualWidth} 0 V ${length} M 0 0 H ${actualWidth} M 0 ${length} H ${actualWidth}`
      : `M 0 0 V ${length} M ${actualWidth} 0 V ${length}`
    : closed
      ? `M 0 0 H ${length} M 0 ${actualWidth} H ${length} M 0 0 V ${actualWidth} M ${length} 0 V ${actualWidth}`
      : `M 0 0 H ${length} M 0 ${actualWidth} H ${length}`;

  const transforms = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
    rotate !== 0 ? `rotate(${rotate}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <svg
      viewBox={`0 0 ${svgWidth} ${svgHeight}`}
      width={svgWidth}
      height={svgHeight}
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
        d={d}
      />
    </svg>
  );
};

export const StraightGraphic = StraightPipeGraphic;
