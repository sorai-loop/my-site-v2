import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import {
  computePipeProportions,
  DEFAULT_PIPE_SIZE,
  DEFAULT_STROKE_WIDTH,
} from './pipeProportions';

export type StraightPipeGraphicProps = {
  /**
   * 基準パイプ径
   * @default 14
   */
  pipeSize?: number;
  /**
   * パイプの長さ
   * @default 100
   */
  length?: number;
  /**
   * パイプの太さ
   */
  width?: number;
  /**
   * パイプの向き
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 縦向き
   * @default false
   */
  vertical?: boolean;
  /**
   * 親コンテナに合わせて伸縮するかどうか
   * @default false
   */
  flexible?: boolean;
  /**
   * 線の太さ
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
  pipeSize,
  length = 100,
  width,
  orientation,
  vertical = false,
  flexible = false,
  strokeWidth = DEFAULT_STROKE_WIDTH,
  closed = false,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: StraightPipeGraphicProps) => {
  const proportions = computePipeProportions(pipeSize ?? DEFAULT_PIPE_SIZE);
  const isVertical = orientation !== undefined ? orientation === 'vertical' : vertical;
  const actualWidth = width ?? proportions.pipeWidth;

  const svgWidth = flexible ? (isVertical ? actualWidth : '100%') : isVertical ? actualWidth : length;
  const svgHeight = flexible ? (isVertical ? '100%' : actualWidth) : isVertical ? length : actualWidth;

  const viewBox = flexible
    ? isVertical
      ? `0 0 ${actualWidth} 100`
      : `0 0 100 ${actualWidth}`
    : `0 0 ${isVertical ? actualWidth : length} ${isVertical ? length : actualWidth}`;

  const d = flexible
    ? isVertical
      ? closed
        ? `M 0 0 V 100 M ${actualWidth} 0 V 100 M 0 0 H ${actualWidth} M 0 100 H ${actualWidth}`
        : `M 0 0 V 100 M ${actualWidth} 0 V 100`
      : closed
        ? `M 0 0 H 100 M 0 ${actualWidth} H 100 M 0 0 V ${actualWidth} M 100 0 V ${actualWidth}`
        : `M 0 0 H 100 M 0 ${actualWidth} H 100`
    : isVertical
      ? closed
        ? `M 0 0 V ${length} M ${actualWidth} 0 V ${length} M 0 0 H ${actualWidth} M 0 ${length} H ${actualWidth}`
        : `M 0 0 V ${length} M ${actualWidth} 0 V ${length}`
      : closed
        ? `M 0 0 H ${length} M 0 ${actualWidth} H ${length} M 0 0 V ${actualWidth} M ${length} 0 V ${actualWidth}`
        : `M 0 0 H ${length} M 0 ${actualWidth} H ${length}`;

  return (
    <svg
      viewBox={viewBox}
      width={svgWidth}
      height={svgHeight}
      preserveAspectRatio={flexible ? 'none' : undefined}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden={ariaHidden}
      style={{
        overflow: 'visible',
        display: flexible ? 'block' : 'inline-block',
        verticalAlign: 'middle',
        ...(flexible
          ? isVertical
            ? { width: `${actualWidth}px`, height: '100%' }
            : { width: '100%', height: `${actualWidth}px` }
          : {}),
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
export const Straight = StraightPipeGraphic;
