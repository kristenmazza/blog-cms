import { Button, Container, Toolbar } from '@mui/material';
import Tiptap from '../components/TipTap';
import styles from './NewPost.module.css';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const errRef = useRef();
  const navigate = useNavigate();

  const handleClick = async () => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/posts`,
        { title: title, content: editorContent, published: published },
        config,
      );
      setError('');
      navigate('/');
    } catch (err) {
      setError(JSON.parse(err.response.request.response).errors);
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setLoading(false); // Simulate that content is loaded when the component mounts
  }, []);

  // Removes error if one exists when title/editorContent changes
  useEffect(() => {
    setError('');
  }, [title, editorContent]);

  const displayErrors = () => {
    const errorElements = error.map((err, index) => (
      <p key={index}>{err.msg}</p>
    ));

    return (
      <div
        ref={errRef}
        className={error ? styles.error : styles.offscreen}
        aria-live='assertive'
      >
        {errorElements}
      </div>
    );
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column' }} maxWidth='lg'>
      <Toolbar sx={{ height: '8rem' }} />
      <h1>Create a New Post</h1>
      {loading ? (
        <div>Loading editor...</div>
      ) : (
        <>
          <Tiptap
            title={title}
            setTitle={setTitle}
            editorContent={editorContent}
            setEditorContent={setEditorContent}
            published={published}
            setPublished={setPublished}
          />
          {error ? displayErrors() : ''}
          <Button
            onClick={handleClick}
            className={styles.containedBtn}
            variant='contained'
          >
            Create Post
          </Button>
        </>
      )}
    </Container>
  );
}
