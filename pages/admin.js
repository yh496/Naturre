import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useHistory } from "react-router-dom";
// import { browserHistory } from 'react-router';
const useStyles = makeStyles({
  root: {
    width: "300",
    maxWidth: "400"
  }
});


export default function Admin(props) {
  const classes = useStyles();
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [category, setCategory] = useState('')

  const handleNameChange = (val) => {
    setName(val)
  }
  const handleDescriptionChange = (val) => {
    setDescription(val)
  }
  const handleLocationChange = (val) => {
    setLocation(val)
  }
  const handleCategoryChange = (val) => {
    setCategory(val)
  }
  let history = useHistory();



  function handleSubmit(event) {
    event.preventDefault();
    const data = { name: name, description: description, location: location, category: category };
    fetch('http://localhost:3000/api/business-profile/create-business', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    // browserHistory.push('/business-profile-list');
    // history.push('/business-profile-list');
    window.location.href = "/business-profile-list";
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: '500px', height: '500px', marginTop: "20px" }} >
        <h2 style={{ textAlign: "center" }}>Add a New Business</h2>

        <CardContent style={{ position: "relative", margin: "auto", width: "300px" }}>
          <form onSubmit={handleSubmit}>
            <div style={{ width: "200px" }}>
              <label style={{ position: "absolute", left: "5%", top: 0, textAlign: "left", fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="name">Business Name:</label>
              <TextField onChange={e => handleNameChange(e.target.value)} style={{ width: "200px", left: 0, top: "10%" }} size="small" id="name" label="Enter business name" variant="outlined" />
            </div>
            <br />
            <div>
              <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="description">Decription:</label>
              <TextField
                onChange={e => handleDescriptionChange(e.target.value)}
                multiline rows={2}
                style={{ width: "300px" }} id="description" label="Enter business description" variant="outlined" />
            </div>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="location">Location:</label>
              <TextField
                onChange={e => handleLocationChange(e.target.value)}
                multiline rows={1}
                style={{ width: "300px" }} size="small" id="location" label="Enter business location" variant="outlined" />
            </div>
            <br />
            <div>
              <FormControl style={{ width: "100px" }} className={classes.formControl}>
                <InputLabel style={{ fontSize: "14px", fontWeight: "bold" }} shrink id="demo-simple-select-placeholder-label-label">
                  Category
                </InputLabel>
                <Select
                  labelId="demo-simple-select-placeholder-label-label"
                  id="demo-simple-select-placeholder-label"
                  // value={age}
                  // onChange={handleChange}
                  displayEmpty
                  className={classes.selectEmpty}
                  onChange={e => handleCategoryChange(e.target.value)}
                >
                  <MenuItem value={"beauty"}>Beauty</MenuItem>
                  <MenuItem value={"food"}>Food</MenuItem>
                  <MenuItem value={"wellness"}>Wellness</MenuItem>
                  <MenuItem value={"shopping"}>Shopping</MenuItem>
                </Select>
              </FormControl>
            </div>
            <input style={{ position: "absolute", left: "40%" }} type="submit" value="Submit" />
          </form>
        </CardContent>
      </ Card>
    </div >
  );
}