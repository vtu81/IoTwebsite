import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid,
} from '@material-ui/core';
import AccountProfile from 'src/components/account/AccountProfile';
import AccountProfileDetails from 'src/components/account/AccountProfileDetails';
import fetchAccount from 'src/utils/fetchAccount';
import AccountPassword from 'src/components/account/AccountPassword'
import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Navigate } from 'react-router-dom';

const Account = () => {
  const [account, setAccount] = useState({});
  
  useEffect(() => {
    if(sessionStorage.getItem('user_name'))
    {
      fetchAccount().then((obj) => {
        setAccount(obj);
      });
    }
  }, []);

  if(!sessionStorage.getItem('user_name')) return (<Navigate to="/home" />)
  else return (
    <>
      <PerfectScrollbar>
        <Helmet>
          <title>Account | IoTwebsite</title>
        </Helmet>
        <Box
          sx={{
            backgroundColor: 'background.default',
            minHeight: '100%',
            py: 3,
            mt: '4%',
            // display: 'flex',
            // height: '100%',
            // justifyContent: 'center',
            // flexDirection: 'column',
          }}
        >
          <Container maxWidth="sm">
            <Box>
                <AccountProfile account={account} />
                <AccountProfileDetails account={account} />
                <AccountPassword />
            </Box>
          </Container>
        </Box>
      </PerfectScrollbar>
    </>
  )
};

export default Account;
