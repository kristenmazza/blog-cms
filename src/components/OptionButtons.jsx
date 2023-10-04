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
import { useEffect, useState } from 'react';
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
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [publishedStatus, setPublishedStatus] = useState('');

  const [updateLoading, setUpdateLoading] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        );
        setTitle(response.data.title);
        setEditorContent(response.data.content);
        setPublishedStatus(response.data.published);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.log(error);
        setTitle('');
        setEditorContent('');
        setPublishedStatus(published);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [slug, published, error]);

  const handleClick = async () => {
    const updatedPublishedStatus = !publishedStatus;

    const newPostList = posts.map((post) => {
      if (post.slug === slug) {
        const updatedPost = {
          ...post,
          published: updatedPublishedStatus,
        };
        return updatedPost;
      }
      return post;
    });

    setPosts(newPostList);
    updatePost(updatedPublishedStatus);
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
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        {
          title: title,
          content: editorContent,
          published: updatedPublishedStatus,
        },
        config,
      );
      setError('');
    } catch (err) {
      setError(JSON.parse(err.response.request.response).errors);
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
