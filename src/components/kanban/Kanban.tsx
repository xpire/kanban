import React, { useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { KanbanData, KanbanColumnType, KanbanTaskType } from '@Types/Kanban';
import KanbanColumn from './KanbanColumn';
import { Button } from '@mui/material';
const ColumnWrapper = styled.div`
  display: flex;
  padding: 20px;
`;

const ContainerDiv = styled.div`
display: inline-flex;
`;

const Kanban = (kanbanData: KanbanData) => {
  const [state, setState] = useState(kanbanData);

  const onDragEnd = (result: DropResult) => {
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

    // reordering column
    if (result.type === "COLUMN") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder
      }

      setState(newState);

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

  const addColumn = (name: string) => {
    const columnId = uuidv4();
    const newColumnOrder = Array.from(state.columnOrder);
    newColumnOrder.push(columnId);
    const newColumn: KanbanColumnType = { id: columnId, title: name, taskIds: [] };
    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [columnId]: newColumn,
      },
      columnOrder: newColumnOrder,
    }
    setState(newState);
  }

  const addTask = (title: string, content: string, columnId: string) => {
    const taskId = uuidv4();
    const task = { id: taskId, title: title, content: content };
    const newTaskIds = Array.from(state.columns[columnId].taskIds);
    newTaskIds.push(taskId);
    const newState = {
      ...state,
      tasks: {
        ...state.tasks,
        [taskId]: task,
      },
      columns: {
        ...state.columns,
        [columnId]: {
          ...state.columns[columnId],
          taskIds: newTaskIds,
        }

      }
    }
    setState(newState);
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Button onClick={() => addColumn("new")}>Add a Column</Button>
      <Button onClick={() => addTask("hello world", "I am a newly added task", "column-3")}>Add a Task</Button>
      <ColumnWrapper>
        <Droppable droppableId="board" type="COLUMN" direction="horizontal">
          {(provided, snapshot) => (
            <ContainerDiv ref={provided.innerRef} {...provided.droppableProps}>
              {state.columnOrder.map((columnId, index) => {
                const column = state.columns[columnId];
                const columnTasks = column.taskIds.map(taskId => state.tasks[taskId]);
                return (<KanbanColumn
                  key={column.id}
                  column={column}
                  tasks={columnTasks}
                  index={index}
                />)
              })}
              {provided.placeholder}
            </ContainerDiv>
          )}
        </Droppable>
      </ColumnWrapper>
    </DragDropContext>
  );
}

export default Kanban;