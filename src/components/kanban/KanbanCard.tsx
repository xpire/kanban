import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card, { CardProps } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';

import { KanbanTask } from '../../types/Kanban'

type KanbanCardProps = KanbanTask & {
  index: number;
}

const StyledCard = styled(Card)`
  background-color: ${(props: CardProps & { isDragging: boolean }) => props.isDragging ? "rgba(256,256,0,0.5)" : 'white'};
  backdrop-filter: ${(props: CardProps & { isDragging: boolean }) => props.isDragging ? "blur(5px)" : ''};
  margin: 10px;
`;

const KanbanCard = ({ id, content, index }: KanbanCardProps) => (
  <Draggable draggableId={id} index={index}>
    {
      (provided, snapshot) => (
        <StyledCard {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} isDragging={snapshot.isDragging}>
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
        </StyledCard>
      )
    }
  </Draggable>
);

export default KanbanCard;