import { Helmet } from 'react-helmet';

import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
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
import { Search as SearchIcon, RefreshCw as RefreshIcon } from 'react-feather';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { Link } from 'react-router-dom';
import fetchDeviceList from 'src/utils/fetchDeviceList';
import DeviceListToolbar from 'src/components/devices/DeviceListToolbar';
import DeviceChip from 'src/components/shared/DeviceChip';
import { Navigate } from 'react-router-dom';
var connect_config = require('src/utils/config.json');

const DeviceList = () => {
  const [devices, setDevices] = useState([]);
  const [all_devices, setAllDevices] = useState([]);
  const [addingDevice, setAddingDevice] = useState(false);
  const [checked, setChecked] = useState([]);
  const [deletingDevice, setDeletingDevice] = useState(false);

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
      setDevices(all_devices);
      return;
    }
    var tmp = [];
    for(var device of all_devices)
    {
      for(var item of search_content)
        if(device.device_name.search(item) >= 0 || device.clientid.search(item) >= 0)
        {
          tmp.push(device);
          break;
        }
    }
    setDevices(tmp);
  };

  // Initial run: fetch device list from backend
  useEffect(() => {
    if(sessionStorage.getItem('user_name'))
    {
      // Fetch device list
      fetchDeviceList().then((data) => {
        setDevices(data);
        setAllDevices(data);
      })
    }
  }, []);

  // Side effect of `devices`: changing the `checked` state
  useEffect(() => {
    console.log('Side effect of `devices`');
    setChecked(new Array(devices.length).fill(false));
  }, [devices]);
  
  if(!sessionStorage.getItem('user_name')) return (<Navigate to="/home" />)
  else return (
    <>
      <Helmet>
        <title>Devices | IoTwebsite</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          minHeight: '100%',
          py: 3
        }}
      >
        <Container maxWidth={false}>
          <DeviceListToolbar
            deleteDevice={() => {
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
            refreshMessages={() => {
              fetchDeviceList().then((data) => {
                setDevices(data);
                setAllDevices(data);
                // setChecked(new Array(data.length).fill(false));
              })
            }}
            addDevice={() => {setAddingDevice(true)}}
            searchDevices={(search_content) => {
              searchByContent(search_content);
            }}
          />

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
                            {device.device_name}
                          </TableCell>
                          <TableCell>
                            <DeviceChip clientid={device.clientid} />
                          </TableCell>
                          <TableCell>
                            {<Typography type="body2" style={device.offline_at?{color: '#69778b', fontSize: 14}:{color: 'teal', fontSize: 14}}>
                              {device.offline_at?`Offline`:`Online`}
                            </Typography>}
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
            clientid: '',
            device_name: ''
          }}
          validationSchema={Yup.object().shape({
            clientid: Yup.string().max(64).required('Device ID is required'),
            device_name: Yup.string().max(64).required('Device name is required')
          })}
          onSubmit={(values, {setSubmitting}) => {
            console.log('Submitting...');
            console.log(values);
            setSubmitting(false);

            fetch(connect_config.backend_host + '/add_device',{
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
                  "clientid": values.clientid,
                  "device_name": values.device_name
                })
            }).then(res=>{
              res.json().then((ret)=>{
                console.log(ret);
                if(ret.success) // Successfully add/update!
                {
                  fetchDeviceList().then((data) => {
                    setDevices(data);
                    setAllDevices(data);
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
              <DialogTitle id="simple-dialog-title">Add/Edit Device Name</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Enter the <b>device ID</b> of your device which has already connected to the MQTT server before,
                  then choose a customized <b>device name</b> for it.
                </DialogContentText>
                  <TextField
                    autoFocus
                    error={Boolean(touched.clientid && errors.clientid)}
                    helperText={touched.clientid && errors.clientid}
                    margin="dense"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="clientid"
                    label="Device ID"
                    value={values.clientid}
                    fullWidth
                    variant="standard"
                  />
                  <TextField
                    error={Boolean(touched.device_name && errors.device_name)}
                    helperText={touched.device_name && errors.device_name}
                    margin="dense"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    name="device_name"
                    label="Device Name"
                    value={values.device_name}
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
                        <a href='/app/dashboard'>{device.device_name}</a>
                      </TableCell>
                      <TableCell>
                        {device.clientid}
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
                fetch(connect_config.backend_host + '/delete_device',{
                    method:'post',
                    headers:{
                      "Access-Control-Allow-Origin": "*",
                      "Accept": 'application/json',
                      "Content-Type": "application/json;charset=UTF-8",
                    },
                    body: JSON.stringify({
                      "user_name": window.sessionStorage.getItem('user_name')?window.sessionStorage.getItem('user_name'):'Guest',
                      "clientid": device.clientid,
                      "device_name": device.device_name
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
                          setAllDevices(data);
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
                        setAllDevices(data);
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
};

export default DeviceList;
