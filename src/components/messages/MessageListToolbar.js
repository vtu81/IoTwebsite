import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon, RefreshCw as RefreshIcon } from 'react-feather';
import React, { useState, useEffect } from 'react';

const MessageListToolbar = (props) => {
  const [search_content, setSearchContent] = useState('');

  return(
  <Box {...props}>
    {/* <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <Button>
        Import
      </Button>
      <Button sx={{ mx: 1 }}>
        Export
      </Button>
      <Button
        color="primary"
        variant="contained"
      >
        Add customer
      </Button>
    </Box> */}

    <Box sx={{ mt: 0 }}>
      <Card>
        <CardContent>
          <Box sx={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}>
            {/* <Box sx={{ maxWidth: 500 }}> */}
              <TextField
                fullWidth
                // sx={{ maxWidth: 1000 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search by message info, device name and device ID"
                variant="outlined"
                onKeyDown={(e)=>{
                  // console.log(e.keyCode)
                  if(e.keyCode == 13)
                  {
                    props.searchMessages(search_content.split(' '));
                  }
                }}
                onChange={(event)=>{
                  setSearchContent(event.target.value);
                  // console.log(event.target.value)
                }}
              />
            {/* </Box> */}
            <Box
              sx={{
                ml: 2,
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <Button
                color="primary"
                variant="contained"
                onClick={()=>{
                  props.searchMessages(search_content.split(' '));
                }}
              >
                Search
              </Button>
              <Button
                onClick={()=>{
                  props.refreshMessages();
                }}>
                <SvgIcon
                  fontSize="small"
                  color="action"
                >
                  <RefreshIcon />
                </SvgIcon>
              </Button>
            </Box>
          </Box>

        </CardContent>
      </Card>
    </Box>
  </Box>
)};

export default MessageListToolbar;
