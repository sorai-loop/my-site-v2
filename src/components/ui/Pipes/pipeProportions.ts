/**
 * パイプの基準径（呼び径）から各パーツの標準プロポーションを計算するユーティリティ
 */

export type PipeProportions = {
  /** 基準パイプ径（太さ） */
  pipeWidth: number;
  /** 六角ナットの標準外径（高さ） */
  nutOuterSize: number;
  /** 六角ナットの標準厚さ（パイプ進行方向） */
  nutThickness: number;
  /** リング（そろばん玉）の標準外径 */
  ringOuterSize: number;
  /** リングの標準厚さ */
  ringThickness: number;
  /** ネジ山の標準外径 */
  threadOuterSize: number;
  /** ネジ山の標準長さ */
  threadLength: number;
  /** パディングの標準幅 */
  paddingWidth: number;
  /** パディングの標準外径 */
  paddingHeight: number;
  /** パディングの内径 */
  paddingInnerHeight: number;
  /** エルボ・チーズの標準ボックスサイズ */
  fittingSize: number;
};

export const DEFAULT_PIPE_SIZE = 14;
export const DEFAULT_STROKE_WIDTH = 1.5;

export const computePipeProportions = (baseSize = DEFAULT_PIPE_SIZE): PipeProportions => {
  const r = (n: number) => Math.round(n);

  return {
    pipeWidth: baseSize,
    nutOuterSize: r(baseSize * 2.14),       // 14 -> 30
    nutThickness: r(baseSize * 0.85),       // 14 -> 12
    ringOuterSize: r(baseSize * 1.57),      // 14 -> 22
    ringThickness: r(baseSize * 0.71),      // 14 -> 10
    threadOuterSize: r(baseSize * 1.43),    // 14 -> 20
    threadLength: r(baseSize * 1.28),       // 14 -> 18
    paddingWidth: 5,
    paddingHeight: r(baseSize * 1.71),      // 14 -> 24
    paddingInnerHeight: r(baseSize * 1.28), // 14 -> 18
    fittingSize: 38,
  };
};
