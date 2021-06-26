import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import MsgidChip from 'src/components/shared/MsgidChip';
import DeviceChip from '../shared/DeviceChip';

const MessageListResults = ({ messages, alert_only, ...rest }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  /* Prevent illegal page number after altering page limit */
  useEffect(()=>{
    var tmp = page;
    while(tmp * limit > messages.length)
      tmp--;
    setPage(tmp);
  }, [limit])

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    console.log(newPage)
  };
  const normal_row_color = {
    backgroundColor: 'white',
  }
  const alert_row_color = {
    backgroundColor: '#ffc400',
  }

  const getAlertMessages = () => {
    var tmp = [];
    for(var message of messages)
    {
      if(message.alert) tmp.push(message);
    }
    return tmp;
  }

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: 1050 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Message ID
                </TableCell>
                <TableCell>
                  Device Name
                </TableCell>
                <TableCell>
                  Client ID
                </TableCell>
                <TableCell>
                  Info
                </TableCell>
                <TableCell>
                  Value
                </TableCell>
                <TableCell>
                  Time
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                (alert_only?getAlertMessages(messages):messages).slice(page * limit, ((page+1)*limit)>(alert_only?getAlertMessages(messages):messages).length?(alert_only?getAlertMessages(messages):messages).length:((page+1)*limit)).map((message) => (
                <TableRow
                  hover
                  key={message.msgid}
                  style={message.alert?alert_row_color:normal_row_color}
                >
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex'
                      }}
                    >
                      <MsgidChip msgid={message.msgid}/>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {message.device_name}
                  </TableCell>
                  <TableCell>
                    <DeviceChip clientid={message.clientid} />
                  </TableCell>
                  <TableCell>
                    {message.info}
                  </TableCell>
                  <TableCell>
                    {message.value}
                  </TableCell>
                  <TableCell>
                    {message.timestamp}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={messages.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

MessageListResults.propTypes = {
  messages: PropTypes.array.isRequired
};

export default MessageListResults;
