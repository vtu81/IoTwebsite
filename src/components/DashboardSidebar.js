import { useEffect } from 'react';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  IconButton
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Smartphone as SmartphoneIcon,
  MessageCircle as MessageIcon,
  Map as MapIcon,
  GitHub as GitHubIcon,
  Link as LinkIcon,
} from 'react-feather';
import NavItem from './NavItem';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/devices',
    icon: SmartphoneIcon,
    title: 'Devices'
  },
  {
    href: '/app/messages',
    icon: MessageIcon,
    title: 'Messages'
  },
  {
    href: '/app/maps',
    icon: MapIcon,
    title: 'Maps'
  },
  {
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  // {
  //   href: '/login',
  //   icon: LockIcon,
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: UserPlusIcon,
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: AlertCircleIcon,
  //   title: 'Error'
  // }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 1
        }}
      >
        <Avatar
          component={RouterLink}
          src='/static/images/avatars/cat_avatar.png'
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64,
            m: 0
          }}
          to="/app/account"
        />
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {sessionStorage.getItem('user_name')?sessionStorage.getItem('user_name'):'Guest'}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          // m: 5,
          // pt: 2
        }}
      >
        <Button
          color="secondary"
          component="a"
          href="/login"
          variant="contained"
          onClick={() => {
              window.sessionStorage.removeItem("user_name");
            }
          }
        >
          Logout
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 4,
          p: 0,
          mb: 0,
        }}
      >
          <IconButton href="http://vtu.life" color="inherit">
            <LinkIcon />
            <Typography sx={{ml: 0.5}}>My Page</Typography>
          </IconButton>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 0,
          p: 0,
          mb: 3,
        }}
      >
          <IconButton href="https://github.com/vtu81/IoTwebsite" color="inherit">
            <GitHubIcon />
            <Typography sx={{ml: 0.5}}>Github</Typography>
          </IconButton>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="left"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
