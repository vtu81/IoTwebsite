import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import TotalDevices from 'src/components/dashboard//TotalDevices';
import LatestMessages from 'src/components/dashboard//LatestMessages';
import RecentDevices from 'src/components/dashboard//RecentDevices';
import FirstChart from 'src/components/dashboard//FirstChart';
import AlertRate from 'src/components/dashboard//AlertRate';
import TotalMessages from 'src/components/dashboard//TotalMessages';
import TotalInfoSize from 'src/components/dashboard//TotalInfoSize';
import MessageByDevice from 'src/components/dashboard/MessageByDevice';
import React, { useState, useEffect } from 'react';
import fetchDeviceList from 'src/utils/fetchDeviceList';
import fetchAllMessages from 'src/utils/fetchAllMessages';
import { Navigate } from 'react-router-dom';

const Dashboard = () => {
  const [devices, setDevices] = useState([]);
  const [messages, setMessages] = useState([]);
  
  // Initial run: fetch messages from backend
  useEffect(() => {
    if(sessionStorage.getItem('user_name'))
    {
      // Fetch all messages
      fetchAllMessages().then((data) => {
        setMessages(data);
      });
      // Fetch device list
      fetchDeviceList().then((data) => {
        setDevices(data);
      });
    }
  }, []);

  const getAlertRate = (messages) => {
    var message_num = messages.length;
    var alert_num = 0.0;
    for(var obj of messages)
    {
      if(obj.alert) alert_num++;
    }
    if(message_num == 0) return 0;
    return (alert_num / message_num);
  };

  const getOnlineDeviceNum = (devices) => {
    var online_num = 0;
    for(var obj of devices)
    {
      if(obj.offline_at == null) online_num++;
    }
    return online_num;
  };

  const getTotalInfoSize = (messages) => {
    var size = 0;
    for(var obj of messages)
    {
      size += obj.info.length;
    }
    return size;
  };
  
  if(sessionStorage.getItem('user_name')) return (
  <>
    <Helmet>
      <title>Dashboard | IoTwebsite</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalDevices devices_num={devices.length} online_num={getOnlineDeviceNum(devices)} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalMessages messages_num={messages.length} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <TotalInfoSize total_info_size={getTotalInfoSize(messages)} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <AlertRate alert_rate={getAlertRate(messages)} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <FirstChart messages={messages} devices={devices} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <MessageByDevice messages={messages} devices={devices} />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <RecentDevices sx={{ height: '100%' }} devices={devices} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestMessages messages={messages} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
  )
  else return (<Navigate to="/home" />)
};

export default Dashboard;
