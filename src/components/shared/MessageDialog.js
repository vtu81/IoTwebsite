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
import SingleMessageMap from './SingleMessageMap';

const MessageDialog = ({message, viewingMessage, setViewingMessage}) => {
    return (
        <Dialog
            onClose={()=>{setViewingMessage(false)}}
            aria-labelledby="simple-dialog-title"
            open={viewingMessage}
            fullWidth
            maxWidth='sm'
        >
            <DialogTitle id="simple-dialog-title">Message Detail</DialogTitle>
            {
                Object.keys(message).length?
                <DialogContent>
                    <DialogContentText>
                        <h3>Message #{message.msgid}</h3>
                        <Box sx={{ m: 2, p: 2, border: '1px dashed grey' }}>
                            <Typography>{message.info}</Typography>
                        </Box>
                        Sent by <b>{message.clientid}</b> at <b>{message.timestamp}</b> with value <b>{message.value}</b><br/>
                    </DialogContentText>
                    <SingleMessageMap height='50vh' message={message} />
                </DialogContent>
                :
                <DialogContent>
                    <DialogContentText>
                        Loading...
                    </DialogContentText>
                </DialogContent>
            }
            <DialogActions>
            <Button onClick={()=>{setViewingMessage(false)}}>Close</Button>
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

export default MessageDialog;