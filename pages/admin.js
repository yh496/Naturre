import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';
import AddBusiness from '../components/Admin/AddBusiness';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    // maxWidth: 500,
  },
});

export default function Admin2(props) {

  const classes = useStyles();
  const [tabValue, setTabValue] = React.useState(0)

  const handleTabChange = (event, newVal) => {
    setTabValue(newVal)
  }

  return (
    <div>
      <Paper square className={classes.root}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          indicatorColor="secondary"
          textColor="secondary"
          aria-label="icon label tabs example"
        >
          <Tab icon={<AddCircleIcon />} label="ADD BUSINESS" />
          <Tab icon={<EditIcon />} label="EDIT BUSINESS" />
          <Tab icon={<EditIcon />} label="EDIT REVIEWS" />
          <Tab icon={<EditIcon />} label="EDIT FAQs" />
          <Tab icon={<PersonPinIcon />} label="MANAGE USERS" />

        </Tabs>
      </Paper>
      <div style={{
        backgroundColor: "#F8F8F8"
      }}>
        {/* {tabValue === 0 ? <p>hi</p> : null} */}
        {tabValue === 0 ? <AddBusiness /> : null}
      </div>
    </div>
  )
}