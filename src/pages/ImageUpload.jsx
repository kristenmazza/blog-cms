import { Container, CssBaseline, Toolbar } from '@mui/material';
import styles from './ImageUpload.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

export default function ImageUpload() {
  const { slug } = useParams();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState('');

  const [uploadError, setUploadError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const navigate = useNavigate();
  const errRef = useRef();

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + `/posts/${slug}`,
        );
        setTitle(response.data.title);
        setError('');
      } catch (err) {
        setError(err.message);
        setTitle('');
      } finally {
        setLoading(false);
      }
    };
    getPost();
  }, [slug]);

  useEffect(() => {
    setUploadError('');
  }, [selectedFile]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('uploaded_image', selectedFile);
    const token = localStorage.getItem('token');

    const config = {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    };

    try {
      const response = await axios.put(
        import.meta.env.VITE_BACKEND_URL + `/posts/${slug}/image`,
        formData,
        config,
      );
      setUploadError(null);
      navigate('/');
    } catch (err) {
      setUploadError(err.response.data.message);
      errRef.current.focus();
    }
  };

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <>
      <Container component='main' maxWidth='md'>
        <CssBaseline />
        <Toolbar sx={{ height: '8rem' }} />
        {error ? (
          <p>{error}</p>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1 className={styles.heading}>
              Upload image for &quot;{title}&quot;
            </h1>
            <form onSubmit={handleSubmit}>
              <input type='file' onChange={handleFileSelect} />
              <p
                ref={errRef}
                className={uploadError ? styles.error : styles.offscreen}
                aria-live='assertive'
              >
                {uploadError}
              </p>
              <input
                type='submit'
                className={styles.containedBtn}
                value='Upload File'
              />
            </form>
          </>
        )}
      </Container>
    </>
  );
}
