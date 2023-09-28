import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import styled from '@emotion/styled';
import { Breadcrumbs, Typography, emphasize } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PropTypes from 'prop-types';

const StyledButton = styled(Button)(({ theme }) => {
  const backgroundColor = theme.palette.grey[100];

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: emphasize(backgroundColor, 0.06),
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

export default function BasicMenu({ setFilter }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClickOfAll = () => {
    setFilter(null);
    handleClose();
  };

  const handleClickOfPublished = () => {
    setFilter('published');
    handleClose();
  };

  const handleClickOfDrafts = () => {
    setFilter('drafts');
    handleClose();
  };

  return (
    <div>
      <Breadcrumbs aria-label='breadcrumb'>
        <Typography color='text.primary'>Blog</Typography>
        <StyledButton
          id='basic-button'
          aria-controls={open ? 'basic-menu' : undefined}
          aria-haspopup='true'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClick}
        >
          Filter Posts <ExpandMoreIcon />
        </StyledButton>
      </Breadcrumbs>

      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClickOfAll}>All</MenuItem>
        <MenuItem onClick={handleClickOfPublished}>Published</MenuItem>
        <MenuItem onClick={handleClickOfDrafts}>Drafts</MenuItem>
      </Menu>
    </div>
  );
}

BasicMenu.propTypes = {
  setFilter: PropTypes.func,
};
