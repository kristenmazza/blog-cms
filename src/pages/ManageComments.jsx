import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Toolbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './ManageComments.module.css';
import dateFormat from 'dateformat';

export default function ManageComments() {
  const { slug } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getComments = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/posts/${slug}/comments`,
        );
        setComments(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setComments(null);
      } finally {
        setLoading(false);
      }
    };
    getComments();
  }, [slug, comments]);

  const handleDeleteComment = async (commentId) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        import.meta.env.VITE_BACKEND_URL +
          `/posts/${slug}/comments/${commentId}`,
        config,
      );
    } catch (err) {
      console.log(err);
    }
  };

  const commentList = comments.map((comment) => {
    if (error) return <p> An error was encountered.</p>;
    const { _id, message, date, author } = comment;
    const formattedDate = dateFormat(date, 'mmmm d, yyyy');

    return (
      <React.Fragment key={_id}>
        <Box sx={{ minWidth: 275 }}>
          <Card variant='outlined' className={styles.comment}>
            <CardContent className={styles.cardContent}>
              <p className={styles.author}>{author}</p>
              <p className={styles.date}>{formattedDate}</p>
              <p className={styles.message}>{message}</p>
              <Button
                className={styles.containedBtn}
                onClick={() => handleDeleteComment(_id)}
                variant='contained'
              >
                Delete Comment
              </Button>
            </CardContent>
          </Card>
        </Box>
      </React.Fragment>
    );
  });

  return (
    <>
      <Container
        sx={{ display: 'flex', flexDirection: 'column' }}
        maxWidth='lg'
      >
        <Toolbar sx={{ height: '8rem' }} />
        <h2 className={styles.commentsHeader}>Comments</h2>
        <div className={styles.comments}>
          {loading && <CircularProgress color='inherit' />}
          {commentList.length >= 1 && commentList}
          {!loading && commentList.length < 1 && (
            <p className={styles.commentIndicator}>No comments.</p>
          )}
        </div>
      </Container>
    </>
  );
}
