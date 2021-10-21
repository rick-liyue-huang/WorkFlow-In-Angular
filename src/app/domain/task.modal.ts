export interface TaskModal {
  id?: string;
  desc: string;
  completed: boolean;
  priority: number;
  dueDate?: Date;
  reminder?: Date;
  createDate?: Date;
  remark?: string;
  ownerId?: string;
  participantIds: string[];
  taskListId: string;
}
