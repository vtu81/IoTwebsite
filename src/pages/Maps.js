import React from "react";
import AllMessagesMap from "src/components/shared/AllMessagesMap";
import { Navigate } from 'react-router-dom';

const Maps = ({height}) => {
    if(!sessionStorage.getItem('user_name')) return (<Navigate to="/home" />)
    else return <AllMessagesMap height={height}/>
};

export default Maps;
