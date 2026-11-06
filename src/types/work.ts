export type WorkStatus = 'COMPLETED' | 'IN_PROGRESS' | 'SOLVED';

export type WorkItem = {
  id: string;
  title: string;
  period: string;
  description: string;
  stacks: string[];
  imageUrl?: string;
  siteUrl?: string;
  githubUrl?: string;
  status?: WorkStatus;
};
