import React from 'react';
import Container from '@mui/material/Container';
import PostCard from './PostCard';
import Breadcrumbs from './Breadcrumbs';
import styles from './PostList.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { CircularProgress } from '@mui/material';

export default function PostList() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + '/posts',
        );
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setPosts(null);
      } finally {
        setLoading(false);
      }
    };
    getPosts();
  }, []);

  // Filter posts based on filter option selected
  let filteredPosts;

  if (filter === 'published') {
    filteredPosts = posts.filter((post) => post.published === true);
  } else if (filter === 'drafts') {
    filteredPosts = posts.filter((post) => post.published === false);
  } else {
    filteredPosts = posts;
  }

  const postCards = filteredPosts.map((post) => {
    if (error) return <p> An error was encountered.</p>;
    const { _id, slug, title, date, uploaded_image, published } = post;
    const formattedDate = format(new Date(date), 'MMM dd, yyyy');
    let publishedStatus;

    if (published === true) {
      publishedStatus = 'Published';
    } else {
      publishedStatus = 'Draft';
    }

    return (
      <React.Fragment key={_id}>
        <PostCard
          title={title}
          date={formattedDate}
          src={uploaded_image}
          publishedStatus={publishedStatus}
          published={published}
          slug={slug}
        />
      </React.Fragment>
    );
  });

  return (
    <Container maxWidth='lg'>
      <Breadcrumbs setFilter={setFilter} />
      <div className={styles.cardGrid}>
        {loading ? <CircularProgress color='inherit' /> : postCards}
      </div>
    </Container>
  );
}
