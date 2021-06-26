import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Hidden,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from './Logo';
import { Link } from 'react-router-dom';
import {
  GitHub as GitHubIcon,
  Link as LinkIcon,
} from 'react-feather';

const DashboardNavbar = ({ onMobileNavOpen, ...rest }) => {
  const [notifications] = useState([]);

  return (
    <AppBar
      elevation={0}
      {...rest}
    >
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Typography sx={{display: 'flex', ml: 1}}>
          <Typography sx={{fontWeight: 'bold'}} variant='h2'>IoTwebsite</Typography>
          <Typography sx={{ml: 0.5, fontStyle: 'italic', fontFamily: 'Georgia'}}>by VTU</Typography>
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Hidden lgDown>
          <IconButton href="http://vtu.life" color="inherit">
            <LinkIcon />
          </IconButton>
          <IconButton href="https://github.com/vtu81/IoTwebsite" color="inherit">
            <GitHubIcon />
          </IconButton>
          <IconButton href="/login" color="inherit" onClick={()=>{window.sessionStorage.removeItem("user_name");}}>
            <Typography sx={{mr: 1}}>Logout</Typography>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

DashboardNavbar.propTypes = {
  onMobileNavOpen: PropTypes.func
};

export default DashboardNavbar;
