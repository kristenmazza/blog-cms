import { Container, Toolbar } from '@mui/material';
import Tiptap from '../components/TipTap';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function EditPost() {
  const { slug } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [published, setPublished] = useState(false);

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

  return (
    <Container maxWidth='lg'>
      <Toolbar sx={{ height: '8rem' }} />
      {error ? (
        <p> An error was encountered: {error}</p>
      ) : (
        <Tiptap
          title={title}
          setTitle={setTitle}
          editorContent={editorContent}
          setEditorContent={setEditorContent}
          published={published}
          setPulished={setPublished}
          loading={loading}
        />
      )}
    </Container>
  );
}
