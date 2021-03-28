import React, {useEffect ,useState} from 'react'
import RatingAndPhotos from "../components/Reviews/RatingAndPhotos";
import ReviewContext from "../components/Contexts/ReviewContext";
import {useRouter} from 'next/router';
import {makeStyles} from "@material-ui/core/styles";
import {
    Typography,
    Divider,
    Button
} from "@material-ui/core"

import ReviewCard from "../components/Reviews/ReviewCard"
import SearchIcon from "@material-ui/icons/Search";
import ReviewUploadForm from "../components/Reviews/ReviewUploadForm";
import BusinessProfileContext from "../components/Contexts/BusinessProfileContext";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: '3rem',
        margin: 'auto',
        width: '80%',
        height: '210px',
    },
    review_title: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '93%'
    },
    review_head: {
        marginBottom: '2rem'
    },
    text: {
        fontSize: '36px', 
        marginBottom: '3rem',
        fontWeight: '520'
    },
    button: {
        padding: '20px',
        height: '40px',
        background: '#64B6AC',
        borderRadius: '22px',
        color: '#FFFFFF',
        fontWeight: '600'
    },
    divider: {
        marginTop: '2rem',
    },
    searchBox: {
        position: 'relative',
        width: '100%',
        height: '60px',
        borderRadius: "24px",
        padding: '1rem',
        boxSizing: 'border-box',
        border: '1px solid #8692A6',
        outline: 'none',
        '&::placeholder': {
            color: '#8692A6',
            fontSize: '18px'
        }
}

}))


const Reviews = () => {
    const router = useRouter()

    const [businessName, setBusinessName] = useState("")

    useEffect(() => {
        (async function initializeReviews () {
            await ReviewContext.initialize(router.query.id, 2)
            ReviewContext.renderReviewStat();
            ReviewContext.renderReviewImages();
            ReviewContext.renderReviewContents();
        })();
    },[])

    useEffect( () => {
        (async function initializeBusinessProfileContext() {
            let context = await BusinessProfileContext.initializeBusinessProfile(router.query.id);
            setBusinessName(context.name);
        })()
    }, [])

    const [open, setOpen] = useState(false)

    const handlePopupClose = () => {
        setOpen(false)
    }

    const classes= useStyles();
    return (
        <div className={classes.root}>
            <div className={classes.review_head}>
                <div className={classes.review_title}>
                    <Typography className={classes.text}> Customer Reviews </Typography>
                    <Button
                        className={classes.button}
                        onClick={() => setOpen(true)}>
                        Write a review
                    </Button>
                </div>
                <RatingAndPhotos/>
                <Divider className={classes.divider}/>
            </div>
            <div style={{position: 'relative', marginBottom: '10rem', width: '93%'}}>
                <input placeholder="Search reviews" className={classes.searchBox}/>
                <SearchIcon style={{transform:'scale(1.5)', position:'absolute', right: '25px', top: '20px', color: '#DADADA'}}/>
            </div>
            <div style={{width: '93%'}}>
                <ReviewCard />
            </div>
            <ReviewUploadForm
                open={open}
                handlePopupClose ={handlePopupClose}
                businessName = {businessName}
            />

        </div>
    )

}

export default Reviews;