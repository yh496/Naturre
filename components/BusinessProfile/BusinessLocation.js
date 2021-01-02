/*global kakao*/

import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        borderRadius: '24px',
        zIndex: 0,
        margin:'auto',
        width: '90%',
        height: '100%',
        overflow: 'hidden'
    },
  
}));


export default function BusinessLocation(props) {
    const classes = useStyles();
    const { location, ...rest } = props
    
    console.log('my location', location)

    return (
        <div className={classes.mapContainer}> 
            <GoogleMapReact
            className={classes.map}
            bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY, language:'en'}}
            center={
                {lat: location.lat,
                lng: location.lng}
            }
            defaultZoom={15}>
            <RoomIcon
                fontSize="large"
                style={{color: 'red'}}
                lat={location.lat}
                lng={location.lng}
               
            />
            </GoogleMapReact>
        </div>
        // <div id="map" className={classes.mapContainer}> </div>

    )


}


