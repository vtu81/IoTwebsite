import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import {
  Box,
  Typography,
  IconButton
} from '@material-ui/core';
import Logo from './Logo';
import {
  GitHub as GitHubIcon,
  Link as LinkIcon,
} from 'react-feather';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
          <Logo />
      </RouterLink>
      <Typography sx={{display: 'flex', ml: 1}}>
        <Typography sx={{fontWeight: 'bold'}} variant='h2'>IoTwebsite</Typography>
        <Typography sx={{ml: 0.5, fontStyle: 'italic', fontFamily: 'Georgia'}}>by VTU</Typography>
      </Typography>

      <Box sx={{ flexGrow: 1 }} />
      
      <IconButton href="http://vtu.life" color="inherit">
        <LinkIcon />
      </IconButton>
      <IconButton href="https://github.com/vtu81/IoTwebsite" color="inherit">
        <GitHubIcon />
      </IconButton>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
