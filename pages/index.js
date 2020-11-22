import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';

import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles,withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import { server } from '../config';
import Link from 'next/link'



const BootstrapInput = withStyles((theme) => ({
  root: {
    background: '#DCDCDC', 
    height: '60px', 
    width:'150px', 
    right:'10%', 
    position: 'absolute', 
    outline:'none',
    'label + &': {
      marginTop: theme.spacing(3),
      
    },
  },
  input: {
    paddingLeft: theme.spacing(2),
    '&:focus': {
      paddingLeft: theme.spacing(2),
      height: '100%',
      padding: '0 0 0 0'
    },
    // Use the system font instead of the default Roboto font.
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  header: {
    width: '100%',
    height: '589px',
    position: 'relative',
    background: 'linear-gradient(180deg, rgba(247, 247, 247, 0) 0%, #E9E9E9 100%)'
  },

  subHeader: {
    position: 'absolute',
    top: '20%',
    left: '24%',
    width: '50%',
    maxWidth: '770px',
    textAlign: 'center',
  },
  headerText: { 
    lineHeight: '58.09px',
    font: 'inter',
    fontWeight: 700,
    fontSize: '48px',
  },
  searchBox: {
    top: '55%',
    left: '24%',
    margin: 'auto',
    width: '52%',
    maxWidth: '800px',
    position: 'absolute',
    height: '60px',
  },
  inputBox: {
    width: '100%', 
    height: '100%', 
    borderRadius: '24px',
    outline:'none', 
    border:'none', 
    position:'absolute',
    top: 0,
    left: 0,
  },
  searchIcon: {
    zIndex: 1, 
    position: 
    'absolute',
    right: '0',
    background: '#7FD4BB',
    width: '13%',
    height:'100%', 
    color: '#FFFFFF', 
    borderRadius:'24px'
  },
  bodyText: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '36px',
    lineHeight: '44px',
    textAlign: 'center',
  }
 
}));



export function Home({data}) {
  const classes = useStyles();
  // const [values, setValues] = React.useState({
  //   categories: []
  // })

  // React.useEffect( () => {
  //   fetch('/api/home-page/category-list').then(e=>e.json()).then(e => {
  //     setValues({...values, categories: e})
  //   });
  // })

  return (
    <React.Fragment> 
      <div className={classes.header}>  
        <div className={classes.subHeader}> 
          <Typography className={classes.headerText}> Start your wellness journey in Korea with a single click </Typography>
        </div> 

        <div className={classes.searchBox}>
          <input className={classes.inputBox} type="text" placeholder="Start your search today"/>
          <NativeSelect
                style={{zIndex:2}}
                placeholder="Location"
                id="demo-customized-select-native"
                input={<BootstrapInput />
              }
          >
            <option value={10}>Seoul</option>
            <option value={20}>Daegu</option>
            <option value={30}>Busan</option>
          </NativeSelect>
          <div className={classes.searchIcon}>
            <SearchIcon style={{transform:'scale(1.5)', position:'absolute', left: '50%', top: '30%'}}/>
          </div>
        </div>
      </div>
      <div style={{marginTop: '69px', marginBottom: '69px'}}> 
        <Typography className={classes.bodyText}> 
          Categories
        </Typography>
      </div> 
      <Grid container spacing={2} style={{width:'80%', margin:'auto'}}> 
          {data.categories.map( (item, i) => (
            <Grid item lg={3} style={{maxWidth: '250px',  marginRight: '1.5rem' }}>
              <Link
               href= {{
                 pathname: '/business-profile-list',
                 query: {type : item.category}
                 }}> 
                <ButtonBase 
                focusRipple 
                style={{textAlign:'left'}}
                >  
                  <Card  style={{height: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                    <img src={item.image} style={{width: 'auto', maxWidth: '250px', height: '220px'}}/>

                    <CardContent style={{height: '120px'}}>
                      <Typography style={{fontWeight: '600', fontSize: '24px', marginBottom: '20px'}}> {item.category} </Typography>
                      <Typography style={{fontWeight: '400', fontSize: '18px'}}> {item.description} </Typography>
                    </CardContent>
                  </Card>
                </ButtonBase> 
              </Link>
            </Grid>

          ))} 
      </Grid>
      <div style={{marginTop: '69px', marginBottom: '69px'}}> 
        <Typography className={classes.bodyText}> 
          Popular Picks / Top Places
        </Typography>
      </div> 
      <Grid container spacing={2} style={{width:'80%', margin:'auto'}}> 
          {data.categories.map( (item, i) => (
          <Grid item lg={3} style={{maxWidth: '250px',  marginRight: '1.5rem' }}>
          <ButtonBase focusRipple style={{textAlign:'left'}}>  
            <Card  style={{height: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
              <img src={item.image} style={{width: 'auto', maxWidth: '250px', height: '220px'}}/>
              <CardContent style={{height: '120px'}}>
                <Typography style={{fontWeight: '600', fontSize: '24px', marginBottom: '20px'}}> {item.category} </Typography>
                <Typography style={{fontWeight: '400', fontSize: '18px'}}> {item.description} </Typography>
              </CardContent>
            </Card>
          </ButtonBase> 
        </Grid>

          ))} 
      </Grid>
      <div style={{marginTop: '69px', marginBottom: '69px'}}> 
        <Typography className={classes.bodyText}> 
          Latest Blog Articles
        </Typography>
      </div> 
      <Grid container spacing={2} style={{width:'80%', margin:'auto'}}> 
          {data.categories.map( (item, i) => (
            <Grid item lg={3} style={{maxWidth: '250px',  marginRight: '1.5rem' }}>
            <ButtonBase focusRipple style={{textAlign:'left'}}>  
              <Card  style={{height: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <img src={item.image} style={{width: 'auto', maxWidth: '250px', height: '220px'}}/>

                <CardContent style={{height: '120px'}}>
                  <Typography style={{fontWeight: '600', fontSize: '24px', marginBottom: '20px'}}> {item.category} </Typography>
                  <Typography style={{fontWeight: '400', fontSize: '18px'}}> {item.description} </Typography>
                </CardContent>
              </Card>
            </ButtonBase> 
          </Grid>
          ))} 
      </Grid>




    </React.Fragment>
    
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${server}/api/home-page/category-list`)
  const data = await res.json()
  return { props: { data } }


}

export default Home