import {
  ElbowGraphic,
  HexNutGraphic,
  JointGroup,
  RingGraphic,
  StraightPipeGraphic,
  ThreadGraphic,
  UnionGraphic,
} from '../ui/Pipes';
import styles from './ShelfPipe.module.css';

export const SHELF_PIPE_SIZE = 22;
export const SHELF_FITTING_SIZE = 58;
export const SHELF_STROKE_WIDTH = 2;

export type ShelfPipeVariant = 'L' | 'reversed-L';

export type ShelfPipeProps = {
  /** L字型か左右反転L字型か */
  variant: ShelfPipeVariant;
  /** 最上段かどうか（導入パイプ・ユニオン装飾の切り替え） */
  isFirst?: boolean;
  /** 最下段かどうか */
  isLast?: boolean;
  className?: string;
};

/**
 * 棚1段分のパイプ骨組みコンポーネント。
 * L字と、反転L字の形状を props.variant に応じて切り替え。
 */
export const ShelfPipe = ({
  variant,
  isFirst = false,
  isLast = false,
  className,
}: ShelfPipeProps) => {
  const isL = variant === 'L';

  return (
    <div
      className={
        className
          ? `${styles.shelfPipeContainer} ${className}`
          : styles.shelfPipeContainer
      }
      data-pipe-variant={variant}
    >
      {/* 左右の柱エリア（L字なら左側、反転L字なら右側に縦パイプ） */}
      <div className={styles.pillarSlotLeft}>
        {isL && (
          <div className={styles.pillarPipeWrapper}>
            <StraightPipeGraphic
              vertical
              flexible
              pipeSize={SHELF_PIPE_SIZE}
              strokeWidth={SHELF_STROKE_WIDTH}
              aria-hidden="true"
            />
            <div className={styles.pillarDecoration}>
              {isFirst ? (
                <UnionGraphic
                  orientation="vertical"
                  size={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
              ) : (
                <HexNutGraphic
                  orientation="vertical"
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className={styles.pillarSlotRight}>
        {!isL && (
          <div className={styles.pillarPipeWrapper}>
            <StraightPipeGraphic
              vertical
              flexible
              pipeSize={SHELF_PIPE_SIZE}
              strokeWidth={SHELF_STROKE_WIDTH}
              aria-hidden="true"
            />
            <div className={styles.pillarDecoration}>
              <RingGraphic
                orientation="vertical"
                pipeSize={SHELF_PIPE_SIZE}
                strokeWidth={SHELF_STROKE_WIDTH}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
      </div>

      {/* 下部の水平パイプ行（エルボ ＋ 水平直パイプ ＋ エルボ） */}
      <div className={styles.shelfPipeRow}>
        {/* 左エルボ */}
        <div className={styles.elbowWrapper}>
          <ElbowGraphic
            from={isL ? 'top' : 'right'}
            to={isL ? 'right' : isLast ? 'top' : 'bottom'}
            size={SHELF_FITTING_SIZE}
            strokeWidth={SHELF_STROKE_WIDTH}
            aria-hidden="true"
          />
        </div>

        {/* 中央の水平パイプと装飾継手 */}
        <div className={styles.horizontalShelfPipeWrapper}>
          <StraightPipeGraphic
            flexible
            pipeSize={SHELF_PIPE_SIZE}
            strokeWidth={SHELF_STROKE_WIDTH}
            aria-hidden="true"
          />
          {isL ? (
            <>
              <JointGroup
                className={styles.shelfPipeJoint}
                style={{ left: '12%' }}
              >
                <RingGraphic
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
                <ThreadGraphic
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
                <HexNutGraphic
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
              </JointGroup>
              <JointGroup
                className={styles.shelfPipeJoint}
                style={{ right: '14%' }}
              >
                <HexNutGraphic
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
              </JointGroup>
            </>
          ) : (
            <>
              <JointGroup
                className={styles.shelfPipeJoint}
                style={{ left: '15%' }}
              >
                <UnionGraphic
                  size={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
              </JointGroup>
              <JointGroup
                className={styles.shelfPipeJoint}
                style={{ right: '12%' }}
              >
                <ThreadGraphic
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
                <RingGraphic
                  pipeSize={SHELF_PIPE_SIZE}
                  strokeWidth={SHELF_STROKE_WIDTH}
                  aria-hidden="true"
                />
              </JointGroup>
            </>
          )}
        </div>

        {/* 右エルボ */}
        <div className={styles.elbowWrapper}>
          <ElbowGraphic
            from={isL ? 'left' : 'top'}
            to={isL ? (isLast ? 'top' : 'bottom') : 'left'}
            size={SHELF_FITTING_SIZE}
            strokeWidth={SHELF_STROKE_WIDTH}
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
