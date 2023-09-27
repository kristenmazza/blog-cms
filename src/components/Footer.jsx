import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import styles from './Footer.module.css';

function Copyright() {
  return (
    <Typography
      className={styles.copyright}
      variant='body2'
      color='text.secondary'
    >
      {'Copyright © '}
      <Link color='inherit' href='https://www.kristenmazza.dev'>
        Kristen Mazza
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function StickyFooter() {
  return (
    <Box className={styles.footer} component='footer'>
      <Container maxWidth='sm'>
        <Copyright />
      </Container>
    </Box>
  );
}
