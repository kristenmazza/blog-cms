import { Button, Container, Toolbar } from '@mui/material';
import styles from './DeletePost.module.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { format } from 'date-fns';

export default function DeletePost() {
  const { slug } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const [publishedStatus, setPublishedStatus] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        );
        setTitle(response.data.title);
        if (response.data.published) {
          setPublishedStatus('Published');
        } else {
          setPublishedStatus('Draft');
        }
        const formattedDate = format(
          new Date(response.data.date),
          'MMM dd, yyyy',
        );

        setDate(formattedDate);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTitle('');
        setDate('');
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [slug]);

  const handleDeletePost = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.delete(
        import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        config,
      );
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container
      component='main'
      sx={{ display: 'flex', flexDirection: 'column' }}
      maxWidth='xs'
    >
      <Toolbar sx={{ height: '8rem' }} />
      <h1 className={styles.heading}>
        Are you sure you want to delete this post?
      </h1>
      {error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <h1 className={styles.cardTitle}>{title}</h1>
              <p>{publishedStatus}</p>
              <p>{date}</p>
            </div>
          </div>
          <Button
            onClick={handleDeletePost}
            className={styles.containedBtn}
            variant='contained'
          >
            Delete Post
          </Button>
        </>
      )}
    </Container>
  );
}
