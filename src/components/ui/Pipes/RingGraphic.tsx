import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import {
  computePipeProportions,
  DEFAULT_PIPE_SIZE,
  DEFAULT_STROKE_WIDTH,
} from './pipeProportions';

export type RingGraphicProps = {
  /**
   * 基準パイプ径
   * @default 14
   */
  pipeSize?: number;
  /**
   * リング外径
   */
  size?: number;
  /**
   * リング厚さ
   */
  thickness?: number;
  /**
   * パイプの向き
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
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
  pipeSize,
  size,
  thickness,
  orientation = 'horizontal',
  strokeWidth = DEFAULT_STROKE_WIDTH,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: RingGraphicProps) => {
  const proportions = computePipeProportions(pipeSize ?? DEFAULT_PIPE_SIZE);
  const actualThickness = thickness ?? proportions.ringThickness;
  const actualHeight = size ?? proportions.ringOuterSize;

  const rotate = orientation === 'vertical' ? 90 : 0;

  const sx = actualThickness / 22;
  const sy = actualHeight / 32;

  const r = (val: number) => Math.round(val * 100) / 100;
  // Ring.svg の基準座標 (x: 9〜31, y: 0〜32) を (0, 0) 起点にマッピング
  const px = (origX: number) => r((origX - 9) * sx);
  const py = (origY: number) => r(origY * sy);

  // 外郭
  const dOuter = `M ${px(18)} ${py(0)} H ${px(22)} L ${px(31)} ${py(4)} V ${py(28)} L ${px(22)} ${py(32)} H ${px(18)} L ${px(9)} ${py(28)} V ${py(4)} Z`;

  // 中央の縦線2本
  const dVerticals = `M ${px(17)} ${py(0)} V ${py(32)} M ${px(23)} ${py(0)} V ${py(32)}`;

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
        transform: rotate !== 0 ? `rotate(${rotate}deg)` : undefined,
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
