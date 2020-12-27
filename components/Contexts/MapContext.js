
/***   Context for storing map boundary information and geocode to pass into Google Maps API */

const MapContext = {
    upperRight: [],
    bottomLeft: [],
    find_loc: "",
    find_by: "",
    geoCode: {
        lat: 37.566535,
        lng: 126.9779692
    },
    businessList: "",
    count: 0,
}



const fetchBusinessList = async () => {
    let response = await fetch('/api/map/find_business', {
        method:'post',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({upperRight: MapContext.upperRight, bottomLeft: MapContext.bottomLeft,find_by: MapContext.find_by})
    })
    response = await response.json()
    return response

}
const initialize = async ({find_by, find_loc}) => {
    MapContext.find_loc = find_loc
    MapContext.find_by = find_by
    var params = {
        loc: MapContext.find_loc || "Seoul",
      };
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(k => esc(k) + '=' + esc(params[k]))
        .join('&');
    
    let geoResponse = await fetch('/api/map/geocode?'+query)
    geoResponse = await geoResponse.json()

    MapContext.geoCode = geoResponse.geocode

    let response = await fetchBusinessList()
    let businessList = response.list
    let businessCount = response.count

    console.log(businessList, businessCount)
    MapContext.businessList = businessList
    MapContext.count = businessCount
    return MapContext
   
} 

const setBounds = async (geoBounds) => {
    MapContext.upperRight = [geoBounds.upperRight.lng, geoBounds.upperRight.lat]
    MapContext.bottomLeft = [geoBounds.bottomLeft.lng, geoBounds.bottomLeft.lat]

    let response = await fetchBusinessList()
    let businessList = response.list
    let businessCount = response.count
    MapContext.businessList = businessList
    MapContext.count = businessCount
}

const getMapContext = () => {
    return MapContext
}

const render = () => {}


export default {getMapContext, setBounds, initialize, render}
