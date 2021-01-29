import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    // maxWidth: '772px',
    width:'100%',
    height: '100%',
    flexGrow: 1,
    backgroundColor: 'black',
    borderRadius: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default,
  },
  img: {
    borderRadius: '24px',
    overflow: 'hidden',
    display: 'block',
    margin: 'auto',
    width: 'auto',
    maxWidth: '100%',
    height: '100%',
  },
  arrowIconLeft: {
    position: 'absolute', 
    top: 0,
    left: 0, 
    zIndex: 0,
    color: 'black',
    height: '100%',
    borderRadius: '24px'
  },
  arrowIconRight: {
    position: 'absolute', 
    top: 0, 
    right: 0, 
    zIndex: 0,
    color: 'black',
    height: '100%',
    borderRadius: '24px'
  }
}));

export default function ImageStepper(props) {

  const { images, ...rest } = props
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images ? images.length : 0;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  console.log('whaaat', activeStep)

  return (
    <div className={classes.root}>

      <img
        className={classes.img}
        src={images[activeStep]}
      />

      {activeStep !== 0 &&
        <Button onClick={handleBack} className={classes.arrowIconLeft}>   
          <ArrowBackIcon fontSize="large" color="inherit" />
        </Button>
      }
      {activeStep !== maxSteps -1 && 
        <Button onClick={handleNext} className={classes.arrowIconRight} >
          <ArrowForwardIcon fontSize="large" color="inherit" />
        </Button>
      }
      {/* <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
            Next
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Back
          </Button>
        }
      /> */}
    </div>
  );
}
