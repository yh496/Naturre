import { makeStyles, useTheme } from '@material-ui/core/styles';

import { 
    Typography,
    Grid
} from '@material-ui/core'


const useStyles=makeStyles( (theme) => ({
    header: {
        marginTop: theme.spacing(3),
        marginLeft: '115px'
    },
    description: {
        marginLeft: '115px', 
        marginTop: '25px', 
        marginBottom: '30px',
        maxWidth: '700px'
    }
}))

export default function BusinessDetail (props) {
    const classes=useStyles();
    const {detail, ...rest} = props
    console.log('BusinessDetail.detail', detail)
    return (
        <React.Fragment> 

            <Grid container className={classes.header}> 
                <Grid item xs={8}> 
                    <Typography variant="h2"> {detail.name} </Typography>
                    Rating stuff todo
                </Grid>
            </Grid> 

            <Typography className={classes.description}> {detail.description} </Typography> 

        </React.Fragment>



    )
}