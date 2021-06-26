import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  useTheme
} from '@material-ui/core';
import {
  Smartphone as SmartphoneIcon,
} from 'react-feather';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import { useEffect, useState } from 'react';

const MessageByDevice = ({messages, devices}) => {
  const [devices_colors, setDevicesColors] = useState([]);
  const [sorted_devices, setSortedDevices] = useState([]);

  const generateColor = () => {
    if(Object.keys(devices_colors).length == 0)
    {
      for(var device of devices)
      {
        devices_colors[device.clientid] = ('#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6));
      }
      setDevicesColors(devices_colors);
    }
    return devices_colors;
  }

  const getProportion = () => {
    var message_num = {};
    var total = 0;
    for(var device of devices)
    {
      message_num[device.clientid] = 0;
    }
    for(var message of messages)
    {
      message_num[message.clientid]++;
      total++;
    }
    
    if (total == 0)
    {
      var ret = {};
      for(var device of devices)
      {
        ret[device.clientid] = 0;
      }
      return ret;
    }

    var ret = {};
    for(var device of devices)
    {
      ret[device.clientid] = (message_num[device.clientid] / total);
    }
    return ret;
  }

  const getDoughNutData = () => {
    generateColor();
    var data = {
      datasets: [
        {
          data: [],
          backgroundColor: [],
          borderWidth: 8,
          borderColor: colors.common.white,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: []
    };

    var message_num = {};
    for(var device of devices)
    {
      message_num[device.clientid] = 0;
    }
    for(var message of messages)
    {
      message_num[message.clientid]++;
    }
    
    setSortedDevices(devices.sort((a, b) => {return message_num[b.clientid] - message_num[a.clientid]}));

    for(var device of devices)
    {
      data.datasets[0].data.push(message_num[device.clientid]);
      data.labels.push(device.device_name);
      data.datasets[0].backgroundColor.push(devices_colors[device.clientid]);
    }
    return data;
  };
  
  const theme = useTheme();
  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card sx={{ height: '100%' }}>
      <CardHeader title="Messages by Device" />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 300,
            position: 'relative'
          }}
        >
          <Doughnut
            data={getDoughNutData}
            options={options}
          />
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            pt: 2
          }}
        >
          {sorted_devices.slice(0, 3).map((device) => (
            <Box
              key={device.clientid}
              sx={{
                p: 1,
                mt: 2,
                textAlign: 'center'
              }}
            >
              <SmartphoneIcon style={{color: generateColor()[device.clientid]}} />
              <Typography
                color="textPrimary"
                variant="body1"
              >
                {device.device_name}
              </Typography>
              <Typography
                style={{color: generateColor()[device.clientid]}}
                variant="h2"
              >
                {(getProportion()[device.clientid] * 100).toFixed(1)}
                %
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default MessageByDevice;
