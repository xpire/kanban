export type KanbanTaskType = {
  id: string;
  title: string;
  content: string;
}

export type KanbanColumnType = {
  id: string;
  title: string;
  taskIds: string[];
}

export type KanbanData = {
  tasks: {
    [key: string]: KanbanTaskType;
  }
  columns: {
    [key: string]: KanbanColumnType;
  }
  columnOrder: string[];
}

