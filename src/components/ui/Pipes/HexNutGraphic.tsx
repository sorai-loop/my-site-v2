import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type HexNutGraphicProps = {
  /**
   * 厚さ
   * @default 22
   */
  thickness?: number;
  /**
   * エイリアス
   */
  width?: number;
  /**
   * 高さ
   * @default 50
   */
  height?: number;
  /**
   * エイリアス
   */
  size?: number;
  /**
   * 太さ
   * @default 1.5
   */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const HexNutGraphic = ({
  thickness,
  width: widthProp,
  height: heightProp,
  size,
  strokeWidth = 1.5,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: HexNutGraphicProps) => {
  const actualThickness = thickness ?? widthProp ?? 22;
  const actualHeight = heightProp ?? size ?? 50;

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
