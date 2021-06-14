import { Helmet } from 'react-helmet';
// import CustomerListResults from 'src/components/customer/CustomerListResults';
// import CustomerListToolbar from 'src/components/customer/CustomerListToolbar';
// import customers from 'src/__mocks__/customers';

import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
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
import * as Yup from 'yup';
import { Formik } from 'formik';

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [addingDevice, setAddingDevice] = useState(false);
  const [checked, setChecked] = useState([]);
  const [deletingDevice, setDeletingDevice] = useState(false);

  const fetchDeviceList = () => {
    return new Promise((resolve) => {
      fetch('/testapi',{
          method:'post',
          headers:{
            "Access-Control-Allow-Origin": "*",
            "Accept": 'application/json',
            // "Content-Type": "application/x-www-form-urlencoded",
            "Content-Type": "application/json;charset=UTF-8",
          },
          // body:`email=${values.username}&password_hash=${password_hash}`
          body: JSON.stringify({'user_name': window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest'})
      }).then(res=>{
        res.json().then((sql_ret)=>{
          console.log(sql_ret);
          var data = [];
          for(let i in sql_ret)
          {
            var obj = {};
            obj.id = sql_ret[i].id;
            obj.deviceName = sql_ret[i].device_name;
            obj.deviceID = sql_ret[i].clientid;
            if(sql_ret[i].offline_at != null) obj.state = 'Offline';
            else obj.state = 'Online';
            data.push(obj);
          }
          console.log('data: ', data);
          // setDevices(data);
          resolve(data);
        })
      })
    });
  }

  const ifAllCheckBoxSelected = () => {
    for(var i = 0; i < devices.length; i++)
    {
      if(checked[i] == false) return false;
      else if(i == devices.length - 1) return true;
    }
    return false;
  }

  const ifSomeCheckBoxSelected = () => {
    if(devices == null) return false;
    if(ifAllCheckBoxSelected()) return false;
    for(var i = 0; i < devices.length; i++)
    {
      if(checked[i] == true) return true;
      else if(i == devices.length - 1) return false;
    }
    return false;
  }

  // Initial run: fetch device list from backend
  useEffect(() => {
    // Fetch device list
    fetchDeviceList().then((data) => {
      setDevices(data);
    })
  }, []);

  // Side effect of `devices`: changing the `checked` state
  useEffect(() => {
    console.log('Side effect of `devices`');
    setChecked(new Array(devices.length).fill(false));
  }, [devices]);

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
            <Button sx={{ mx: 1 }}
              onClick={() => {
                console.log('Check boxes\' state: ', checked);
                var i = 0
                  for(i = 0; i < devices.length; i++)
                  {
                    if(checked[i] == true)
                    {
                      break;
                    }
                  }
                  if(i < devices.length) setDeletingDevice(true);
                  else window.alert('No device selected! Please select some devices to delete.');
              }}
            >
              Delete
            </Button>
            <Button
              color="primary"
              variant="contained"
              onClick={() => {
                  setAddingDevice(true);
                }
              }
            >
              Add/Edit device
            </Button>
          </Box>

          {/* <Box sx={{ mt: 3 }}>
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
          </Box> */}

          <Box sx={{ pt: 3 }}>
            <Card>
              <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={ifAllCheckBoxSelected()}
                            color="primary"
                            indeterminate={ifSomeCheckBoxSelected()}
                            onChange={(event) => {
                              for(var i = 0; i < devices.length; i++)
                              {
                                setChecked(new Array(devices.length).fill(event.target.checked));
                              }
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          Device Name
                        </TableCell>
                        <TableCell>
                          Device ID
                        </TableCell>
                        <TableCell>
                          State
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {devices.map((device, index) => (
                        <TableRow
                          hover
                          key={device.id}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                            checked={(checked[index] == null)?false:checked[index]}
                            onChange={(event) => {
                              var obj = [];
                              for(var i = 0; i < devices.length; i++)
                              {
                                obj[i] = checked[i];
                              }
                              obj[index] = event.target.checked;
                              setChecked(obj);
                            }}/>
                          </TableCell>
                          <TableCell>
                            <a href='/app/dashboard'>{device.deviceName}</a>
                          </TableCell>
                          <TableCell>
                            {device.deviceID}
                          </TableCell>
                          <TableCell>
                            {device.state}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              </PerfectScrollbar>
            </Card>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="sm">
        <Formik
          initialValues={{
            deviceID: '',
            deviceName: ''
          }}
          validationSchema={Yup.object().shape({
            deviceID: Yup.string().max(64).required('Device ID is required'),
            deviceName: Yup.string().max(64).required('Device name is required')
          })}
          onSubmit={(values, {setSubmitting}) => {
            console.log('Submitting...');
            console.log(values);
            setSubmitting(false);

            fetch('/add_device',{
                method:'post',
                headers:{
                  "Access-Control-Allow-Origin": "*",
                  "Accept": 'application/json',
                  // "Content-Type": "application/x-www-form-urlencoded",
                  "Content-Type": "application/json;charset=UTF-8",
                },
                // body:`email=${values.username}&password_hash=${password_hash}`
                body: JSON.stringify({
                  "user_name": window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
                  "clientid": values.deviceID,
                  "device_name": values.deviceName
                })
            }).then(res=>{
              res.json().then((ret)=>{
                console.log(ret);
                if(ret.success) // Successfully add/update!
                {
                  fetchDeviceList().then((data) => {
                    setDevices(data);
                    // setChecked(new Array(data.length).fill(false));
                  })
                  window.alert(ret.msg);
                  console.log(ret.msg);
                  setAddingDevice(false);
                }
                else
                {
                  window.alert(ret.msg);
                  console.log(ret.msg);
                }
              })
            })
          }}
        >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form onSubmit={handleSubmit}>
            <Dialog
              onClose={() => {
                  setAddingDevice(false);
                }
              }
              aria-labelledby="simple-dialog-title"
              open={addingDevice}
            >
              <DialogTitle id="simple-dialog-title">Add/Update device (name)</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the <b>device ID</b> of your device which has already connected to the MQTT server before,
                  then choose a customized <b>device name</b> for it.
                </DialogContentText>
                  <TextField
                    autoFocus
                    error={Boolean(touched.deviceID && errors.deviceID)}
                    helperText={touched.deviceID && errors.deviceID}
                    margin="dense"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="deviceID"
                    label="Device ID"
                    value={values.deviceID}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    error={Boolean(touched.deviceName && errors.deviceName)}
                    helperText={touched.deviceName && errors.deviceName}
                    margin="dense"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="deviceName"
                    label="Device Name"
                    value={values.deviceName}
                    fullWidth
                    variant="standard"
                  />
              </DialogContent>
              <DialogActions>
                <Button onClick={() => {
                  setAddingDevice(false);
                }}>Cancel</Button>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  // type="submit"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
        </Formik>
      </Container>

      <Dialog
        open={deletingDevice}
        onClose={() => {
            setDeletingDevice(false);
          }
        }
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Warning"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sure to delete the devices?
          </DialogContentText>
          <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Device Name
                  </TableCell>
                  <TableCell>
                    Device ID
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {devices.map((device, index) => {
                  if(checked[index])
                  {
                    return (<TableRow
                      hover
                      key={device.id}
                    >
                      <TableCell>
                        <a href='/app/dashboard'>{device.deviceName}</a>
                      </TableCell>
                      <TableCell>
                        {device.deviceID}
                      </TableCell>
                    </TableRow>);
                  }
                })}
              </TableBody>
            </Table>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            setDeletingDevice(false);
          }
          }>
            No
          </Button>
          <Button
            color="error"
            onClick={() => {
              var delete_devices = [];
              for(var i = 0; i < devices.length; i++)
              {
                if(checked[i]) delete_devices.push(devices[i]);
              }
              console.log('Delete devices: ', delete_devices);
              delete_devices.map((device, index) => {
                fetch('/delete_device',{
                    method:'post',
                    headers:{
                      "Access-Control-Allow-Origin": "*",
                      "Accept": 'application/json',
                      "Content-Type": "application/json;charset=UTF-8",
                    },
                    body: JSON.stringify({
                      "user_name": window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
                      "clientid": device.deviceID,
                      "device_name": device.deviceName
                    })
                }).then(res=>{
                  res.json().then((ret)=>{
                    console.log(ret);
                    if(ret.success) // Successfully delete
                    {
                      console.log(ret.msg);
                      if(index == delete_devices.length - 1)
                      {
                        window.alert(ret.msg);
                        console.log(ret.msg);
                        fetchDeviceList().then((data) => {
                          setDevices(data);
                          // setChecked(new Array(data.length).fill(false));
                        })
                        setDeletingDevice(false);
                      }
                    }
                    else
                    {
                      window.alert(ret.msg);
                      console.log(ret.msg);
                      fetchDeviceList().then((data) => {
                        setDevices(data);
                        // setChecked(new Array(data.length).fill(false));
                      })
                      setDeletingDevice(false);
                      return;
                    }
                  })
                })
              });
            }
          } autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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
