import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Card, { CardProps } from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import styled from 'styled-components';
import { motion } from 'framer-motion';

import { KanbanTaskType } from '@Types/Kanban';

type KanbanCardProps = KanbanTaskType & {
  index: number;
}

const StyledCard = styled(Card)`
  background-color: ${(props: CardProps & { isdragging: boolean }) => props.isdragging ? "rgba(256,256,256,0.8)" : 'white'};
  backdrop-filter: ${(props: CardProps & { isdragging: boolean }) => props.isdragging ? "blur(5px)" : ''};
  margin: 10px;
  max-width: 280px;
`;

const KanbanCard = ({ id, title, content, index }: KanbanCardProps) => (
  <Draggable draggableId={id} index={index}>
    {
      (provided, snapshot) => (
        <StyledCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isdragging={snapshot.isDragging}
        >
          <CardContent>
            <Typography variant="h5">
              {title}
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