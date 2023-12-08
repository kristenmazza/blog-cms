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
  const [error, setError] = useState([]);
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
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/posts`,
        { title: title, content: editorContent, published: published },
        config,
      );
      setError([]);
      navigate('/');
    } catch (err) {
      setError(err.response.data.errors);
      errRef.current.focus();
    }
  };

  useEffect(() => {
    setError([]);
  }, [title, editorContent]);

  const displayErrors = () => {
    const errorElements = error.map((err, index) => (
      <p key={index}>{err.msg}</p>
    ));

    return (
      <div
        ref={errRef}
        className={error.length > 0 ? styles.error : styles.offscreen}
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
    </Container>
  );
}
