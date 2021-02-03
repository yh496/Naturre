import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import SearchBar from "material-ui-search-bar";
import FAQSection from '../BusinessProfile/FAQSection';
import {useRouter} from 'next/router';


const useStyles = makeStyles( (theme) => ({

  newFAQ: {
    display: 'flex',
    flexDirection: 'column',
    marginTop: 13,
    marginBottom: 30,
    width: '80%',
    marginRight: 'auto',
    marginLeft:'auto'
  },

  newQuestionField: {
    marginBottom: 7,
  },

  deleteButton: {
    backgroundColor: '#de5c5c',
    width: 90,
    marginTop: 7,
    fontSize: '8pt',
    height: 25
  }

}))


export default function AddFAQ (props) {

  const classes = useStyles()

  // const businessId = "5fccd7e8f8905189825b0ce1";
  // <FAQSection businessId={router.query.id}/>

  const [searchText, setSearchText] = useState("")
  const router = useRouter();
  const businessId = router.query.id

  const [comments, setComments] = useState([])
  const callApi = (businessId) => {
    fetch(`/api/business-profile/business-questions`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: businessId })

    }).then(e => e.json()).then(e =>
      setComments(e.data)
    )
  }

  const loadComments = () => {
    callApi("5fccd7e8f8905189825b0ce1")
  }

  const [faqList, setFAQList] = useState([{"question":"", "answer":"", "show": true}])
  const addNewFAQ = () => {
    setFAQList(faqList.concat({"question":"", "answer":"", "show": true}))
  }
  const handleFAQListChange = (index, type, val) => {
    const tempFAQList = faqList
    faqList[index][type] = val
    setFAQList(tempFAQList)
    console.log(tempFAQList)
  }
  const removeItem = (index) => {
    const tempFAQList = faqList
    tempFAQList.splice(index, 1)
    setFAQList(tempFAQList)
    console.log(tempFAQList)
  }



  return (
    <div>
      <Card>
        <CardContent style = {{width: '70%', marginRight: 'auto', marginLeft: 'auto'}}>
          <Typography variant="h1" style={{marginTop: 10}}>Edit FAQ Section</Typography>
          <SearchBar placeholder="Search business name"
            value={searchText}
            onChange={(val) => setSearchText(val)}
            onCancelSearch = {() => setSearchText("")}
            onRequestSearch = {() => loadComments()}
          />
          <form>
            <div style={{marginTop: 10, textAlign: 'right'}}>
              <Button onClick={() => addNewFAQ()} style={{fontSize: "18pt", height: 30, backgroundColor: '#40bfb0', paddingTop: 2 }} >+</Button>
              {faqList.map((val, i) => (
                <div className={classes.newFAQ}>
                
                  <TextField className={classes.newQuestionField} size='small' onChange={e => handleFAQListChange(i, "question", e.target.value)}  id="question1" label="Question" variant="outlined" multiline rowsMax={2} />
                  <TextField onChange={e => handleFAQListChange(i, "answer", e.target.value)} id="answer1" label="Answer" variant="outlined" multiline rowsMax={6}/>
                  <Button variant="contained" startIcon={<DeleteIcon />} className={classes.deleteButton} onClick={() => removeItem(i)}>Delete</Button>
                </div>
              ))}
              <Button type="submit" style={{fontSize: "10pt", height: 23, backgroundColor: '#40bfb0'}}>Submit</Button>
            </div>

          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// {comments.map((val, i) => (
//   <Paper>
//     <div>
//       <TextField style={{ fontWeight: 700, fontSize: '15px' }}> {val.title} </TextField>
//       <TextField> {val.content} </TextField>
//     </div>
//   </Paper>
//
// ))}
