import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { HexNutGraphic } from './HexNutGraphic';
import { PaddingGraphic } from './PaddingGraphic';
import {
  computePipeProportions,
  DEFAULT_PIPE_SIZE,
  DEFAULT_STROKE_WIDTH,
} from './pipeProportions';
import { StraightPipeGraphic } from './StraightPipeGraphic';
import { ThreadGraphic } from './ThreadGraphic';

export type UnionPartType = 'pipe' | 'mainNut' | 'padding' | 'subNut' | 'neck' | 'thread';

const DEFAULT_UNION_ORDER: UnionPartType[] = [
  'pipe',
  'mainNut',
  'padding',
  'subNut',
  'neck',
  'thread',
];

export type UnionGraphicProps = {
  /**
   * 基準パイプ径
   * @default 14
   */
  size?: number;
  /**
   * 配管の向き
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

export const UnionGraphic = ({
  size = DEFAULT_PIPE_SIZE,
  orientation = 'horizontal',
  strokeWidth = DEFAULT_STROKE_WIDTH,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: UnionGraphicProps) => {
  const proportions = computePipeProportions(size);
  const s = proportions.pipeWidth;

  // 基準径に基づくプロポーション算出
  const pipeLength = Math.round(s * 0.57); // 14 -> 8
  const pipeHeight = Math.round(s * 1.43); // 14 -> 20
  const mainNutWidth = Math.round(s * 1.0); // 14 -> 14
  const mainNutHeight = Math.round(s * 2.43); // 14 -> 34
  const paddingWidth = proportions.paddingWidth;
  const paddingHeight = proportions.paddingHeight;
  const paddingInnerHeight = proportions.paddingInnerHeight;
  const subNutWidth = Math.round(s * 0.57); // 14 -> 8
  const subNutHeight = Math.round(s * 2.0); // 14 -> 28
  const neckWidth = 4;
  const threadLength = Math.round(s * 1.0); // 14 -> 14
  const threadHeight = Math.round(s * 1.43); // 14 -> 20

  const rotate = orientation === 'vertical' ? 90 : 0;

  const r = (val: number) => Math.round(val * 100) / 100;

  const actualPitch = (threadHeight * 2) / 15;
  const actualTurns = Math.max(1, Math.round((threadLength - actualPitch / 2) / actualPitch));
  const actualThreadWidth = r(actualTurns * actualPitch + actualPitch / 2);

  const actualNeckHeight = Math.max(threadHeight + 4, Math.min(subNutHeight - 6, threadHeight + 4));

  const getPartMeta = (type: UnionPartType) => {
    switch (type) {
      case 'pipe':
        return { width: pipeLength, height: pipeHeight };
      case 'mainNut':
        return { width: mainNutWidth, height: mainNutHeight };
      case 'padding':
        return { width: paddingWidth, height: paddingHeight };
      case 'subNut':
        return { width: subNutWidth, height: subNutHeight };
      case 'neck':
        return { width: neckWidth, height: actualNeckHeight };
      case 'thread':
        return { width: actualThreadWidth, height: threadHeight };
    }
  };

  const activeParts = DEFAULT_UNION_ORDER.filter((type) => {
    const meta = getPartMeta(type);
    return meta.width > 0;
  });

  const maxHeight = Math.max(
    ...activeParts.map((type) => getPartMeta(type).height),
    20
  );

  const { positionedParts, totalWidth } = DEFAULT_UNION_ORDER.reduce<{
    positionedParts: Array<{
      type: UnionPartType;
      index: number;
      x: number;
      width: number;
      height: number;
    }>;
    totalWidth: number;
  }>(
    (acc, type, index) => {
      const meta = getPartMeta(type);
      const x = r(acc.totalWidth);
      const nextTotal = meta.width > 0 ? r(acc.totalWidth + meta.width) : acc.totalWidth;
      return {
        positionedParts: [
          ...acc.positionedParts,
          { type, index, x, width: meta.width, height: meta.height },
        ],
        totalWidth: nextTotal,
      };
    },
    { positionedParts: [], totalWidth: 0 }
  );

  const yCenter = (h: number) => r((maxHeight - h) / 2);

  return (
    <svg
      viewBox={`0 0 ${totalWidth} ${r(maxHeight)}`}
      width={totalWidth}
      height={r(maxHeight)}
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
      {positionedParts.map(({ type, index, x, width }) => {
        if (width <= 0) return null;

        const key = `${type}-${index}`;

        switch (type) {
          case 'pipe':
            return (
              <StraightPipeGraphic
                key={key}
                x={x}
                y={yCenter(pipeHeight)}
                length={pipeLength}
                width={pipeHeight}
                strokeWidth={strokeWidth}
                closed
                aria-hidden="true"
              />
            );

          case 'mainNut':
            return (
              <HexNutGraphic
                key={key}
                x={x}
                y={yCenter(mainNutHeight)}
                thickness={mainNutWidth}
                size={mainNutHeight}
                strokeWidth={strokeWidth}
                aria-hidden="true"
              />
            );

          case 'padding':
            return (
              <PaddingGraphic
                key={key}
                x={x}
                y={yCenter(paddingHeight)}
                width={paddingWidth}
                height={paddingHeight}
                innerHeight={paddingInnerHeight}
                flip
                showDivider
                strokeWidth={strokeWidth}
                aria-hidden="true"
              />
            );

          case 'subNut':
            return (
              <HexNutGraphic
                key={key}
                x={x}
                y={yCenter(subNutHeight)}
                thickness={subNutWidth}
                size={subNutHeight}
                strokeWidth={strokeWidth}
                aria-hidden="true"
              />
            );

          case 'neck':
            return (
              <PaddingGraphic
                key={key}
                x={x}
                y={yCenter(actualNeckHeight)}
                width={neckWidth}
                height={actualNeckHeight}
                innerHeight={threadHeight}
                flip
                showDivider
                strokeWidth={strokeWidth}
                aria-hidden="true"
              />
            );

          case 'thread':
            return (
              <ThreadGraphic
                key={key}
                x={x}
                y={yCenter(threadHeight)}
                length={threadLength}
                size={threadHeight}
                strokeWidth={strokeWidth}
                closed
                aria-hidden="true"
              />
            );

          default:
            return null;
        }
      })}
    </svg>
  );
};

export const Union = UnionGraphic;
