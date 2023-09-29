import { Button, Container, Toolbar } from '@mui/material';
import Tiptap from '../components/TipTap';
import styles from './NewPost.module.css';
import { useState } from 'react';
import axios from 'axios';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');

  const handleClick = async () => {
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + `/posts`,
        JSON.stringify({ title: title, content: editorContent }),
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }
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
      />
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
