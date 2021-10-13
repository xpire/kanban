import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';

import { KanbanTask, KanbanColumn } from '../../types/Kanban'
import KanbanCard from './KanbanCard';

type KanbanColumnProps = {
  column: KanbanColumn;
  tasks: KanbanTask[];
}

const ColumnContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column;
`;


const StyledStack = styled(Stack)`
background-color: ${(props: StackProps & { isDraggingOver: boolean }) => props.isDraggingOver ? 'skyblue' : 'white'};
min-height: 600px;
`;

const KanbanColumn = ({ column, tasks }: KanbanColumnProps) => (
  <ColumnContainer>
    <Typography variant="h4">{column.title}</Typography>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <StyledStack direction="column" ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver}>
          {tasks.map((taskData, index) => (
            <KanbanCard {...taskData} index={index} key={taskData.id} />
          ))}
          {provided.placeholder}
        </StyledStack>
      )}
    </Droppable>
  </ColumnContainer>
);

export default KanbanColumn;