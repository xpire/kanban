import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { KanbanData } from '../../types/Kanban'
import KanbanColumn from './KanbanColumn';

const ColumnWrapper = styled.div`
display: flex;
`;

const Kanban = (kanbanData: KanbanData) => {
  const [state, setState] = useState(kanbanData);

  const onDragEnd = (result: DropResult) => {
    // console.log(state)
    // console.log(result)
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      return;
    }

    // Moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    // console.log(newState)
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ColumnWrapper>
        {state.columnOrder.map(columnId => {
          const column = state.columns[columnId];
          const columnTasks = column.taskIds.map(taskId => state.tasks[taskId]);
          return (<KanbanColumn key={column.id} column={column} tasks={columnTasks} />)
        })}
      </ColumnWrapper>
    </DragDropContext>
  );
}

export default Kanban;