import React from 'react';
import styled from 'styled-components';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Stack from '@mui/material/Stack';

const StyledStack = styled(Stack)`
  position: fixed;
  bottom: 0px;
  right: 0px;
  padding: 20px;
`;

const Menu = () => {
  return (<StyledStack direction="row" spacing={3}>
    <Fab color="primary"><AddIcon /></Fab>
    <Fab color="secondary"><EditIcon /></Fab>
  </StyledStack>);

}

export default Menu;