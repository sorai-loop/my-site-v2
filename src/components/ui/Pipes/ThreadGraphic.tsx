import type { ComponentPropsWithoutRef, CSSProperties } from 'react';

export type ThreadGraphicProps = {
  /**
   * 長さ
   */
  length?: number;
  /**
   * 巻き数
   * @default 1（length未指定時）
   */
  turns?: number;
  /**
   * 高さ
   * @default 15
   */
  height?: number;
  /**
   * エイリアス
   */
  size?: number;
  /**
   * 1周のピッチ
   */
  pitch?: number;
  /**
   * 太さ
   * @default 1.5
   */
  strokeWidth?: number;
  /**
   * 太さ
   * @default strokeWidth
   */
  ridgeStrokeWidth?: number;
  /**
   * 両端を閉じるか
   * @default false
   */
  closed?: boolean;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth'>;

export const ThreadGraphic = ({
  length: lengthProp,
  turns: turnsProp,
  height: heightProp,
  size,
  pitch: pitchProp,
  strokeWidth = 1.5,
  ridgeStrokeWidth: ridgeStrokeWidthProp,
  closed = false,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: ThreadGraphicProps) => {
  const actualHeight = heightProp ?? size ?? 15;
  const actualPitch = pitchProp ?? (actualHeight * 2) / 15;
  const crestDepth = (actualHeight * 1) / 15;
  const actualRidgeStrokeWidth = ridgeStrokeWidthProp ?? Math.round(strokeWidth * 0.47 * 10) / 10;

  let actualTurns = turnsProp;
  if (actualTurns === undefined) {
    if (lengthProp !== undefined) {
      actualTurns = Math.max(1, Math.round((lengthProp - actualPitch / 2) / actualPitch));
    } else {
      actualTurns = 1;
    }
  }

  const r = (val: number) => Math.round(val * 100) / 100;
  const totalWidth = r(actualTurns * actualPitch + actualPitch / 2);

  let dTop = 'M 0 0';
  for (let i = 0; i < actualTurns; i++) {
    const midX = r(i * actualPitch + actualPitch / 2);
    const endX = r((i + 1) * actualPitch);
    dTop += ` L ${midX} ${r(crestDepth)} L ${endX} 0`;
  }

  let dBottom = `M ${r(actualPitch / 2)} ${r(actualHeight - crestDepth)}`;
  for (let i = 0; i < actualTurns; i++) {
    const peakX = r((i + 1) * actualPitch);
    const endX = r((i + 1) * actualPitch + actualPitch / 2);
    dBottom += ` L ${peakX} ${r(actualHeight)} L ${endX} ${r(actualHeight - crestDepth)}`;
  }

  let dRidges = '';
  for (let i = 0; i < actualTurns; i++) {
    const startX = r(i * actualPitch + actualPitch / 2);
    const endX = r((i + 1) * actualPitch);
    dRidges += `M ${startX} ${r(crestDepth)} L ${endX} ${r(actualHeight)} `;
  }

  const dClosed = closed
    ? `M 0 0 L ${r(actualPitch / 2)} ${r(actualHeight - crestDepth)} M ${r(actualTurns * actualPitch)} 0 L ${totalWidth} ${r(actualHeight - crestDepth)}`
    : '';

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${r(actualHeight)}`}
      width={totalWidth}
      height={r(actualHeight)}
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
        d={`${dTop} ${dBottom} ${dClosed}`}
      />
      <path
        stroke="currentColor"
        strokeWidth={actualRidgeStrokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dRidges.trim()}
      />
    </svg>
  );
};

export const Thread = ThreadGraphic;
