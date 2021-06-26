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
import fetchSingleMessage from 'src/utils/fetchSingleMessage';
import MessageDialog from './MessageDialog'; 


const MsgidChip = ({ msgid, ...rest }) => {
    const [messageLoaded, setMessageLoaded] = useState(false);
    const [message, setMessage] = useState({});
    const [viewingMessage, setViewingMessage] = useState(false);

    return (
        <>
            <Chip
                color='primary'
                label={msgid}
                size="small"
                onClick={()=>{
                    if(!messageLoaded)
                    {
                        fetchSingleMessage(msgid).then((obj)=>{
                            setMessage(obj);
                            setMessageLoaded(true);
                            setViewingMessage(true);
                        })
                    }
                    setViewingMessage(true);
                }}
            />
            
            <MessageDialog
                message={message}
                viewingMessage={viewingMessage}
                setViewingMessage={setViewingMessage}
            />
        </>
    )
}

export default MsgidChip;