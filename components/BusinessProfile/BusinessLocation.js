/*global kakao*/

import React, { useEffect } from 'react'
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        margin:'auto',
        width: '80%',
        height: '250px'
    }
}));


export default function BusinessLocation(props) {
    const classes = useStyles();
    const { location, ...rest } = props
    
    console.log('my location', location)



    return (

        <div className={classes.mapContainer}> 
            <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyDcNBZMgMiNoZeaIxEFr6k-RJcDsFN8t6Q', language:'en'}}
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


