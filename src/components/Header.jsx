import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { styled } from '@mui/material/styles';
import useAuth from '../hooks/useAuth';

const drawerWidth = 240;

const NavLink = styled(Link)(() => ({
  color: '#151515',
  fontSize: '20px',
  fontWeight: '300',
  textTransform: 'Capitalize',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
    textUnderlineOffset: '5px',
    textDecorationThickness: '1px',
    backgroundColor: 'transparent',
    color: '#151515',
  },
  marginLeft: '1.5rem',
}));

const NavButton = styled(Button)(() => ({
  color: '#151515',
  textAlign: 'center',
  textTransform: 'Capitalize',
  textDecoration: 'none',
  width: '100%',
  '&:hover': {
    backgroundColor: '#ebedf4',
    color: '#151515',
  },
}));

function DrawerAppBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { auth } = useAuth();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant='h6' sx={{ my: 2 }}>
        <Link
          href='/'
          underline='none'
          sx={{
            color: '#151515',
            fontSize: '25px',
            fontWeight: '700',
            '&:hover': {
              color: '#151515',
            },
          }}
        >
          KM Blog
        </Link>
      </Typography>
      <Divider />
      <List>
        <ListItem disablePadding sx={{ justifyContent: 'center' }}>
          <NavButton href='/'>
            <ListItemText
              primaryTypographyProps={{ fontSize: '20px', fontWeight: '300' }}
              primary='View Posts'
            />
          </NavButton>
        </ListItem>
        <ListItem disablePadding sx={{ justifyContent: 'center' }}>
          <NavButton href='/'>
            <ListItemText
              primaryTypographyProps={{ fontSize: '20px', fontWeight: '300' }}
              primary='New Post'
            />
          </NavButton>
        </ListItem>
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const adminLinks = () => {
    return (
      <>
        <NavLink href='/'>New Post</NavLink>
        <NavLink href='/'>Log out</NavLink>
      </>
    );
  };

  const publicLinks = () => {
    return (
      <>
        <NavLink href='/login'>Log In</NavLink>
        <NavLink href='/register'>Sign Up</NavLink>
      </>
    );
  };

  const nonAdminLinks = () => {
    return (
      <>
        <NavLink href='/register'>Log Out</NavLink>
      </>
    );
  };

  return (
    <>
      <CssBaseline />
      <AppBar
        component='nav'
        elevation={0}
        sx={{
          backgroundColor: '#fff',
          borderBottom: '1px solid rgb(218,218,218)',
        }}
      >
        <Container maxWidth='lg'>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: 'none' },
                color: '#151515',
                '&:hover': {
                  backgroundColor: '#ebedf4',
                },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant='h6'
              component='div'
              sx={{
                flexGrow: 1,
                textAlign: 'start',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              <Link
                href='/'
                underline='none'
                sx={{
                  color: '#151515',
                  fontSize: '25px',
                  fontWeight: '700',
                  '&:hover': {
                    color: '#151515',
                  },
                }}
              >
                KM Blog
              </Link>
            </Typography>
            <Box
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
            >
              {auth && auth.admin
                ? adminLinks()
                : auth && auth.username
                ? nonAdminLinks()
                : publicLinks()}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <nav>
        <Drawer
          container={container}
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
