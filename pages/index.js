import React , {useState} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

import InputBase from '@material-ui/core/InputBase';
import { makeStyles,withStyles } from '@material-ui/core/styles';
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
    width: '100%',
    // maxWidth: '770px',
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
    width: '100%',
    position: 'absolute',
  },
  inputBox: {
    width: '100%', 
    height: '100%', 
    borderRadius: '24px',
    outline:'none', 
    border:'none', 
    position: 'absolute',
    padding:'1rem'
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

  const [searchText, setSearchText] = useState("")
  const [locationOption, setLocationOption] = useState("Seoul")
  return (
    <React.Fragment> 
      <div className={classes.header}>
        <div className={classes.subHeader}>
          <div style={{width:'100%', margin: 'auto', position: 'relative', maxWidth: '770px'}}>
            <Typography className={classes.headerText}> Start your wellness journey in Korea with a single click </Typography>
          </div>
        </div>

        <div className={classes.searchBox}>
          <div style={{width:'100%', margin: 'auto', position: 'relative', maxWidth: '800px', height: '60px'}}>
            <input
              className={classes.inputBox}
              type="text"
              placeholder="Start your search today"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  location.href=`/business-profile-list?find_by=${searchText}&find_loc=${locationOption}`
                }
              }}
            />
            <NativeSelect
              value={locationOption}
              style={{zIndex:2}}
              placeholder="Location"
              id="demo-customized-select-native"
              input={<BootstrapInput />}
              onChange={(e) => setLocationOption(e.target.value)}
            >
              <option value={'Seoul'}>Seoul</option>
              <option value={'Daegu'}>Daegu</option>
              <option value={'Busan'}>Busan</option>
            </NativeSelect>
            <div className={classes.searchIcon}>
              <SearchIcon style={{transform:'scale(1.5)', position:'absolute', left: '50%', top: '30%'}}/>
            </div>
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
            <Grid item xl={3} lg={3} xs={12} md={6} style={{width:'250px', margin:'auto' }}>
              <Link
               href= {{
                 pathname: '/business-profile-list',
                 query: {find_by : item.category}
                 }}>
                <ButtonBase
                focusRipple
                style={{textAlign:'left'}}
                >
                  <Card  style={{height: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                    <img src={item.image} style={{width: '100%', height: '220px'}}/>

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
          {data.topView.map( (item, i) => (
          <Grid item xl={3} lg={3} xs={12} md={6} style={{width: '250px', margin: 'auto' }}>
          <ButtonBase focusRipple style={{textAlign:'left'}}>
            <Card  style={{height: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
              <img src={item.mainImage} style={{width: '100%', height: '220px'}}/>
              <CardContent style={{height: '120px'}}>
                <Typography style={{fontWeight: '600', fontSize: '24px', marginBottom: '20px'}}> {item.name} </Typography>
                <Typography style={{fontWeight: '400', fontSize: '18px'}}> {item.category} </Typography>
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
            <Grid item xl={3} lg={3} xs={12} md={6} style={{width: '250px', margin: 'auto' }}>
            <ButtonBase focusRipple style={{textAlign:'left'}}>
              <Card  style={{height: '100%', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)'}}>
                <img src={item.image} style={{width: '100%', height: '220px'}}/>

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
  const categoryJson = await res.json()
  const res2 = await fetch(`${server}/api/home-page/top-view`)
  const topViewJson = await res2.json()

  const data = {
    categories: categoryJson.categories,
    topView : topViewJson.selected
  }
  return { props: { data } }


}

export default Home