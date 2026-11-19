import type { StackItem } from '../types/stack';

/**
 * 1アイテムの推定行数を計算する
 * - 見出し (techName + domainLabel): 1行 (横並び統合)
 * - 本文 (memoBody): 説明文の文字数に応じた行数
 *   - PC: 約32文字/行
 *   - モバイル: 横幅が狭いため約18文字/行で折り返し
 */
export function estimateStackItemLines(
  item: StackItem,
  isMobile = false
): number {
  const descLength = item.description?.length ?? 0;
  const charsPerLine = isMobile ? 18 : 32;
  const descLines = Math.max(1, Math.ceil(descLength / charsPerLine));
  return 1 + descLines;
}

/**
 * トラベラーズノートの28行紙面に収まるよう、スタックアイテムを複数ページに分割する。
 *
 * ルール:
 * 1. 1ページの最大行数:
 *    - PC: 26行 (上下パディング各1行を除いた紙面)
 *    - モバイル: 20行 (狭い横幅・付箋・パディングを考慮し、1ページあたり3件程度をスクロールなしで収容)
 * 2. 【孤立アイテム防止】行が溢れて次ページができた際、次ページに1件だけポツンと溢れる (オルファン) 場合は、
 *    その直前のスタックも一緒に次ページへ配置し、バランス良く収容する。
 */
export function paginateStacks(
  items: StackItem[],
  isMobile = false,
  maxLinesPerPage?: number
): StackItem[][] {
  if (items.length <= 1) {
    return [items];
  }

  const effectiveMaxLines = maxLinesPerPage ?? (isMobile ? 20 : 26);
  const linesPerItem = items.map((it) => estimateStackItemLines(it, isMobile));
  const pages: StackItem[][] = [];
  let currentPageItems: StackItem[] = [];
  let currentLines = 0;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const lines = linesPerItem[i];
    // 同一ページ内で2個目以降のアイテムには上余白 (margin-bottom: var(--line-height) 相当 = 1行) が入る
    const neededLines = currentPageItems.length === 0 ? lines : lines + 1;

    if (
      currentPageItems.length > 0 &&
      currentLines + neededLines > effectiveMaxLines
    ) {
      pages.push(currentPageItems);
      currentPageItems = [item];
      currentLines = lines;
    } else {
      currentPageItems.push(item);
      currentLines += neededLines;
    }
  }

  if (currentPageItems.length > 0) {
    pages.push(currentPageItems);
  }

  // 溢れて最後のページが1件だけになってしまった場合、前のページから1件を次のページへ送る
  for (let p = pages.length - 1; p > 0; p--) {
    if (pages[p].length === 1 && pages[p - 1].length > 1) {
      const moved = pages[p - 1].pop()!;
      pages[p].unshift(moved);
    }
  }

  return pages;
}
