export type Notification = {
  id: string;
  title: string;
  description: string;
  avatar: string | null;
  type: string;
  createdAt: Date;
  isUnRead: boolean;
};
