import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Stack, { StackProps } from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';

import { KanbanTaskType, KanbanColumnType } from '@Types/Kanban'
import KanbanCard from './KanbanCard';

type KanbanColumnProps = {
  column: KanbanColumnType;
  tasks: KanbanTaskType[];
  index: number;
}

const ColumnContainer = styled.div`
  min-width: 300px;
  display: flex;
  flex-direction: column; 
  // opacity: ${(props: { isdragging: boolean }) => props.isdragging ? 0.5 : 1.0};
`;


const StyledStack = styled(Stack)`
background-color: ${(props: StackProps & { isdraggingover: boolean }) => props.isdraggingover ? 'lightblue' : 'white'};
min-height: 600px;
transition: background-color 0.2s ease-out;
`;

const KanbanColumn = ({ index, column, tasks }: KanbanColumnProps) => (
  <Draggable draggableId={column.id} index={index}>
    {(columnProvided, columnSnapshot) => (
      <ColumnContainer
        {...columnProvided.dragHandleProps}
        {...columnProvided.draggableProps}
        ref={columnProvided.innerRef}
        isdragging={columnSnapshot.isDragging}
      >
        <Stack direction="row" spacing={3}>
          <Typography variant="h4">{column.title}</Typography>
          <IconButton><AddIcon /></IconButton>
        </Stack>
        <Droppable droppableId={column.id} type="LIST">
          {(provided, snapshot) => (
            <StyledStack direction="column" ref={provided.innerRef} {...provided.droppableProps} isdraggingover={snapshot.isDraggingOver}>
              {tasks.map((taskData, index) => (
                <KanbanCard {...taskData} index={index} key={taskData.id} />
              ))}
              {provided.placeholder}
            </StyledStack>
          )}
        </Droppable>
      </ColumnContainer>
    )}
  </Draggable>
);

export default KanbanColumn;