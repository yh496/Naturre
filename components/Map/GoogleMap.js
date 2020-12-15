import React, {useState,useEffect} from 'react'
import GoogleMapReact from 'google-map-react';
import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    mapContainer: {
        width: '100%',
        height: '250px'
    }
}));


const GoogleMap = (props) => {
    const { locationSearch, ...rest } = props


    const [searchGeo, setSearchGeo] = useState({
        lat: "",
        lng: ""
    })

    const [geoBounds, setGeoBounds] = useState({
        bottomLeft: [],
        upperRight: []
    })

    const [businessList, setBusinessList] = useState([])

    useEffect(() => {
        if (geoBounds.bottomLeft && geoBounds.upperRight) {
            fetch('/api/map/find_business', {
                method:'post',
                headers: { "Content-Type": "application/json; charset=utf-8" },
                body: JSON.stringify(geoBounds)
            }).then(e=>e.json()).then(e=>{
                setBusinessList(e.list)
            })
        }
    },[geoBounds])

    useEffect(() => {
        var params = {
            loc: locationSearch,
          };
        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(k => esc(k) + '=' + esc(params[k]))
            .join('&');
      fetch('/api/map/geocode?'+query, {
          method:'get',
          headers: { "Content-Type": "application/json; charset=utf-8" },
      }).then(e=>e.json()).then(e => {
        setSearchGeo(e.geocode)
      })
    },[])

    const handleApiLoaded = (map, maps) => {
        let upperRightLat = map.getBounds().getNorthEast().lat()
        let upperRightLng = map.getBounds().getNorthEast().lng()
        let lowerLeftLat = map.getBounds().getSouthWest().lat()
        let lowerLeftLng = map.getBounds().getSouthWest().lng()

        const upperRight = [upperRightLng,upperRightLat]
        const bottomLeft = [lowerLeftLng,lowerLeftLat]

        console.log('bounds', upperRight, bottomLeft)

        setGeoBounds({...geoBounds, bottomLeft, upperRight})
    }

    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.GOOGLE_API_KEY, language:'en'}}
            center={
                {lat: searchGeo.lat,lng: searchGeo.lng}
            }
            defaultZoom={10}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        >
            {businessList && businessList.map((val, i) => (
                <RoomIcon
                    fontSize="large"
                    style={{color: 'red'}}
                    lat={val.location.lat}
                    lng={val.location.lng}
                />
            ))}
        </GoogleMapReact>
    )
}

export default GoogleMap;