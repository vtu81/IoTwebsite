import {
    Box,
    Typography
} from '@material-ui/core';
import React from "react";
import { useEffect, useState } from 'react';

const SingleMessageMap = ({height, message}) => {
    const mapRef = React.useRef(null);
    var [alert, setAlert] = useState(true);
    React.useEffect(() => {
        let google = window.google;
        if(!google)
        {
            if(alert)
            {
                window.alert("Failed to connect to Google Map API, check your network!");
                setAlert(false);
            }
            return;
        }
        let map_element = mapRef.current;

        const myLatlng = new google.maps.LatLng(message.lat, message.lng);
        const mapOptions = {
            zoom: 12,
            center: myLatlng,
            scrollwheel: true,
            zoomControl: true,
        };

        var map = new google.maps.Map(map_element, mapOptions);

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
            title: "Material Dashboard React!",
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
        google.maps.event.addListener(marker, "mouseout", function () {
            infowindow.close(map, marker);
        });
    });
    return (
    <>
        {window.google?<></>:
        <Typography variant='h2' style={{textAlign: 'center'}}>
            Configure your network to connect to Google Map API
        </Typography>}
        <div style={{ height: height }} ref={mapRef}></div>
    </>
    );
};

export default SingleMessageMap;
