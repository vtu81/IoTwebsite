import { Helmet } from 'react-helmet';
// import CustomerListResults from 'src/components/customer/CustomerListResults';
// import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
// import customers from 'src/__mocks__/customers';

import React, { useState, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  InputAdornment,
  SvgIcon,

  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);

  // Initial run
  useEffect(() => {
    fetch('/testapi').then(res=>{
      res.json().then((data)=>{
        console.log('data: ', data)
        setDevices(data)
      })
    })
  }, []);

  return (
    // <div>
    //   <p>You clicked {count} times</p>
    //   <button onClick={() => {setCount(count + 1); console.log('devices: ', devices)}}>
    //       Click me
    //   </button>
    // </div>
    <>
      <Helmet>
        <title>Devices | Material Kit</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <Button>
              Delete
            </Button>
            <Button sx={{ mx: 1 }}>
              Edit
            </Button>
            <Button
              color="primary"
              variant="contained"
            >
              Add device
            </Button>
          </Box>
          
          <Box sx={{ mt: 3 }}>
            <Card>
              <CardContent>
                <Box sx={{ maxWidth: 500 }}>
                  <TextField
                    fullWidth
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
                    placeholder="Search device"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ pt: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox">
                    {/* <Checkbox/> */}
                  </TableCell>
                  <TableCell>
                    Device Name
                  </TableCell>
                  <TableCell>
                    Device ID
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device) => (
                  <TableRow
                    hover
                    key={device.id}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox/>
                    </TableCell>
                    <TableCell>
                      <a href='/app/dashboard'>{device.deviceName}</a>
                    </TableCell>
                    <TableCell>
                      {device.deviceID}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Container>
      </Box>
    </>
  );


  // <>
  //   <Helmet>
  //     <title>Devices | Material Kit</title>
  //   </Helmet>
  //   <Box
  //     sx={{
  //       backgroundColor: 'background.default',
  //       minHeight: '100%',
  //       py: 3
  //     }}
  //   >
      // <Container maxWidth={false}>
      //   <CustomerListToolbar />
  //       <Box sx={{ pt: 3 }}>
  //         <CustomerListResults customers={customers} />
  //       </Box>
  //     </Container>
  //   </Box>
  // </>
};

export default DeviceList;
