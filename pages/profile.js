import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import { ButtonGroup } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { Z_BLOCK } from 'zlib';


const useStyles = makeStyles( (theme) => ({

    main: {
        display: "flex",
        position: 'relative',
        marginLeft: '135px',
        marginRight: '135px',
    },
    headerText: {
        fontSize: '24px',
        fontWeight: 'bold',
        textAlign: 'left'
    },
    sideNavigationParent: {
        flex: '1',
        border:"1px solid red",
        maxWidth: '200px',
        height: '100%',
    },
    sideNavigation: {
        padding: '10px',
    },
    margin: {
        textTransform: 'none',
        padding: '5px',
    },
    label: {
        textAlign: 'left',
        display: 'block' 
    },
    profileSetupParent: {
        flex: '1',
        border:"1px solid red",
        width: '100%',
        height: '100px',
    },
    content: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexFlow: 'column nowrap',
    },
}))

export default function Profile() {



    const classes = useStyles();

    return (
      <React.Fragment>
        <div className={classes.main}>
            <div className={classes.sideNavigationParent}>
                <div className={classes.content}>
                    <div className={classes.sideNavigation}>
                        <Typography variant='h6' className={classes.headerText}>Navigation</Typography>
                        <ButtonGroup orientation='vertical' color="default" variant='text' >
                            <Button classes={{ root: classes.margin, label: classes.label}}>Profile</Button>
                            <Button classes={{ root: classes.margin, label: classes.label}}>Account Settings</Button>
                            <Button classes={{ root: classes.margin, label: classes.label}}>Wellness</Button>
                            <Button classes={{ root: classes.margin, label: classes.label}}>Shopping</Button>
                        </ButtonGroup>
                    </div>
                </div>
            </div>
            <div className={classes.profileSetupParent}>
                <div className={classes.content}>
                    <div className={classes.profileSetup}>
                        <Typography variant='h3' className={classes.headerText}>Profile Setup</Typography>
                    </div>
                </div>
            </div>
        </div>
      </React.Fragment>
    );
  }
