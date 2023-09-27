import { Toolbar } from '@mui/material';
import styles from './Home.module.css';
import PostList from '../components/PostList';

export default function Home() {
  return (
    <main className={styles.content}>
      <Toolbar sx={{ height: '8rem' }} />
      <PostList />
    </main>
  );
}
