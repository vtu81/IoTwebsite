import React from "react";
import { useEffect, useState } from 'react';
import {
    Box, Typography
} from '@material-ui/core';
import fetchMessageOfDevice from "src/utils/fetchMessageOfDevice";
import MessageDialog from "./MessageDialog";
import DeviceDialog from "./DeviceDialog";

const SingleDeviceMap = ({height, device}) => {
    const mapRef = React.useRef(null);
    let google = window.google;
    let map_element = mapRef.current;
    const [messages, setMessages] = useState([]);
    const [viewingMessage, setViewingMessage] = useState(false);
    const [currentMessage, setCurrentMessage] = useState({});
    var [alert, setAlert] = useState(true);
    
    var mapOptions = {
        zoom: 11,
        center: { lat: 0, lng: -180 },
        scrollwheel: true,
        zoomControl: true,
    };
    var device_color = '#000000';

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
        if(messages.length == 0) return;
        console.log("Total messages of the device: ", messages.length);

        var device_loation = [];
        device_color = ('#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).substr(-6));

        var center_lat = 0;
        var center_lng = 0;
        for(var message of messages)
        {
            // sum up the lat and lng
            center_lat += message.lat;
            center_lng += message.lng;
            // add the location to the corresponding array
            device_loation.unshift({lat: message.lat, lng: message.lng});
        }
        center_lat /= messages.length;
        center_lng /= messages.length;
        mapOptions.center = {lat: center_lat, lng: center_lng};
        var map = new google.maps.Map(map_element, mapOptions);

        /* Draw polyline */
        const messages_path = new google.maps.Polyline({
            path: device_loation,
            geodesic: true,
            strokeColor: device_color,
            strokeOpacity: 1.0,
            strokeWeight: 4,
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

        messages_path.setMap(map);

        
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

    }, [messages]);

    useEffect(() => {
        fetchMessageOfDevice(device.clientid).then((fetched_messages) => {
            setMessages(fetched_messages);
        });
    }, []);

    return (
    <>
        {messages.length?<></>:
        <Typography variant='h2' style={{textAlign: 'center'}}>
            No messages from your devices
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
    </>
    );
};

export default SingleDeviceMap;
