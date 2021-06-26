import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Card,
    Chip,
    Dialog,
    DialogContent,
    DialogTitle,
    DialogActions,
    DialogContentText,
    Divider,
    Grid,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    TextField,
    Text
} from '@material-ui/core';
import SingleDeviceMaps from './SingleDeviceMap';
import fetchMessageOfDevice from 'src/utils/fetchMessageOfDevice';

const DeviceDialog = ({device, viewingDevice, setViewingDevice}) => {
    const [messages, setMessages] = useState([]);
    const [messagesLoaded, setMessagesLoaded] = useState(false);

    useEffect(()=>{
        if(viewingDevice && !messagesLoaded)
        {
            setMessagesLoaded(true);
            fetchMessageOfDevice(device.clientid).then((data) => {
                setMessages(data);
            });
        }
    });

    return (
        <Dialog
            onClose={() => {
                setViewingDevice(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={viewingDevice}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle id="simple-dialog-title">Device Detail</DialogTitle>
            {
                Object.keys(device).length?
                <DialogContent>
                    <Typography variant='h2'>{device.device_name}</Typography>
                    <DialogContentText>
                        <Typography>#{device.clientid}</Typography>
                    </DialogContentText>
                        {
                            device.offline_at?
                            <Typography style={{color: '#69778b'}}><b>Offlined</b> at {device.offline_at}</Typography>
                            :<Typography style={{color: 'teal'}}><b>Online</b></Typography>
                        }
                    <DialogContentText>
                        <Typography>Latestly onlined at {device.online_at}</Typography>
                        <Typography>Created at {device.created}</Typography>
                    </DialogContentText>
                    <SingleDeviceMaps height='50vh' device={device} />
                </DialogContent>
                :
                <DialogContent>
                    <DialogContentText>
                        Loading...
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
            <Button onClick={() => {
                setViewingDevice(false);
            }}>Cancel</Button>
            {/* <Button
                color="primary"
                variant="contained"
                onClick={()=>{
                    console.log('Submitting')
                }}
            >
                Submit
            </Button> */}
            </DialogActions>
        </Dialog>
    );
}

export default DeviceDialog;