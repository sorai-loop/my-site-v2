import type { WorkItem } from '../types/work';

export const parsePeriod = (period: string): { start: string; end: string | null } => {
  const parts = period.split('-').map((s) => s.trim().replace(/\./g, '-'));
  const start = parts[0] || '';
  const endPart = parts[1] || '';
  const isPresent = !endPart || endPart.toLowerCase() === 'present';
  return {
    start,
    end: isPresent ? null : endPart,
  };
};

export type WorkItemWithDispatch = WorkItem & {
  dispatchNumber: number;
};

export const sortAndNumberWorks = (works: WorkItem[]): WorkItemWithDispatch[] => {
  const completedWorks: WorkItem[] = [];
  const inProgressWorks: WorkItem[] = [];

  for (const work of works) {
    if (work.status === 'IN_PROGRESS') {
      inProgressWorks.push(work);
    } else {
      completedWorks.push(work);
    }
  }

  completedWorks.sort((a, b) => {
    const aEnd = a.completedDate ?? parsePeriod(a.period).end ?? '';
    const bEnd = b.completedDate ?? parsePeriod(b.period).end ?? '';
    if (aEnd !== bEnd) {
      return aEnd.localeCompare(bEnd);
    }
    const aStart = a.startDate ?? parsePeriod(a.period).start;
    const bStart = b.startDate ?? parsePeriod(b.period).start;
    return aStart.localeCompare(bStart);
  });

  inProgressWorks.sort((a, b) => {
    const aStart = a.startDate ?? parsePeriod(a.period).start;
    const bStart = b.startDate ?? parsePeriod(b.period).start;
    return aStart.localeCompare(bStart);
  });

  let currentNum = 1;
  const completedWithNum: WorkItemWithDispatch[] = completedWorks.map((work) => ({
    ...work,
    dispatchNumber: work.dispatchNumber ?? currentNum++,
  }));

  const inProgressWithNum: WorkItemWithDispatch[] = inProgressWorks.map((work) => ({
    ...work,
    dispatchNumber: work.dispatchNumber ?? currentNum++,
  }));

  const displayInProgress = [...inProgressWithNum].reverse();
  const displayCompleted = [...completedWithNum].reverse();

  return [...displayInProgress, ...displayCompleted];
};
