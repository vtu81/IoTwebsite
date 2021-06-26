import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardActions,
  Chip,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import GetAppIcon from '@material-ui/icons/GetApp';
import DeviceChip from '../shared/DeviceChip';
import MessageDialog from '../shared/MessageDialog';
import { useEffect, useState } from 'react';

const MessageCard = ({ message, ...rest }) => {
  const [viewingMessage, setViewingMessage] = useState(false);

  return (
    <>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
        {...rest}
      >
        <CardContent>
            <Typography
              // align="center"
              color="textPrimary"
              gutterBottom
              variant="h4"
            >
            Message #{message.msgid}
          </Typography>
          <Typography
            // align="center"
            color="textPrimary"
            gutterBottom
            variant="h5"
          >
            {message.device_name}
          </Typography>
          <Typography
            // align="center"
            color="textPrimary"
            variant="body1"
          >
            {message.info}
          </Typography>
        </CardContent>
        <CardActions
          sx={{
            m: 0,
            p: 0,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          <Button
            size="small"
            onClick={()=>{setViewingMessage(true);}}>
            DETAIL
          </Button>
        </CardActions>
        <Box sx={{ flexGrow: 1 }} />
        <Divider />
        <Box sx={{ p: 2 }}>
          <Grid
            container
            spacing={2}
            sx={{ justifyContent: 'space-between' }}
          >
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              {/* <GetAppIcon color="action" /> */}
              <Chip
                label={message.alert?'alert':'normal'}
                size="small"
                style={message.alert?{
                  backgroundColor: '#ffc400',
                  color: 'white'
                }:{
                  color: 'black'
                }}
              />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                <DeviceChip clientid={message.clientid} />
              </Typography>
            </Grid>
            <Grid
              item
              sx={{
                alignItems: 'center',
                display: 'flex'
              }}
            >
              <AccessTimeIcon color="action" />
              <Typography
                color="textSecondary"
                display="inline"
                sx={{ pl: 1 }}
                variant="body2"
              >
                {message.timestamp}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Card>
      <MessageDialog
          message={message}
          viewingMessage={viewingMessage}
          setViewingMessage={setViewingMessage}
      />
    </>
  );
};

MessageCard.propTypes = {
  message: PropTypes.object.isRequired
};

export default MessageCard;
