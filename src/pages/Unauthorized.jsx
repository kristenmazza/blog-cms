import { useNavigate } from 'react-router-dom';
import styles from './Unauthorized.module.css';
import { Container, Toolbar } from '@mui/material';

export default function Unauthorized() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  return (
    <Container maxWidth='lg'>
      <Toolbar sx={{ height: '8rem' }} />
      <h1 className={styles.errorHeading}>Unauthorized</h1>
      <p className={styles.errorPara}>
        You do not have access to the requested page.
      </p>
      <button onClick={goBack}>Go back</button>
    </Container>
  );
}
