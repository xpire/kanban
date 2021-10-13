export type KanbanTask = {
  id: string;
  content: string;
}

export type KanbanColumn = {
  id: string;
  title: string;
  taskIds: string[];
}

export type KanbanData = {
  tasks: {
    [key: string]: KanbanTask;
  }
  columns: {
    [key: string]: KanbanColumn;
  }
  columnOrder: string[];
}

