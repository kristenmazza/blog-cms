import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { emphasize } from '@mui/material';
import styles from './OptionButtons.module.css';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';

const StyledButton = styled(Button)(({ theme }) => {
  const backgroundColor = 'rgb(251, 251, 251)';
  return {
    backgroundColor,
    width: '8rem',
    height: theme.spacing(3),
    border: '1px solid #999999',
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

export default function IconLabelButtons({ published, slug }) {
  return (
    <div className={styles.buttons}>
      <StyledButton
        variant='text'
        startIcon={<EditIcon />}
        component={Link}
        to={`/edit/${slug}`}
      >
        Edit
      </StyledButton>
      <StyledButton
        variant='text'
        startIcon={<ImageIcon />}
        component={Link}
        to={`/${slug}/image`}
      >
        New Image
      </StyledButton>
      <StyledButton
        variant='text'
        startIcon={<DeleteIcon />}
        component={Link}
        to={`delete/${slug}`}
      >
        Delete
      </StyledButton>
      {published ? (
        <StyledButton variant='text' endIcon={<UnpublishedIcon />}>
          Unpublish
        </StyledButton>
      ) : (
        <StyledButton variant='text' endIcon={<SendIcon />}>
          Publish
        </StyledButton>
      )}
    </div>
  );
}

IconLabelButtons.propTypes = {
  published: PropTypes.bool,
  slug: PropTypes.string,
};
