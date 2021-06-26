import { Helmet } from 'react-helmet';
import { Box, Container, FormControlLabel, Grid, Switch } from '@material-ui/core';
import MessageListResults from 'src/components/messages/MessageListResults';
import MessageCard from 'src/components/messages/MessageCard';
import MessageListToolbar from 'src/components/messages/MessageListToolbar';
// import messages from 'src/__mocks__/messages';
import React, { useState, useEffect } from 'react';
// import { useParams } from "react-router-dom";
import fetchAllMessages from 'src/utils/fetchAllMessages';
import { Navigate } from 'react-router-dom';

const Messages = (props) => {
  const [messages, setMessages] = useState([]);
  const [all_messages, setAllMessages] = useState([]);
  const [view, setView] = useState('card');
  const [alert_only, setAlertOnly] = useState(false);
  const searchByContent = (search_content) => {
    // Delete all empty string first
    for(var i = 0; i < search_content.length; i++)
    {
      if(search_content[i] == "")
      {
        console.log('deleting ', i)
        search_content.splice(i, 1);
        i--;
      }
    }
    // If nothing to search
    if(search_content.length == 0)
    {
      setMessages(all_messages);
      return;
    }
    var tmp = [];
    for(var message of all_messages)
    {
      for(var item of search_content)
        if(message.info.search(item) >= 0 || message.device_name.search(item) >= 0 || message.clientid.search(item) >= 0)
        {
          tmp.push(message);
          break;
        }
    }
    setMessages(tmp);
  };

  const getAlertMessages = () => {
    var tmp = [];
    for(var message of messages)
    {
      if(message.alert) tmp.push(message);
    }
    return tmp;
  }

  // Initial run: fetch messages from backend
  useEffect(() => {
    if(sessionStorage.getItem('user_name'))
    {
      // Fetch device list
      fetchAllMessages().then((data) => {
        setMessages(data);
        setAllMessages(data);
      })
    }
  }, []);

  /* Otherwise, list all messages */
  if(!sessionStorage.getItem('user_name')) return (<Navigate to="/home" />)
  else return (
  <>
    <Helmet>
      <title>Messages | IoTwebsite</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <MessageListToolbar
          refreshMessages={()=>{
            fetchAllMessages().then((data)=>{
              setMessages(data);
              setAllMessages(data);
            })
          }}
          searchMessages={(search_content) => {
            console.log('searching for:', search_content);
            searchByContent(search_content);
          }}
        />
        <Box
          sx={{
            mt: 1,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <FormControlLabel
            control={
              <Switch
                color="warning"
                checked={alert_only}
                onChange={()=>{
                  setAlertOnly(!alert_only);
                }}
                name="alert_only_switch"
            />
            }
            label='Alert Only'
            labelPlacement="start"
          />
          <FormControlLabel
            control={
              <Switch
                color="primary"
                checked={view=='list'}
                onChange={()=>{
                  if(view == 'list') setView('card');
                  else setView('list');
                }}
                name="view_switch"
              />
            }
            label='List View'
            labelPlacement="start"
          />
        </Box>
        <Box sx={{ pt: 1 }}>
          {view=='list'?
            <MessageListResults messages={messages} alert_only={alert_only} />
            :
            <Box sx={{ p: 0 }}>
              <Grid
                container
                spacing={3}
              >
                {(alert_only?getAlertMessages(messages):messages).map((message) => (
                  <Grid
                    item
                    key={message.msgid}
                    lg={4}
                    md={6}
                    xs={12}
                  >
                    <MessageCard message={message} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          }
        </Box>
      </Container>
    </Box>
  </>);
};

export default Messages;
