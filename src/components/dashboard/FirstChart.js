import { Bar } from 'react-chartjs-2';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const FirstChart = (props) => {
  const [view, setView] = useState(1);
  const getBarData1 = () => {
    var data = {
      datasets: [
        {
          // backgroundColor: colors.grey[500],
          backgroundColor: 'rgba(158, 158, 158, 0.6)',
          borderColor: 'rgba(158, 158, 158, 1)',
          borderWidth: 1,
          data: [],
          label: 'Normal'
        },
        {
          backgroundColor: 'rgba(246, 197, 68, 0.6)',
          borderColor: 'rgba(246, 197, 68, 1)',
          borderWidth: 1,
          data: [],
          label: 'Alert'
        }
      ],
      labels: []
    };

    var normal_message_num = {};
    var alert_message_num = {};
    for(var device of props.devices)
    {
      normal_message_num[device.clientid] = 0;
      alert_message_num[device.clientid] = 0;
    }
    for(var message of props.messages)
    {
      if(message.alert)
      {
        alert_message_num[message.clientid]++;
      }
      else normal_message_num[message.clientid]++;
    }
    for(var device of props.devices)
    {
      data.datasets[0].data.push(normal_message_num[device.clientid]);
      data.datasets[1].data.push(alert_message_num[device.clientid]);
      data.labels.push(device.device_name);
    }
    return data;
  };

  const getBarData2 = () => {
    var data = {
      labels: [],
      datasets: [
        {
          label: 'Average Value',
          data: [],
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1,
        },
      ],
    };

    var value_sum = {};
    var msg_num = {};
    for(var device of props.devices)
    {
      value_sum[device.clientid] = 0;
      msg_num[device.clientid] = 0;
    }
    for(var message of props.messages)
    {
      value_sum[message.clientid] += message.value;
      msg_num[message.clientid]++;
    }
    for(var device of props.devices)
    {
      if(msg_num[device.clientid]) data.datasets[0].data.push((value_sum[device.clientid] / msg_num[device.clientid]).toFixed(2));
      else data.datasets[0].data.push(0);
      data.labels.push(device.device_name);
    }
    return data;
  };



  const theme = useTheme();
  

  const options1 = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
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

  const options2 = {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Chart.js Horizontal Bar Chart',
        },
      },
    };

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">View</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={view}
                label="View"
                onChange={(event) => {
                  setView(event.target.value);
                  console.log(view);
                }}
              >
                <MenuItem value={1}>Normal/Alert</MenuItem>
                <MenuItem value={2}>Average Value</MenuItem>
              </Select>
            </FormControl>
          </Box>
        )}
        title="Messages"
      />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          {
            view==1?
            <Bar
              data={getBarData1}
              options={options1}
            />:
            <Bar
              data={getBarData2}
              options={options2}
            />
          }
        </Box>
      </CardContent>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Link to="/app/messages">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon />}
            size="small"
            variant="text"
          >
            ALL MESSAGES
          </Button>
        </Link>
      </Box>
    </Card>
  );
};

export default FirstChart;
