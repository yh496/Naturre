/*global kakao*/
import React, { useEffect } from 'react'

export default function BusinessLocation (props) {
    const {location, ...rest} = props

    useEffect(() => {
        const container = document.getElementById('map')
        const options = { 
            center: new kakao.maps.LatLng(33.450701, 126.570667), 
            level: 5 
        }; 
        console.log(location)
        const map = new kakao.maps.Map(container, options);
        const geocoder = new kakao.maps.services.Geocoder();
        geocoder.addressSearch(location, function(result, status) {

             if (status === kakao.maps.services.Status.OK) {
        
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                var marker = new kakao.maps.Marker({
                    map: map,
                    position: coords
                });
        
                var infowindow = new kakao.maps.InfoWindow({
                    content: '<div style="width:150px;text-align:center;padding:6px 0;">앙</div>'
                });
                infowindow.open(map, marker);
        
                // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                map.setCenter(coords);
            } 
        });    
    },[location])


       
    
    return (
        <div id="map" style={{ width: "350px", height: "200px", marginLeft:'165px' }}> </div> 

    )


}


