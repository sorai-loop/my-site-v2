import type { CSSProperties, ReactNode } from 'react';

export type JointGroupProps = {
  children: ReactNode;
  /**
   * 配管の向き（'horizontal' または 'vertical'）
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
  /**
   * 継手パーツ間の隙間（px）
   * @default 0
   */
  gap?: number;
  className?: string;
  style?: CSSProperties;
};

/**
 * パイプの継手パーツ（HexNut, Ring, Thread等）を直線状に整列させるグループコンポーネント
 */
export const JointGroup = ({
  children,
  orientation = 'horizontal',
  gap = 0,
  className,
  style,
}: JointGroupProps) => {
  const isVertical = orientation === 'vertical';

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: isVertical ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: gap > 0 ? `${gap}px` : undefined,
        ...style,
      }}
    >
      {children}
    </div>
  );
};
