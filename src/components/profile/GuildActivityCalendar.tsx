import { useEffect, useMemo, useState } from 'react';
import styles from './GuildActivityCalendar.module.css';

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

type JogruberApiResponse = {
  total?: Record<string, number>;
  contributions?: Array<{
    date: string;
    count: number;
    level: number;
  }>;
};

export type GuildActivityCalendarProps = {
  username: string;
};

const WEEKS_COUNT = 52;
const DAYS_PER_WEEK = 7;

/**
 * オフライン時フォールバックデータ生成
 */
function buildFallbackContributions(seedStr: string): ContributionDay[] {
  let hash = 2166136261;
  for (let i = 0; i < seedStr.length; i++) {
    hash ^= seedStr.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }

  const totalDays = WEEKS_COUNT * DAYS_PER_WEEK;
  const result: ContributionDay[] = [];
  const today = new Date();

  for (let i = totalDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const iso = d.toISOString().slice(0, 10);

    // 擬似乱数ステップ
    hash ^= i + 0x9e3779b9;
    hash = Math.imul(hash, 16777619);
    const r = Math.abs(hash % 100);

    let level: 0 | 1 | 2 | 3 | 4 = 0;
    let count = 0;
    if (r > 88) {
      level = 4;
      count = 9 + (r % 6);
    } else if (r > 72) {
      level = 3;
      count = 5 + (r % 4);
    } else if (r > 50) {
      level = 2;
      count = 2 + (r % 3);
    } else if (r > 32) {
      level = 1;
      count = 1;
    }

    result.push({ date: iso, count, level });
  }

  return result;
}

export const GuildActivityCalendar = ({
  username,
}: GuildActivityCalendarProps) => {
  const fallbackDays = useMemo(
    () => buildFallbackContributions(username),
    [username]
  );

  const [days, setDays] = useState<ContributionDay[] | null>(null);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchContributions() {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(
            username
          )}?y=last`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = (await res.json()) as JogruberApiResponse;
        if (
          !cancelled &&
          Array.isArray(data.contributions) &&
          data.contributions.length > 0
        ) {
          const normalized: ContributionDay[] = data.contributions
            .slice(-WEEKS_COUNT * DAYS_PER_WEEK)
            .map((item) => ({
              date: item.date,
              count: item.count,
              level: Math.min(4, Math.max(0, item.level)) as 0 | 1 | 2 | 3 | 4,
            }));
          setDays(normalized);
          setIsLive(true);
        }
      } catch {
        // オフライン環境や到達不可の場合はフォールバック表示を維持
      }
    }

    fetchContributions();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username]);

  const activeDays = days ?? fallbackDays;

  const totalCount = useMemo(
    () => activeDays.reduce((acc, cur) => acc + cur.count, 0),
    [activeDays]
  );

  const weeks = useMemo(() => {
    const cols: ContributionDay[][] = [];
    for (let i = 0; i < activeDays.length; i += DAYS_PER_WEEK) {
      cols.push(activeDays.slice(i, i + DAYS_PER_WEEK));
    }
    return cols;
  }, [activeDays]);

  const getLevelClass = (level: 0 | 1 | 2 | 3 | 4) => {
    switch (level) {
      case 1:
        return styles.cellLevel1;
      case 2:
        return styles.cellLevel2;
      case 3:
        return styles.cellLevel3;
      case 4:
        return styles.cellLevel4;
      default:
        return styles.cellLevel0;
    }
  };

  const cellSize = 9;
  const cellGap = 2.6;
  const step = cellSize + cellGap;
  const svgWidth = weeks.length * step + 4;
  const svgHeight = DAYS_PER_WEEK * step + 4;

  return (
    <div className={styles.telemetryBox}>
      <div className={styles.telemetryHeader}>
        <div className={styles.telemetryTitleGroup}>
          <span className={styles.telemetryCode}>
            GITHUB
          </span>
          <span className={styles.telemetryLabel}>Contribute</span>
        </div>

        <div className={styles.telemetryStats}>
          <span>
            TOTAL: <strong>{totalCount}</strong> commits (Last 52w)
          </span>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.profileLink}
            aria-label={`GitHub (@${username}) のプロフィールを開く`}
          >
            @{username} ↗
          </a>
        </div>
      </div>

      <div
        className={styles.calendarScrollWrapper}
        onTouchStart={(e) => e.stopPropagation()}
        onTouchEnd={(e) => e.stopPropagation()}
      >
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className={styles.calendarSvg}
          role="img"
          aria-label={`GitHub (@${username}) の過去1年間の草カレンダー`}
        >
          {weeks.map((week, wIdx) =>
            week.map((day, dIdx) => (
              <rect
                key={day.date}
                x={2 + wIdx * step}
                y={2 + dIdx * step}
                width={cellSize}
                height={cellSize}
                rx={1.5}
                ry={1.5}
                className={getLevelClass(day.level)}
              >
                <title>{`${day.date}: ${day.count} contributions`}</title>
              </rect>
            ))
          )}
        </svg>
      </div>

      <div className={styles.telemetryFooter}>
        <span>
          STATUS: {isLive ? 'LIVE TELEMETRY SYNCED' : 'ARCHIVE SPECIMEN MODE'}
        </span>

        <div className={styles.legend} aria-hidden="true">
          <span>Less</span>
          <span className={`${styles.legendSwatch} ${styles.swatch0}`} />
          <span className={`${styles.legendSwatch} ${styles.swatch1}`} />
          <span className={`${styles.legendSwatch} ${styles.swatch2}`} />
          <span className={`${styles.legendSwatch} ${styles.swatch3}`} />
          <span className={`${styles.legendSwatch} ${styles.swatch4}`} />
          <span>More</span>
        </div>
      </div>
    </div>
  );
};
