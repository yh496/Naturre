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
import Dropzone from 'react-dropzone'


const useStyles = makeStyles({
  root: {
    width: "300",
    maxWidth: "400"
  }
});


export default function AddBusiness(props) {
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
  const [imagePreviewURLs, setImagePreviewURLs] = useState([])
  const [serviceList, setServiceList] = useState([{ "name": "", "description": "", "price": "" }])
  const [selectedImageIndex, setSelectedImageIndex] = useState('')

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

  // const onDrop = useCallback(acceptedFiles => {
  //   console.log(acceptedFiles)
  //   setImageFiles(acceptedFiles)
  //   console.log(imageFiles)
  //   console.log(acceptedFiles[0].preview)

  // }, [])

  const appendFileUrl = (file, callback) => {
    const myFileItemReader = new FileReader()
    myFileItemReader.addEventListener("load", () => {
      callback(myFileItemReader.result)
    })
    myFileItemReader.readAsDataURL(file)

  }
  const onDrop = (files) => {
    setImageFiles(files)
    const myFileItemReader = new FileReader()
    // myFileItemReader.addEventListener("load", () => {
    //   imageURLs.push(myFileItemReader.result)
    // })
    // myFileItemReader.readAsDataURL(files[0])


    const imageURLs = []

    files.forEach((file) => {
      appendFileUrl(file, function (result) {
        imageURLs.push(result)
        if (files.length === imageURLs.length) {
          setImagePreviewURLs(imageURLs)
        }
      })
    })

  }

  const handleImageSelect = (index) => {
    setMainFile(imageFiles[index])
    setSelectedImageIndex(index)
  }

  const addNewService = () => {
    setServiceList(serviceList.concat({ "name": "", "description": "", "price": "" }))
  }

  const handleServiceListChange = (index, type, val) => {
    const tempServiceList = serviceList
    serviceList[index][type] = val
    setServiceList(tempServiceList)
    console.log(tempServiceList)
  }

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
    const res = await axios.get("http://localhost:3000/api/map/geocode", { params: { loc: location } })
    const lat = res.data.geocode.lat
    const lng = res.data.geocode.lng
    const locationObject = { "type": "Point", "coordinates": [lng, lat], "lat": lat, "lng": lng, "address": location }
    console.log(locationObject)
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
    const manager = {
      name: "Peter Huh",
      role: "Head Chef",
      description: "I have 8+ years of experience as a head chef. Super pan introduces Asian menus with a Western twist."
    }
    const data = {
      name: name, description: description, location: locationObject, category: category,
      mainImage: mainImageURL, images: imageURLs, services: serviceList, manager: manager
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
    console.log(businessId)
    window.location.href = `/business-profile?id=${businessId}`;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Card style={{ width: '90%', marginTop: "20px", marginBottom: "20px" }} >
        <CardContent style={{ marginLeft: "15px", paddingTop: "20px", paddingBottom: "60px" }}>
          <h1 style={{ fontSize: "30px", marginBottom: "30px" }}>Add a New Business</h1>
          <h1>1. Business Metadata</h1>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "flex", justifyContent: "start", marginBottom: "10px" }}>
              <div style={{ marginRight: "100px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto", marginBottom: "10px" }} for="name">Business Name:</label>
                <TextField onChange={e => handleNameChange(e.target.value)} style={{ width: "300px" }} size="small" id="name" label="Enter business name" variant="outlined" />
              </div>
              <div>
                <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto", marginBottom: "10px" }} for="location">Location:</label>
                <TextField
                  onChange={e => handleLocationChange(e.target.value)}
                  multiline rows={1}
                  style={{ width: "400px" }} size="small" id="location" label="Enter business location" variant="outlined" />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "start" }}>
              <div style={{ marginRight: "100px" }}>
                <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto", marginBottom: "10px" }} for="description">Decription:</label>
                <TextField
                  onChange={e => handleDescriptionChange(e.target.value)}
                  multiline rows={3}
                  style={{ width: "500px" }} id="description" label="Enter business description" variant="outlined" />
              </div>
              {/* <div> */}
              <FormControl variant="outlined" style={{ width: "150px" }} >

                <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", marginBottom: "10px" }} for="category">Category:</label>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={e => handleCategoryChange(e.target.value)}
                >
                  <MenuItem value={"Beauty"}>Beauty</MenuItem>
                  <MenuItem value={"Food"}>Food</MenuItem>
                  <MenuItem value={"Wellness"}>Wellness</MenuItem>
                  <MenuItem value={"Shopping"}>Shopping</MenuItem>
                </Select>
              </FormControl>
              {/* </div> */}
            </div>
            <br />
            <h1>2. Images</h1>


            <Dropzone onDrop={onDrop}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
              Click me to upload a file!
                </div>
              )}
            </Dropzone>
            {imagePreviewURLs.map((val, i) => (
              (i === selectedImageIndex) ?
                <img src={val} width="60px" height="60px" style={{ marginRight: "10px", border: "2px", borderStyle: "solid", borderColor: "#44F8DF" }} onClick={() => handleImageSelect(i)} />
                :
                <img src={val} width="60px" height="60px" style={{ marginRight: "10px", }} onClick={() => handleImageSelect(i)} />

            ))}
            <h1>3. Services</h1>
            <div>
              <label style={{ fontSize: "14px", fontWeight: "bold", display: "block", margin: "auto" }} for="location">Services:</label>
              {serviceList.map((val, i) => (
                <div>
                  <TextField onChange={e => handleServiceListChange(i, "name", e.target.value)} style={{ width: "140px", left: 0, top: "10%" }} size="small" id="name1" label="Name" variant="outlined" />
                  <TextField onChange={e => handleServiceListChange(i, "price", e.target.value)} style={{ width: "80px", left: 0, top: "10%" }} size="small" id="price1" label="Price" variant="outlined" />
                  <TextField onChange={e => handleServiceListChange(i, "description", e.target.value)} style={{ width: "220px", left: 0, top: "10%" }} size="small" id="desc1" label="Description" variant="outlined" />
                </div>
              ))}
              <button type="button" onClick={() => addNewService()}>Add</button>
            </div>
            <input style={{ position: "absolute", left: "40%" }} type="submit" value="Submit" />
          </form>
        </CardContent>
      </ Card>
    </div >
  );
}