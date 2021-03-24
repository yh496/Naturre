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
  const bizId = "5fccd7e8f8905189825b0ce1"

  // const [bizId, setBizId] = useState('')
  const handleBizIdChange = (val) => {
    // setBizId(val)
  }

  const [comments, setComments] = useState([])
  const callApi = (bizId) => {
    fetch(`/api/business-profile/business-questions`, {
      method: 'POST',
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify({ id: bizId })

    }).then(e => e.json()).then(e =>
      setComments(e.data)
    )
  }

  useEffect(() => {
    callApi(bizId)
  }, '')

  const loadComments = () => {
    callApi(bizId)
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
    // const tempFAQList = faqList
    // tempFAQList.splice(index, 1)
    // setFAQList(tempFAQList)
    // console.log(tempFAQList)

// diff version
    // setFAQList(faqList => {
    //   const tempFAQList = faqList.filter((item, j) => index !== j);
    //
    //   return {
    //     tempFAQList,
    //   };
    // });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    // const faqs = []
    // await faqList.forEach((faq) => {
    //   const question = faq.question;
    //   const answer = faq.answer;

    const data = {
      businessId: bizId, faqs: faqList
    };

    await fetch('http://localhost:3000/api/business-profile/business-questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        consol.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error)
      });
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
              <div style={{display: 'block', marginBottom: '15px', marginTop: '15px', textAlign: 'left'}}>
                <label for="businessId" style={{fontSize: '13pt', marginRight: '10px', display: 'inline-block', paddingTop: '8px'}}>Business ID:</label>
                <TextField id="businessId" onChange={e => handleBizIdChange(e.target.value)} style={{width: '60%', marginRight: '10px'}} size="small" label="Enter business ID" variant="outlined" />
                <Button onClick={() => loadComments()} style={{ height: 30, backgroundColor: '#40bfb0', paddingTop: '5px' }} >load</Button>
              </div>
              {comments.map((val, i) => (
                <Paper>
                  <div>
                    <Typography variant="h4" style={{ fontWeight: 700, fontSize: '15px' }}> {val.title} </Typography>
                    <Typography variant="p"> {val.content} </Typography>
                  </div>
                </Paper>
              ))}
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
