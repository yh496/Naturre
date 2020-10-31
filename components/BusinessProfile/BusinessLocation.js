/*global kakao*/

import React, { useEffect } from 'react'

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

    useEffect(() => {
        const container = document.getElementById('map')
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(location, function (result, status) {
            if (status === kakao.maps.services.Status.OK) {

                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                const options = {
                    center: coords,
                    level: 5
                }
                const map = new kakao.maps.Map(container, options);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });

                // var infowindow = new kakao.maps.InfoWindow({
                //     content: '<div style="width:150px;text-align:center;padding:6px 0;"></div>'
                // });
                // infowindow.open(map, marker);

                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            }
        });
    }, [location])




    return (
        <div id="map" className={classes.mapContainer}> </div>

    )


}


