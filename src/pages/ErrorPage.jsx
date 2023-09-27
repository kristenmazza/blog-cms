import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import styles from './ErrorPage.module.css';
import { Container, Toolbar } from '@mui/material';

export default function ErrorPage() {
  const error = useRouteError();

  return (
    <Container maxWidth='lg'>
      <Toolbar sx={{ height: '8rem' }} />
      <h1 className={styles.errorHeading}>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p className={styles.errorPara}>
        <i>
          {isRouteErrorResponse(error)
            ? // note that error is type `ErrorResponse`
              error.error?.message || error.statusText
            : 'Not found.'}
        </i>
      </p>
    </Container>
  );
}
