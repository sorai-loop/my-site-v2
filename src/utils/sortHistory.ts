import type { ProfileHistoryItem } from '../types/profile';

/**
 * 日付文字列の正規化（ドットやスラッシュをハイフンに統一、ゼロ埋め等）
 */
const normalizeDateSegment = (seg: string): string => {
  return seg
    .trim()
    .replace(/[./]/g, '-')
    .replace(/\s+/g, '');
};

export type ParsedHistoryPeriod = {
  start: string;
  end: string | null;
  isInProgress: boolean;
};

/**
 * 期間文字列（例: '2026.08.10 - 08.12', '2026.09 - Present', '2026.11.19'）を解析
 */
export const parseHistoryPeriod = (period: string): ParsedHistoryPeriod => {
  // ハイフン、ダッシュ、チルダ、波ダッシュ等で分割
  const parts = period.split(/[-–—〜~]/).map((s) => s.trim());
  const rawStart = parts[0] || '';
  const rawEnd = parts.length > 1 ? parts[1] : '';

  const normalizedStart = normalizeDateSegment(rawStart);

  // 終了パートが存在しない場合は単日・単月
  if (!rawEnd) {
    return {
      start: normalizedStart,
      end: normalizedStart,
      isInProgress: false,
    };
  }

  // 進行中キーワードの判定
  const isPresent =
    !rawEnd ||
    /^(present|now|active|current|現在|進行中|今)$/i.test(rawEnd);

  if (isPresent) {
    return {
      start: normalizedStart,
      end: null,
      isInProgress: true,
    };
  }

  // 終了日の年・月が省略されている場合の補完 (例: '2026-08-10' と '08-12' または '12')
  const startSegments = normalizedStart.split('-');
  const rawEndSegments = normalizeDateSegment(rawEnd).split('-');

  let normalizedEnd: string;
  if (rawEndSegments.length === 1 && startSegments.length >= 2) {
    // 日のみ省略補完: start が YYYY-MM-DD かつ end が DD の場合 -> YYYY-MM-DD
    if (startSegments.length === 3) {
      normalizedEnd = `${startSegments[0]}-${startSegments[1]}-${rawEndSegments[0]}`;
    } else {
      // start が YYYY-MM かつ end が MM の場合 -> YYYY-MM
      normalizedEnd = `${startSegments[0]}-${rawEndSegments[0]}`;
    }
  } else if (rawEndSegments.length === 2 && startSegments.length === 3) {
    // MM-DD のみ: start の YYYY を補完 -> YYYY-MM-DD
    normalizedEnd = `${startSegments[0]}-${rawEndSegments[0]}-${rawEndSegments[1]}`;
  } else {
    normalizedEnd = normalizeDateSegment(rawEnd);
  }

  return {
    start: normalizedStart,
    end: normalizedEnd,
    isInProgress: false,
  };
};

/**
 * Works（sortWorks.ts）と同等の条件で活動履歴をソートする
 *
 * 【ソート条件】
 * 1. 進行中（In Progress / Present）と完了（Completed）を分離
 * 2. 進行中:
 *    - 開始日が新しい順（降順）
 * 3. 完了（過去）:
 *    - 終了日が新しい順（降順）。終了日が同じなら開始日が新しい順（降順）
 * 4. 進行中アイテムを先頭、その後に完了アイテムを配置
 */
export const sortHistory = (
  items: ProfileHistoryItem[]
): ProfileHistoryItem[] => {
  const inProgressList: Array<{
    item: ProfileHistoryItem;
    parsed: ParsedHistoryPeriod;
  }> = [];

  const completedList: Array<{
    item: ProfileHistoryItem;
    parsed: ParsedHistoryPeriod;
  }> = [];

  for (const item of items) {
    const parsed = parseHistoryPeriod(item.period);

    // バッジまたは期間文字列で進行中判定
    const isProgress =
      parsed.isInProgress ||
      item.badge === '進行中' ||
      item.badge === '現在' ||
      item.badge === 'ACTIVE';

    if (isProgress) {
      inProgressList.push({ item, parsed });
    } else {
      completedList.push({ item, parsed });
    }
  }

  // 進行中: 開始日の降順（新しいものが上）
  inProgressList.sort((a, b) => {
    return b.parsed.start.localeCompare(a.parsed.start);
  });

  // 完了: 終了日の降順（新しいものが上）。同着なら開始日の降順
  completedList.sort((a, b) => {
    const aEnd = a.parsed.end || a.parsed.start;
    const bEnd = b.parsed.end || b.parsed.start;

    if (aEnd !== bEnd) {
      return bEnd.localeCompare(aEnd);
    }
    return b.parsed.start.localeCompare(a.parsed.start);
  });

  return [
    ...inProgressList.map((entry) => entry.item),
    ...completedList.map((entry) => entry.item),
  ];
};
