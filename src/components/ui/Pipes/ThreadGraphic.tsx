import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import {
  computePipeProportions,
  DEFAULT_PIPE_SIZE,
  DEFAULT_STROKE_WIDTH,
} from './pipeProportions';

export type ThreadGraphicProps = {
  /**
   * 基準パイプ径
   * @default 14
   */
  pipeSize?: number;
  /**
   * ネジ山の外径
   */
  size?: number;
  /**
   * 長さ
   */
  length?: number;
  /**
   * 巻き数
   */
  turns?: number;
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
  pipeSize,
  size,
  length,
  turns,
  orientation = 'horizontal',
  strokeWidth = DEFAULT_STROKE_WIDTH,
  closed = false,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: ThreadGraphicProps) => {
  const proportions = computePipeProportions(pipeSize ?? DEFAULT_PIPE_SIZE);
  const actualHeight = size ?? proportions.threadOuterSize;

  const rotate = orientation === 'vertical' ? 90 : 0;

  const actualPitch = (actualHeight * 2) / 15;
  const crestDepth = actualHeight / 15;
  const ridgeStrokeWidth = Math.round(strokeWidth * 0.47 * 10) / 10;

  let actualTurns = turns;
  if (actualTurns === undefined) {
    const targetLength = length ?? proportions.threadLength;
    actualTurns = Math.max(1, Math.round((targetLength - actualPitch / 2) / actualPitch));
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
        d={`${dTop} ${dBottom} ${dClosed}`}
      />
      <path
        stroke="currentColor"
        strokeWidth={ridgeStrokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        d={dRidges.trim()}
      />
    </svg>
  );
};

export const Thread = ThreadGraphic;
