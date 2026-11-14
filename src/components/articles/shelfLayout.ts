import type {
  ArticleItem,
  BookPosture,
  BookSizeCategory,
} from '../../types/article';

export type { BookSizeCategory };

export type BookData = {
  article: ArticleItem;
  posture: BookPosture;
};

/**
 * 棚の段の向き（isL: 偶数段=右端配置 / 奇数段=左端配置）から、
 * その段の特殊姿勢（隣の本へ寄りかかる傾き）を決定します。
 * - 右端スロット（isL = true）の場合は、左隣の本へ寄りかかる 'tiltedRight'
 * - 左端スロット（isL = false）の場合は、右隣の本へ寄りかかる 'tiltedLeft'
 */
export function resolveSpecialPosture(isL: boolean): BookPosture {
  return isL ? 'tiltedRight' : 'tiltedLeft';
}

/**
 * 取得した記事の配列から、各本の姿勢（直立3冊＋端の傾き1冊）
 * を決定した「本（BookData）の配列」を生成します。
 *
 * 設計方針:
 * - 4冊区切り（棚1段あたり）で「通常3冊 ＋ 特殊配置（傾き）1冊」を厳密に配分
 */
export function createBooksFromArticles(
  articles: ArticleItem[]
): BookData[] {
  if (articles.length === 0) return [];

  return articles.map((article, index) => {
    const chunkIndex = Math.floor(index / 4);
    const posInChunk = index % 4;

    // 特殊配置の場所: L字（偶数段: 0, 2, ...）のときは右端（スロット3）、逆（反転L字: 1, 3, ...）のときは左端（スロット0）
    const isL = chunkIndex % 2 === 0;
    const specialSlotIndex = isL ? 3 : 0;
    const specialPosture = resolveSpecialPosture(isL);

    // 特殊スロット位置のみ傾き姿勢、残りは通常（upright）
    const posture: BookPosture =
      posInChunk === specialSlotIndex ? specialPosture : 'upright';

    return {
      article,
      posture,
    };
  });
}

/** 傾きの基本角度（度数法） */
export const BOOK_TILT_ANGLE_DEG = 4;

/**
 * 記事の文字数から背表紙サイズカテゴリを取得します。
 */
export function getBookSizeCategory(charCount: number): BookSizeCategory {
  if (charCount >= 7000) return 'large';
  if (charCount >= 3000) return 'medium';
  return 'small';
}

/**
 * 本の各カテゴリの寸法（縦幅・横幅）定義
 */
export const BOOK_DIMENSIONS: Record<
  BookSizeCategory,
  { height: number; pcHeight: number; width: number; pcWidth: number }
> = {
  small: { height: 170, pcHeight: 195, width: 34, pcWidth: 44 },
  medium: { height: 185, pcHeight: 210, width: 40, pcWidth: 50 },
  large: { height: 200, pcHeight: 225, width: 46, pcWidth: 58 },
};

/**
 * 本の縦幅（height）と傾き角度（deg）から、傾く方向に必要なパディング（クリアランス）を算出します。
 * 計算式:
 * overhang = height * sin(angle * π / 180)
 */
export function calculateTiltPadding(
  height: number,
  angleDeg: number = BOOK_TILT_ANGLE_DEG
): number {
  const rad = (angleDeg * Math.PI) / 180;
  const overhang = height * Math.sin(rad);
  return Math.ceil(overhang);
}

/**
 * 記事の文字数と傾き角度から、モバイルおよびPCそれぞれの適切な傾きパディングを算出します。
 */
export function getBookTiltPadding(
  charCount: number,
  angleDeg: number = BOOK_TILT_ANGLE_DEG
): { mobile: number; pc: number } {
  const category = getBookSizeCategory(charCount);
  const dims = BOOK_DIMENSIONS[category];
  return {
    mobile: calculateTiltPadding(dims.height, angleDeg),
    pc: calculateTiltPadding(dims.pcHeight, angleDeg),
  };
}

