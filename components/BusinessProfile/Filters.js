import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
  },
  formControl: {
    // margin: theme.spacing(1),
  },
  label: {
    fontSize: '15px'
  },
  controlHeight: {
    height: '30px'
  },
  accordian: {
    boxShadow: 'none',
    borderBottom: '2px solid lightgrey',
  },
  filterLabel: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
    marginTop: '10px',
    color: 'grey'
  }

}));

export default function Filters(props) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    seoul: false,
    daegu: false,
    busan: false,
    jeju: false,
    incheon: false
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const { seoul, daegu, busan, jeju, incheon, massage, spa, tcm, foodReflexology
    , cafe, brunch, bar, restaurant } = state;
  return (
    <div className={classes.root}>
      <h2 style={{ color: 'black', fontSize: '18px', fontWeight: "bold" }}>Filters</h2>
      <FormLabel component="legend" className={classes.filterLabel}>Categories</FormLabel>

      <FormControl component="fieldset" className={classes.formControl}>
        <Accordion className={classes.accordian}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Wellness</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={massage} onChange={handleChange} name="massage" />}
                label="Massage"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
              <FormControlLabel
                control={<Checkbox checked={spa} onChange={handleChange} name="spa" />}
                label="Spa"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
              <FormControlLabel
                control={<Checkbox checked={tcm} onChange={handleChange} name="tcm" />}
                label="TCM"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
              <FormControlLabel
                control={<Checkbox checked={foodReflexology} onChange={handleChange} name="foodReflexology" />}
                label="Food Reflexology"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />

            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordian}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>F&B</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={cafe} onChange={handleChange} name="cafe" />}
                label="Cafe"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
              <FormControlLabel
                control={<Checkbox checked={brunch} onChange={handleChange} name="brunch" />}
                label="Brunch"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
              <FormControlLabel
                control={<Checkbox checked={bar} onChange={handleChange} name="bar" />}
                label="Bar"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
              <FormControlLabel
                control={<Checkbox checked={restaurant} onChange={handleChange} name="restaurant" />}
                label="Restaurant"
                classes={{ label: classes.label, root: classes.controlHeight }}
              />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordian}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Beauty</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion className={classes.accordian}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Retail</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
            </FormGroup>
          </AccordionDetails>
        </Accordion>
      </FormControl>

      <FormLabel component="legend" className={classes.filterLabel}>Language</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={seoul} onChange={handleChange} name="English Friendly" />}
          label="English Friendly"
          classes={{ label: classes.label, root: classes.controlHeight }}
          style={{ marginBottom: "10px" }}
        />
      </FormGroup>
      <FormLabel component="legend" className={classes.filterLabel}>Location</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox checked={seoul} onChange={handleChange} name="seoul" />}
          label="Seoul"
          classes={{ label: classes.label, root: classes.controlHeight }}
        />
        <FormControlLabel
          control={<Checkbox checked={daegu} onChange={handleChange} name="daegu" />}
          label="Daegu"
          classes={{ label: classes.label, root: classes.controlHeight }}
        />
        <FormControlLabel
          control={<Checkbox checked={busan} onChange={handleChange} name="busan" />}
          label="Busan"
          classes={{ label: classes.label, root: classes.controlHeight }}
        />
        <FormControlLabel
          control={<Checkbox checked={jeju} onChange={handleChange} name="jeju" />}
          label="Jeju"
          classes={{ label: classes.label, root: classes.controlHeight }}
        />
        <FormControlLabel
          control={<Checkbox checked={incheon} onChange={handleChange} name="incheon" />}
          label="Incheon"
          classes={{ label: classes.label, root: classes.controlHeight }}
        />
      </FormGroup>

    </div>
  );

}
