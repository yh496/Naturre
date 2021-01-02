import React, {useState,useEffect} from 'react'
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'

import MapContext from '../Contexts/MapContext'

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        width: '100%',
        height: '250px'
    }
}));

const Marker = props => {

    return (
        <RoomIcon
        style={{color: 'red'}}
        lat={props.lat}
        lng={props.lng}
    />
    )
 
}


const GoogleMap = (props) => {

    const [geoBounds, setGeoBounds] = useState()
    
    const redoSearchInMap = async () => {
        await MapContext.setBounds(geoBounds)
        
        MapContext.render();
    }
    return (
        <div style={{width:'100%',height:'100%', position:'relative'}}> 
        <Button 
            variant="contained" 
            style={{position: 'absolute', top:0, left:0, zIndex:1, background:'#ff0f03', color:'white'}}
            onClick={() => redoSearchInMap()}
            > 
            Redo Search in Map 
        </Button>

        <GoogleMapReact
            onChange={(e) => setGeoBounds({upperRight: e.bounds.ne, bottomLeft: e.bounds.sw})}
            bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY, language:'en'}}
            center={
                {lat: MapContext.getMapContext().geoCode.lat,lng: MapContext.getMapContext().geoCode.lng}
            }
            defaultZoom={10}
        >
            {MapContext.getMapContext().businessList && MapContext.getMapContext().businessList.map((val, i) => (
                <Marker 
                    key={i}
                    lat={val.location.lat}
                    lng={val.location.lng} 
                />
            ))}
        </GoogleMapReact>
        </div>
    )
}

export default GoogleMap;