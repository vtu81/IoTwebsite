import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
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
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from '@material-ui/core';
import fetchSingleDevice from 'src/utils/fetchSingleDevice';
import DeviceDialog from './DeviceDialog';

const DeviceChip = ({ clientid, ...rest }) => {
    const [deviceLoaded, setDeviceLoaded] = useState(false);
    const [device, setDevice] = useState({});
    const [viewingDevice, setViewingDevice] = useState(false);
    
    return (
        <>
            <Chip
                color='primary'
                label={clientid}
                onClick={()=>{
                    if(!deviceLoaded)
                    {
                        fetchSingleDevice(clientid).then((obj)=>{
                            setDevice(obj);
                            setViewingDevice(true);
                            setDeviceLoaded(true);
                        })
                    }
                    else setViewingDevice(true);
                }}
                size="small"
            />
            <DeviceDialog
                device={device}
                viewingDevice={viewingDevice}
                setViewingDevice={setViewingDevice}
            />
        </>
    )
}

export default DeviceChip;