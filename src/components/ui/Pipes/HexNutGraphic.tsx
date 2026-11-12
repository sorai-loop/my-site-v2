import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import {
  computePipeProportions,
  DEFAULT_PIPE_SIZE,
  DEFAULT_STROKE_WIDTH,
} from './pipeProportions';

export type HexNutGraphicProps = {
  /**
   * 基準パイプ径
   * @default 14
   */
  pipeSize?: number;
  /**
   * ナット外径
   */
  size?: number;
  /**
   * ナット厚さ
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

export const HexNutGraphic = ({
  pipeSize,
  size,
  thickness,
  orientation = 'horizontal',
  strokeWidth = DEFAULT_STROKE_WIDTH,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: HexNutGraphicProps) => {
  const proportions = computePipeProportions(pipeSize ?? DEFAULT_PIPE_SIZE);
  const actualThickness = thickness ?? proportions.nutThickness;
  const actualHeight = size ?? proportions.nutOuterSize;

  const rotate = orientation === 'vertical' ? 90 : 0;

  const r = (val: number) => Math.round(val * 100) / 100;

  const x = (baseX: number) => r(((baseX - 6) / 22) * actualThickness);
  const y = (baseY: number) => r((baseY / 50) * actualHeight);

  const dOuter = `M ${x(10)} ${y(0)} H ${x(24)} L ${x(28)} ${y(5)} V ${y(45)} L ${x(24)} ${y(50)} H ${x(10)} L ${x(6)} ${y(45)} V ${y(5)} Z`;

  const dRidges = `M ${x(24)} ${y(0)} L ${x(28)} ${y(7)} L ${x(25)} ${y(14)} L ${x(28)} ${y(21)} V ${y(29)} L ${x(25)} ${y(36)} L ${x(28)} ${y(43)} L ${x(24)} ${y(50)} H ${x(10)} L ${x(6)} ${y(43)} L ${x(9)} ${y(36)} L ${x(6)} ${y(29)} V ${y(21)} L ${x(9)} ${y(14)} L ${x(6)} ${y(7)} L ${x(10)} ${y(0)} Z`;

  const dHLine = `M ${x(9)} ${y(14)} H ${x(25)} M ${x(9)} ${y(36)} H ${x(25)}`;

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
        d={dRidges}
      />
      <path
        stroke="currentColor"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dHLine}
      />
    </svg>
  );
};

export const HexNut = HexNutGraphic;
