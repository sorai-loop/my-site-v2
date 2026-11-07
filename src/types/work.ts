export type WorkStatus = 'COMPLETED' | 'IN_PROGRESS' | 'SOLVED';

export type WorkItem = {
  id: string;
  title: string;
  period: string;
  startDate?: string;
  completedDate?: string;
  dispatchNumber?: number;
  description: string;
  stacks: string[];
  imagePath: string | null;
  imageUrl?: string;
  siteUrl?: string;
  githubUrl?: string;
  status?: WorkStatus;
  caption?: string;
};
