import styles from './App.module.css';
import Header from './components/Header';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import { Box } from '@mui/material';

const theme = createTheme({
  typography: { fontFamily: 'Inter' },
});

function App() {
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
}

export default App;
