import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import SearchBar from "material-ui-search-bar";
import {
  Typography, Card, CardActionArea, CardContent, CardMedia, Button, Menu, MenuItem
} from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Link from 'next/link';
import Filters from "./Filters"
import {useRouter} from 'next/router'


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(3),
  },
  card: {
    maxWidth: '100%',
    marginBottom: 10,
    height: '180px',
    borderRadius: '20px',
    marginTop: '20px',
    boxShadow: '1px 1px 4px 1px rgba(0, 0, 0, 0.1)',

  },
  media: {
    height: 200,
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
export default function BusinessList(props) {

  const [businessList, setBusinessList] = useState([])
  const [businessCount, setBusinessCount] = useState(0)
  const [searchText, setSearchText] = useState("")

  const router = useRouter();
  const query = router.query


  const getBusinessProfiles = () => {
    var params = {
      find_by: router.query.find_by,
    };

  var esc = encodeURIComponent;
  var query = Object.keys(params)
      .map(k => esc(k) + '=' + esc(params[k]))
      .join('&');
    fetch('/api/business-profile/business-list?' + query)
      .then(res => res.json()).then(res => {
        setBusinessList(res.data)
        setBusinessCount(res.count)
      }
      )
  }

  useEffect(() => {
    getBusinessProfiles()
  }, [])


  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
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
      <br />
      <Grid container style={{ marginLeft: '60px' }}>
        <Grid item xs={3}>
          <Filters />
        </Grid>
        <Grid item xs>
          <h1 style={{ color: '#1F2725', marginBottom: '35px', fontSize: '26px' }}> 
          {businessCount} locations found for '{query.find_by}' in Seoul</h1>
          {businessList.map((biz, i) => (

            <Card className={classes.card}>
              <Link
                href={{
                  pathname: '/business-profile',
                  query: { id: biz._id }
                }}
              >
                <CardActionArea>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardMedia
                        className={classes.media}
                        image={biz.mainImage}
                        title="Contemplative Reptile"
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <CardContent>
                        <Typography gutterBottom variant="h3" component="h2">
                          {biz.name}
                        </Typography>
                        <Typography variant="h5" style={{ color: "#49AD82" }} component="p">
                          {biz.location}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                          {biz.description}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </CardActionArea>
              </Link>
            </Card>
          ))
          }
        </Grid>
      </Grid>



    </div >

  )
}