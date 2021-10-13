import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import { KanbanTask, KanbanColumn, KanbanData } from '../../types/Kanban'

const KanbanCard = ({ id, content }: KanbanTask) => (
  <Card>
    <CardContent>
      <Typography variant="h5">
        {id}
      </Typography>
      <Typography>
        {content}
      </Typography>
    </CardContent>
    <CardActions>
      <Button>edit</Button>
    </CardActions>
  </Card>
);

type KanbanColumnProps = {
  column: KanbanColumn;
  tasks: KanbanTask[];
}

const KanbanColumn = ({ column, tasks }: KanbanColumnProps) => (
  <Stack direction="column" spacing={2}>
    <Typography variant="h4">{column.title}</Typography>
    {tasks.map((taskData) => (
      <KanbanCard {...taskData} />
    ))}
  </Stack>
);

const Kanban = ({ tasks, columns, columnOrder }: KanbanData) => {
  return (
    <>
      {columnOrder.map(columnId => {
        const column = columns[columnId];
        const columnTasks = column.taskIds.map(taskId => tasks[taskId]);
        return <KanbanColumn key={column.id} column={column} tasks={columnTasks} />
      })}
    </>
  );
}

export default Kanban;