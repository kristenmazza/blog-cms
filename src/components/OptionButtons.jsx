import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import CommentIcon from '@mui/icons-material/Comment';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { emphasize } from '@mui/material';
import styles from './OptionButtons.module.css';
import { Link } from 'react-router-dom';
import ImageIcon from '@mui/icons-material/Image';
import { useState } from 'react';
import axios from 'axios';

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

export default function IconLabelButtons({ published, slug, posts, setPosts }) {
  const [updateLoading, setUpdateLoading] = useState(false);

  const handleClick = async () => {
    const updatedPublishedStatus = !published;

    try {
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.slug === slug
            ? { ...post, published: updatedPublishedStatus }
            : post,
        ),
      );

      await updatePost(updatedPublishedStatus);
    } catch (err) {
      console.error(err);
    }
  };

  const updatePost = async (updatedPublishedStatus) => {
    if (updateLoading) {
      return;
    }

    setUpdateLoading(true);

    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };

    try {
      const postToUpdate = posts.find((post) => post.slug === slug);

      await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        {
          title: postToUpdate.title,
          content: postToUpdate.content,
          published: updatedPublishedStatus,
        },
        config,
      );
    } catch (err) {
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

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
        startIcon={<CommentIcon />}
        component={Link}
        to={`/${slug}/comments`}
      >
        Comments
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
        <StyledButton
          onClick={handleClick}
          variant='text'
          endIcon={<UnpublishedIcon />}
          disabled={updateLoading}
        >
          Unpublish
        </StyledButton>
      ) : (
        <StyledButton
          onClick={handleClick}
          variant='text'
          endIcon={<SendIcon />}
          disabled={updateLoading}
        >
          Publish
        </StyledButton>
      )}
    </div>
  );
}

IconLabelButtons.propTypes = {
  published: PropTypes.bool,
  slug: PropTypes.string,
  posts: PropTypes.array,
  setPosts: PropTypes.func,
};
