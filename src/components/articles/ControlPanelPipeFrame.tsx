import type { CSSProperties, ReactNode } from 'react';
import {
  CheeseGraphic,
  ElbowGraphic,
  HexNutGraphic,
  JointGroup,
  RingGraphic,
  StraightPipeGraphic,
  ThreadGraphic,
  UnionGraphic,
} from '../ui/Pipes';
import styles from './ControlPanelPipeFrame.module.css';

export type ControlPanelPipeFrameProps = {
  /**
   * 上部スロット
   */
  upperContent: ReactNode;
  /**
   * 下部スロット
   */
  lowerContent: ReactNode;
  className?: string;
  style?: CSSProperties;
};

/**
 * コントロールパネルの枠組みとなる配管フレームコンポーネント。
 * 上下2つのコンテンツスロットを配管パイプで囲み、高さに追従する縦管と分岐管を配置。
 */
export const ControlPanelPipeFrame = ({
  upperContent,
  lowerContent,
  className,
  style,
}: ControlPanelPipeFrameProps) => {
  return (
    <div
      className={className ? `${styles.pipeFrameBox} ${className}` : styles.pipeFrameBox}
      style={style}
    >
      {/* 1. 最上段パイプ行（右から入り左端で下へ折れる） */}
      <div className={styles.topPipeRow}>
        <ElbowGraphic from="right" to="bottom" aria-hidden="true" />
        <div className={styles.topPipeWrapper}>
          <StraightPipeGraphic flexible aria-hidden="true" />
          <div style={{ position: 'absolute', left: '48px' }}>
            <UnionGraphic aria-hidden="true" />
          </div>
          <div style={{ position: 'absolute', right: '36px' }}>
            <HexNutGraphic aria-hidden="true" />
          </div>
        </div>
        <ElbowGraphic from="left" to="top" aria-hidden="true" />
      </div>

      {/* 2. 上部コンテンツ行（上縦管 ＋ 右側に上部スロット） */}
      <div className={styles.upperContentRow}>
        <div className={styles.verticalPipeCol}>
          <StraightPipeGraphic vertical flexible aria-hidden="true" />
          <div className={styles.pillarDecoration}>
            <HexNutGraphic orientation="vertical" aria-hidden="true" />
          </div>
        </div>
        {upperContent}
      </div>

      {/* 3. 中間チーズ分岐行（チーズと水平分岐管を同一行で直結） */}
      <div className={styles.cheeseBranchRow}>
        <CheeseGraphic
          passThrough="vertical"
          branch="right"
          closed={true}
          aria-hidden="true"
        />
        <div className={styles.branchPipeWrapper}>
          <StraightPipeGraphic flexible aria-hidden="true" />
          <JointGroup style={{ position: 'absolute', left: '16px' }}>
            <ThreadGraphic aria-hidden="true" />
            <HexNutGraphic aria-hidden="true" />
          </JointGroup>
          <JointGroup style={{ position: 'absolute', right: '0px' }}>
            <RingGraphic aria-hidden="true" />
            <HexNutGraphic aria-hidden="true" />
          </JointGroup>
        </div>
      </div>

      {/* 4. 下部コンテンツ行（下縦管 ＋ 右側に下部スロット） */}
      <div className={styles.lowerContentRow}>
        <div className={styles.verticalPipeCol}>
          <StraightPipeGraphic vertical flexible aria-hidden="true" />
          <div className={styles.pillarDecoration}>
            <RingGraphic orientation="vertical" aria-hidden="true" />
          </div>
        </div>
        {lowerContent}
      </div>

      {/* 5. 最下段フック行 */}
      <div className={styles.bottomHookRow}>
        <ElbowGraphic from="top" to="right" aria-hidden="true" />
        <div style={{ display: 'flex', alignItems: 'center', height: '38px' }}>
          <StraightPipeGraphic length={32} aria-hidden="true" />
        </div>
        <div style={{ position: 'relative', width: '38px', height: '38px' }}>
          <ElbowGraphic from="left" to="top" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
};
