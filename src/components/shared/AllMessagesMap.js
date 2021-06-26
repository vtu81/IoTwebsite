import React from "react";
import { useEffect, useState } from 'react';
import {
    Box,
    Typography,
} from '@material-ui/core';
import fetchAllMessages from "src/utils/fetchAllMessages";
import fetchDeviceList from "src/utils/fetchDeviceList";
import MessageDialog from "./MessageDialog";
import DeviceDialog from "./DeviceDialog";

const AllMessagesMap = ({height}) => {
    const mapRef = React.useRef(null);
    let google = window.google;
    let map = mapRef.current;
    const [messages, setMessages] = useState([]);
    const [devices, setDevices] = useState([]);
    const [viewingMessage, setViewingMessage] = useState(false);
    const [viewingDevice, setViewingDevice] = useState(false);
    const [currentMessage, setCurrentMessage] = useState({});
    const [currentDevice, setCurrentDevice] = useState({});
    var [alert, setAlert] = useState(true);
    
    var mapOptions = {
        zoom: 11,
        center: { lat: 0, lng: -180 },
        scrollwheel: true,
        zoomControl: true,
    };
    var devices_colors = {};

    useEffect(() => {
        if(!google)
        {
            if(alert)
            {
                window.alert("Failed to connect to Google Map API, check your network!");
                setAlert(false);
            }
            return;
        }
        if(devices.length == 0) return;
        if(messages.length == 0) return;
        console.log("Total messages: ", messages.length);
        console.log("Total devices: ", devices.length);

        var devices_locations = {};
        for(var device of devices)
        {
            devices_locations[device.clientid] = [];
            devices_colors[device.clientid] = ('#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6));
        }

        var center_lat = 0;
        var center_lng = 0;
        for(var message of messages)
        {
            // sum up the lat and lng
            center_lat += message.lat;
            center_lng += message.lng;
            // add the location to the corresponding array
            devices_locations[message.clientid].unshift({lat: message.lat, lng: message.lng});
        }
        center_lat /= messages.length;
        center_lng /= messages.length;
        mapOptions.center = {lat: center_lat, lng: center_lng};
        map = new google.maps.Map(map, mapOptions);

        /* Draw polyline */
        for(var device of devices)
        {
            const messages_path = new google.maps.Polyline({
                path: devices_locations[device.clientid],
                geodesic: true,
                strokeColor: devices_colors[device.clientid],
                strokeOpacity: 1.0,
                strokeWeight: 4,
                device: device,
                icons: [
                    {
                        icon: {
                            path: google.maps.SymbolPath.FORWARD_OPEN_ARROW,
                        },
                        offset: "100%",
                    },
                ],
            });
            
            var contentString = '<div class="info-window-content"><h2>' + device.device_name + '</h2>' + '<p>#' + device.clientid + '</p>';
            if(device.offline_at)
            {
                contentString += '<h3 style=\'color: #69778b\'>Offline</h3>';
            }
            else contentString += '<h3 style=\'color: teal\'>Online</h3>';
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });
            google.maps.event.addListener(messages_path, "mouseover", function (e) {
                infowindow.setPosition(e.latLng); // set to the mouse's index position
                infowindow.open(map);
                console.log(infowindow);
            });
            google.maps.event.addListener(messages_path, "mouseout", function () {
                infowindow.close(map);
            });
            google.maps.event.addListener(messages_path, "click", function () {
                setCurrentDevice(messages_path.device);
                console.log(messages_path.device);
                setViewingDevice(true);
            });

            messages_path.setMap(map);
        }
        
        /* Add marks */
        var i = 0;
        for(var message of messages)
        {
            const svgMarker = {
                path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
                fillColor: message.alert?'#ffc400':'#555555',
                strokeColor: 'black', // Use HSLa function
                fillOpacity: 1.0,
                strokeWeight: 2,
                rotation: 0,
                scale: 2,
                anchor: { x: 12, y: 22 },
            };
            const marker = new google.maps.Marker({
                position: {lat: message.lat, lng: message.lng},
                icon: svgMarker,
                map: map,
                animation: google.maps.Animation.DROP,
                title: 'Click to see more',
                message: message,
            });
    
            const contentString =
                '<div class="info-window-content"><h2>Message #' + message.msgid + '</h2>' +
                '<p>sent by device <b>#' + message.clientid + '</b> at <b>' + message.timestamp + '</b></p></div>';
    
            const infowindow = new google.maps.InfoWindow({
                content: contentString,
            });
    
            google.maps.event.addListener(marker, "mouseover", function () {
                infowindow.open(map, marker);
            });
            google.maps.event.addListener(marker, "click", function () {
                setCurrentMessage(marker.message);
                console.log(marker.message);
                setViewingMessage(true);
            });
            google.maps.event.addListener(marker, "mouseout", function () {
                infowindow.close(map, marker);
            });
            i++;
        }

    }, [messages, devices]);

    useEffect(() => {
        fetchAllMessages().then((fetched_messages) => {
            setMessages(fetched_messages);
        });
        fetchDeviceList().then((fetched_devices) => {
            setDevices(fetched_devices);
        });
        // if(map) map = new google.maps.Map(map, mapOptions);
    }, []);

    return (
    <>
        {messages.length?<></>:
        <Typography variant='h2' style={{textAlign: 'center'}}>
            No messages from your devices
        </Typography>}
        {devices.length?<></>:
        <Typography variant='h2' style={{textAlign: 'center'}}>
            Add some devices first
        </Typography>}
        {window.google?<></>:
        <Typography variant='h2' style={{textAlign: 'center'}}>
            Configure your network to connect to Google Map API
        </Typography>}
        <div style={{ height: height }} ref={mapRef}></div>
        <MessageDialog
            message={currentMessage}
            viewingMessage={viewingMessage}
            setViewingMessage={setViewingMessage}
        />
        <DeviceDialog
            device={currentDevice}
            viewingDevice={viewingDevice}
            setViewingDevice={setViewingDevice}
        />
    </>
    );
};

export default AllMessagesMap;
