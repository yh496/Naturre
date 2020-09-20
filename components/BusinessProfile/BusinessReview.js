import { 
    Typography,
    Grid,
    Box,
    Slider 
} from '@material-ui/core'
import Rating from '@material-ui/lab/Rating';

import { makeStyles, withStyles } from '@material-ui/core/styles';

const PrettoSlider = withStyles({
    root: {
      color: 'blue',
      height: 1,
      width: '300px',
    },
    thumb: {
        width: 0,
        height: 0,
        "&:focus, &:hover, &$active": {
          boxShadow: "0 0px 0px 0px"
        }
      },
    active: {},
    valueLabel: {
      left: 'calc(-50% - 13px)',
    },
    track: {
      height: 8,
      borderRadius: 4,
    },
    rail: {
      height: 8,
      borderRadius: 4,
    },
  })(Slider);

const useStyles=makeStyles( (theme) => ({
    reviewContainer: {
        marginTop: theme.spacing(3),
        marginLeft: '115px',
        marginBottom: '100px'
    },
    ratingIcon: {
        color: 'blue',
        width: '14px'
    },
    graphContainer: {
        marginLeft: theme.spacing(10)

    }
}))

export default function BusinessReview (props) {
    const {reviews, ...rest} = props
    
    const numReview = reviews.length;
    console.log('numReview', numReview)

    const findAverage = () => {
        let sum = 0
        reviews.map((val) => {
            sum += val.rating
        })

        return sum / numReview
    }

    const countNumStars = () => {
        let countList = []
        for (let i = 5; i > 0; i--) {
            countList.push(reviews.filter(e => e.rating == i).length)
        }
        return countList
    }

    const averageRating = parseFloat(findAverage()).toFixed(1);

    const nums = countNumStars();
    const maxNum = nums.reduce(function (a,b) { 
        return a + b
    }, 0);
    // const numFives = reviews.filter(e => e.rating == 5).length

    const classes=useStyles();
    return (
        <div className={classes.reviewContainer}>
            <Typography style={{fontWeight: 560, fontSize: '20px'}}> Reviews </Typography>


            <Grid container> 
                <Grid item xs={1}>
                    <Typography variant="h1" style={{transform:'translate(12%,0%)', marginTop: '20px', height:'25px'}}> {averageRating} </Typography>
                    <div style={{marginBottom: '20px'}}> 
                        <Rating size='small' classes={{iconFilled: classes.ratingIcon}} precision={0.2} value={averageRating} readOnly /> 
                    </div>
                    <Typography variant="p" style={{marginLeft: '4px', height:'25px'}} > {numReview}+ rating </Typography>
                </Grid> 
                <Grid item xs={4} className={classes.graphContainer}>
                    <Grid container>
                        {nums.map( (val,i) => (
                            <React.Fragment>
                                <Grid item xs={1} style={{transform:'translate(0%, 15%)'}}>
                                    <Typography style={{display:'inline'}}>{5-i} </Typography>
                                </Grid>
                                <Grid item xs={11}>
                                    <PrettoSlider max={maxNum} valueLabelDisplay="auto" aria-label="pretto slider" value={val}/>
                                </Grid>
                            </React.Fragment> 
                        ))}
                    </Grid> 
                   
                </Grid>

            </Grid>
            <div style={{width: '500px'}}>
                {reviews.map( (val, i) => (
                    <div style={{marginBottom: '20px'}}> 
                        <Typography variant="h4" style={{fontWeight:700, fontSize:'15px'}}> {val.title} </Typography>
                        <Typography variant="p"> {val.content} </Typography>
                    </div>
                ))}
             </div>
        </div>
    )

}