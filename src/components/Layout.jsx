import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styles from './Layout.module.css';

const theme = createTheme({
  typography: { fontFamily: 'Inter' },
});

const Layout = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header />
      <Box className={styles.contentContainer}>
        <Outlet />
      </Box>
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
