import BusinessList from '../components/BusinessProfile/BusinessLIst'
import React, { useState, useEffect } from 'react';
import Filters from '../components/BusinessProfile/Filters'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button,Menu,MenuItem } from '@material-ui/core'
import SearchBar from "material-ui-search-bar";
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import {useRouter} from 'next/router'
import GoogleMap from '../components/Map/GoogleMap'
import MapContext from '../components/Contexts/MapContext'


const useStyles = makeStyles((theme) => ({
  root: {
    width: '93%',
    margin:'auto'
  },

  searchBox: {
    height: '40px',
    width: '600px',
    marginTop: '10px',
    marginBottom: '10px',
    borderRadius: '18px',
    marginLeft: '60px'
  },
  searchButton: {
    height: '36px',
    marginTop: '12px',
    marginBottom: '10px',
    marginLeft: '10px',
    backgroundColor: '#94F4D9',
    borderStyle: 'none',
    borderRadius: '10px',
    color: 'white'
  },
  locationButton: {
    backgroundColor: 'lightgrey',
    height: '36px',
    marginTop: '12px',
    marginBottom: '10px',
    marginLeft: '10px',
    borderRadius: '10px',
    width: '150px'
  },
  locationMenu: {
    width: '150px'
  }
}));
export default function BusinessProfileList() {

  const classes=useStyles();
  const [searchText, setSearchText] = useState("")
  const [anchorEl, setAnchorEl] = React.useState(null);
  // const [businessCount, setBusinessCount] = useState(0)
  // const [businessList, setBusinessList] = useState([])

  const router = useRouter();
  const query = router.query

  // const getBusinessProfiles = () => {
  //   var params = {
  //     find_by: router.query.find_by,
  //   };

  // var esc = encodeURIComponent;
  // var query = Object.keys(params)
  //     .map(k => esc(k) + '=' + esc(params[k]))
  //     .join('&');
  //   fetch('/api/business-profile/business-list?' + query)
  //     .then(res => res.json()).then(res => {
  //       setBusinessList(res.data)
  //       setBusinessCount(res.count)
  //     }
  //     )
  // }

  const [context, setContext] = useState({
    ...MapContext.getMapContext()
  })


  MapContext.render = () => {
    setContext({...context, ...MapContext.getMapContext()})
  }


  useEffect(() => {
    (async function initializeMap() {
      let context = await MapContext.initialize({find_by: router.query.find_by, find_loc: router.query.find_loc})
      setContext(context)
    })() ;
  }, [])

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <React.Fragment> 
      <div style={{ display: 'flex' }}>
        <SearchBar className={classes.searchBox} placeholder="Start your search today"
          value={searchText}
          onChange={(val) => setSearchText(val)}
          onCancelSearch = {() => setSearchText("")}
          onRequestSearch = {() => location.href=`/business-profile-list?find_by=${searchText}`}
        
        />

        {/* <Button className={classes.searchButton}>Search</Button> */}
        <Button className={classes.locationButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
          Location
          <ArrowDropDown />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          className={classes.locationMenu}
        >
          <MenuItem onClick={handleClose}>Seoul</MenuItem>
          <MenuItem onClick={handleClose}>Daegu</MenuItem>
          <MenuItem onClick={handleClose}>Busan</MenuItem>
          <MenuItem onClick={handleClose}>Jeju</MenuItem>
          <MenuItem onClick={handleClose}>Incheon</MenuItem>

        </Menu>

    </div>


    <Grid container spacing={2} className={classes.root}>

      <Grid item xs={2}>
        <Filters />
      </Grid>

      <Grid item xs={7} key={context.count}>
        <h1 style={{ color: '#1F2725', marginBottom: '35px', fontSize: '26px' }}> 
        {context.count} locations found for '{context.find_by}' in {context.find_loc || 'Seoul'}</h1>
        <BusinessList key={context}/>
      </Grid>

      <Grid item xs={3}> 
          <GoogleMap key={context.geoCode}/>
      </Grid>

    </Grid>
    </React.Fragment>
  )

}