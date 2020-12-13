import React, { useState, useEffect, useCallback } from 'react';
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
import axios from "axios";
// import { browserHistory } from 'react-router';
import { useDropzone } from 'react-dropzone'


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
  const [mainFile, setMainFile] = useState('')
  const [imageFiles, setImageFiles] = useState('')
  const [serviceName, setServiceName] = useState('')
  const [serviceDesc, setServiceDesc] = useState('')
  const [servicePrice, setServicePrice] = useState('')

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
  const handleServiceNameAdd = (val) => {
    setServiceName(val)
  }
  const handleServiceDescAdd = (val) => {
    setServiceDesc(val)
  }
  const handleServicePriceAdd = (val) => {
    setServicePrice(val)
  }
  let history = useHistory();

  const onDrop = useCallback(acceptedFiles => {
    console.log(acceptedFiles)
    setImageFiles(acceptedFiles)
    console.log(imageFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

  async function handleImageChange(e) {
    let file = (e.target.files[0])
    setMainFile(file)
  }

  async function uploadImage(file) {
    let fileParts = file.name.split('.');
    const fileName = fileParts[0];
    const fileType = fileParts[1];
    const res = await axios.post("http://localhost:3000/api/business-profile/upload-image", {
      fileName: fileName,
      fileType: fileType
    })
    const returnData = res.data.data.returnData;
    const signedRequest = returnData.signedRequest;
    await fetch(signedRequest, { method: "PUT", body: file })
  }

  async function handleSubmit(event) {
    event.preventDefault();
    await uploadImage(mainFile)
    const mainFileName = mainFile.name.split('.')[0];
    const mainImageURL = `https://naturre.s3.ap-northeast-2.amazonaws.com/business/${mainFileName}`
    const imageURLs = []
    await imageFiles.forEach((imageFile) => {
      uploadImage(imageFile)
      const fileName = imageFile.name.split('.')[0];
      const imageURL = `https://naturre.s3.ap-northeast-2.amazonaws.com/business/${fileName}`
      imageURLs.push(imageURL)
    })
    const services = [];
    services.push({ "name": serviceName, "description": serviceDesc, "price": servicePrice })
    const data = {
      name: name, description: description, location: location, category: category,
      mainImage: mainImageURL, images: imageURLs, services: services
    };
    let businessId = "";
    // let mainImgData = { id: '', img: '' }
    await fetch('http://localhost:3000/api/business-profile/create-business', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        businessId = data.data;
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    window.location.href = `/business-profile?id=${businessId}`;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: '500px', height: '600px', marginTop: "20px" }} >
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
              <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="location">Main Image:</label>
              <input type="file" onChange={handleImageChange} />
            </div>
            <div {...getRootProps()}>
              <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="location">Images:</label>
              <input {...getInputProps()} />
              {
                isDragActive ?
                  <p>Drop the files here ...</p> :
                  <p>Drop image files here...</p>
              }
            </div>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="location">Services:</label>
              <TextField onChange={e => handleServiceNameAdd(e.target.value)} style={{ width: "140px", left: 0, top: "10%" }} size="small" id="name1" label="Name" variant="outlined" />
              <TextField onChange={e => handleServicePriceAdd(e.target.value)} style={{ width: "80px", left: 0, top: "10%" }} size="small" id="price1" label="Price" variant="outlined" />
              <TextField onChange={e => handleServiceDescAdd(e.target.value)} style={{ width: "220px", left: 0, top: "10%" }} size="small" id="desc1" label="Description" variant="outlined" />

            </div>
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
                  <MenuItem value={"Beauty"}>Beauty</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Wellness"}>Wellness</MenuItem>
                  <MenuItem value={"Shopping"}>Shopping</MenuItem>
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