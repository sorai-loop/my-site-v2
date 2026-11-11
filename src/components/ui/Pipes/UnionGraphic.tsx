import type { ComponentPropsWithoutRef, CSSProperties } from 'react';
import { HexNutGraphic } from './HexNutGraphic';
import { PaddingGraphic } from './PaddingGraphic';
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
   * パーツの並び順
   * @default ['pipe', 'mainNut', 'padding', 'subNut', 'neck', 'thread']
   */
  order?: UnionPartType[];
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
   * 左端パイプ部の横幅
   * @default 16
   */
  pipeLength?: number;
  /**
   * 左端パイプ部の縦幅
   * @default 28
   */
  pipeHeight?: number;
  /**
   * メインナットの横幅
   * @default 22
   */
  mainNutWidth?: number;
  /**
   * メインナットの縦幅
   * @default 50
   */
  mainNutHeight?: number;
  /**
   * パディングの横幅
   * @default 5
   */
  paddingWidth?: number;
  /**
   * パディングの縦幅（広い方）
   * @default 36
   */
  paddingHeight?: number;
  /**
   * パディングの縦幅（狭い方）
   * @default 30
   */
  paddingInnerHeight?: number;
  /**
   * パディングの段差反転
   * @default true
   */
  flipPadding?: boolean;
  /**
   * サブナットの厚さ
   * @default 10
   */
  subNutWidth?: number;
  /**
   * サブナットの縦幅
   * @default 42
   */
  subNutHeight?: number;
  /**
   * ネックの横幅
   * @default 4
   */
  neckWidth?: number;
  /**
   * ネックの縦幅
   */
  neckHeight?: number;
  /**
   * ネックの反転
   * @default true
   */
  flipNeck?: boolean;
  /**
   * ネジ山の横幅
   * @default 24
   */
  threadLength?: number;
  /**
   * ネジ山の縦幅
   * @default 30
   */
  threadHeight?: number;
  /**
   * ネジ山の巻き数
   */
  threadTurns?: number;
  /**
   * ネジ山のピッチ
   */
  threadPitch?: number;
  /**
   * 線の太さ
   * @default 1.5
   */
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
  'aria-hidden'?: boolean | 'true' | 'false';
} & Omit<ComponentPropsWithoutRef<'svg'>, 'width' | 'height' | 'strokeWidth' | 'order'>;

export const UnionGraphic = ({
  order = DEFAULT_UNION_ORDER,
  flipX = false,
  flipY = false,
  rotate = 0,
  pipeLength = 16,
  pipeHeight = 28,
  mainNutWidth = 22,
  mainNutHeight = 50,
  paddingWidth = 5,
  paddingHeight = 36,
  paddingInnerHeight = 30,
  flipPadding = true,
  subNutWidth = 10,
  subNutHeight = 42,
  neckWidth = 4,
  neckHeight,
  flipNeck = true,
  threadLength = 24,
  threadHeight = 30,
  threadTurns,
  threadPitch,
  strokeWidth = 1.5,
  className,
  style,
  'aria-hidden': ariaHidden = true,
  ...props
}: UnionGraphicProps) => {
  const r = (val: number) => Math.round(val * 100) / 100;

  const actualPitch = threadPitch ?? (threadHeight * 2) / 15;
  const actualTurns =
    threadTurns !== undefined
      ? threadTurns
      : Math.max(1, Math.round((threadLength - actualPitch / 2) / actualPitch));
  const actualThreadWidth = r(actualTurns * actualPitch + actualPitch / 2);

  const actualNeckHeight =
    neckHeight ?? Math.max(threadHeight + 4, Math.min(subNutHeight - 6, threadHeight + 4));

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

  const activeParts = order.filter((type) => {
    const meta = getPartMeta(type);
    return meta.width > 0;
  });

  const maxHeight = Math.max(
    ...activeParts.map((type) => getPartMeta(type).height),
    20
  );

  const { positionedParts, totalWidth } = order.reduce<{
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

  const transforms = [
    flipX ? 'scaleX(-1)' : '',
    flipY ? 'scaleY(-1)' : '',
    rotate !== 0 ? `rotate(${rotate}deg)` : '',
  ]
    .filter(Boolean)
    .join(' ');

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
        transform: transforms || undefined,
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
                height={mainNutHeight}
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
                flip={flipPadding}
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
                height={subNutHeight}
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
                flip={flipNeck}
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
                turns={threadTurns}
                height={threadHeight}
                pitch={threadPitch}
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
