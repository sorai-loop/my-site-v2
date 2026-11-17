import { useId, type CSSProperties, type ReactNode } from 'react';
import type { StackIconName } from '../../types/stack';
import { recolorSvg, resolveSvgText } from '../../utils/stackSvg';
import { StackFrameGraphic } from './StackFrameGraphic';
import styles from './StackIcon.module.css';

export type StackIconProps = {
  icon?: StackIconName;
  /** icon と同様*/
  iconPath?: string;
  name?: string;
  /** 枠の形状 ('square' | 'circle') */
  shape?: 'square' | 'circle';
  /** 独自の子SVG要素を直接流し込む場合 */
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** ノイズの有無 */
  bleed?: boolean;
  /** ステインの有無 */
  stain?: boolean;
  'aria-hidden'?: boolean | 'true' | 'false';
};

/**
 * StackIcon
 * - 外枠: StackFrameGraphic
 * - 内側: このセクションで描画
 */
export const StackIcon = ({
  icon,
  iconPath,
  name,
  shape = 'square',
  children,
  className,
  style,
  bleed = true,
  stain = true,
  'aria-hidden': ariaHidden = true,
}: StackIconProps) => {
  const uniqueId = useId();
  const cleanId = uniqueId.replace(/[:]/g, '');

  const target = icon || iconPath || name;
  const rawSvg = resolveSvgText(target);
  const recoloredSvg = rawSvg
    ? recolorSvg(rawSvg, {
        bleed,
        stain,
        filterId: `stack-icon-bleed-${cleanId}`,
        stainFilterId: `stack-icon-stain-${cleanId}`,
        maskId: `stack-icon-mask-${cleanId}`,
        className: styles.vectorIcon,
      })
    : null;

  return (
    <div
      className={className ? `${styles.frame} ${className}` : styles.frame}
      style={style}
      aria-hidden={ariaHidden}
    >
      {/* 外枠SVGスタンプにじみ・ステイン */}
      <StackFrameGraphic
        shape={shape}
        bleed={bleed}
        stain={stain}
        filterId={`stack-frame-bleed-${cleanId}`}
        stainFilterId={`stack-frame-stain-${cleanId}`}
        maskId={`stack-frame-mask-${cleanId}`}
        aria-hidden="true"
      />

      {/* 内側コンテンツ */}
      <div className={styles.innerContainer}>
        {recoloredSvg ? (
          <div
            className={styles.childContainer}
            dangerouslySetInnerHTML={{ __html: recoloredSvg }}
          />
        ) : children ? (
          <div className={styles.childContainer}>{children}</div>
        ) : target && (target.startsWith('/') || target.startsWith('http')) ? (
          <span
            className={styles.maskedIcon}
            style={{
              WebkitMaskImage: `url("${target}")`,
              maskImage: `url("${target}")`,
            }}
            aria-hidden="true"
          />
        ) : (
          <span className={styles.fallbackGlyph} aria-hidden="true">
            {target ? target.replace(/[^a-zA-Z0-9]/g, '').slice(0, 3).toUpperCase() : '✦'}
          </span>
        )}
      </div>
    </div>
  );
};
