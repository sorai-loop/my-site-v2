import { useMemo, type CSSProperties } from 'react';
import type { StackItem } from '../../types/stack';
import { StackIcon } from '../ui/StackIcon';
import styles from './StackEntryRow.module.css';

export type StackEntryRowProps = {
  item: StackItem;
};

/**
 * スタックのアイコンにランダムな傾きを設ける
 * 各スタックのアイコンとタイトル、説明文を追記する
 */
const getDeterministicTilt = (seed: string): number => {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  const normalized = Math.abs(hash % 1000) / 1000;
  const rawTilt = -2.6 + normalized * 5.2;
  const tilt = Math.abs(rawTilt) < 0.5 ? (rawTilt >= 0 ? 0.8 : -0.8) : rawTilt;
  return Math.round(tilt * 10) / 10;
};

export const StackEntryRow = ({ item }: StackEntryRowProps) => {
  const tilt = useMemo(
    () => getDeterministicTilt(item.id || item.name),
    [item.id, item.name]
  );

  return (
    <li className={styles.entryItem}>
      {/* 左カラム: SVGアイコン　*/}
      <div className={styles.leftColumn}>
        <div
          className={styles.iconFrame}
          style={{ '--stamp-rotate': `${tilt}deg` } as CSSProperties}
        >
          <StackIcon
            icon={item.icon || item.iconPath}
            className={styles.iconSvg}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* 右カラム: 技術名＋ こだわりメモ本文 */}
      <div className={styles.rightColumn}>
        <div className={styles.itemHeader}>
          <span className={styles.domainLabel}>// {item.domainLabel}</span>
          <h3 className={styles.techName}>{item.name}</h3>
        </div>
        <p className={styles.memoBody}>{item.description}</p>
      </div>
    </li>
  );
};
