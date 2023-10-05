import { Button, Container, Toolbar } from '@mui/material';
import Tiptap from '../components/TipTap';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styles from './EditPost.module.css';

export default function EditPost() {
  const { slug } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [published, setPublished] = useState(false);

  const [updateError, setUpdateError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        );
        setTitle(response.data.title);
        setEditorContent(response.data.content);
        setPublished(response.data.published);
        setError(null);
      } catch (err) {
        setError(err.message);
        setTitle('');
        setEditorContent('');
        setPublished(false);
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [slug]);

  const handleClick = async () => {
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
          published: published,
        },
        config,
      );
      setUpdateError('');
      navigate('/');
    } catch (err) {
      setUpdateError(JSON.parse(err.response.request.response).errors);
    }
  };

  // Removes error if one exists when title/editorContent changes
  useEffect(() => {
    setUpdateError('');
  }, [title, editorContent]);

  const displayErrors = () => {
    const errorElements = updateError.map((err, index) => (
      <p key={index}>{err.msg}</p>
    ));

    return (
      <div
        className={updateError ? styles.error : styles.offscreen}
        aria-live='assertive'
      >
        {errorElements}
      </div>
    );
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth='lg'>
      <Toolbar sx={{ height: '8rem' }} />
      {error ? (
        <p> An error was encountered: {error}</p>
      ) : (
        <>
          <Tiptap
            title={title}
            setTitle={setTitle}
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            published={published}
            setPublished={setPublished}
            loading={loading}
          />
          {updateError ? displayErrors() : ''}
          <Button
            onClick={handleClick}
            className={styles.containedBtn}
            variant='contained'
          >
            Update Post
          </Button>
        </>
      )}
    </Container>
  );
}
