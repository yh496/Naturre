import {createQueryParams} from '../../lib/utils';

const ReviewContext = {
    reviewImageList: [],
    reviewStats: {
        totalCount: 0,
        average: 0,
        countPerRating: []
    },
    reviewContents: []
}

const fetchReviewStats = async (businessId) => {
    let res = await fetch('/api/business-profile/review-stats', {
       method: 'POST',
       headers: {"Content-Type": "application/json; charset=utf-8"},
       body: JSON.stringify({id: businessId})
   })
    let resJson = await res.json()
    const tempList = []
    for (let i = 1; i < 6; i++) {
        let tempObj = {}
        tempObj[i] = resJson.ratings && resJson.ratings[i] || 0
        tempList.push(tempObj)
    }
    ReviewContext.reviewStats.totalCount =  resJson.ratings && resJson.ratings.count || 0
    ReviewContext.reviewStats.average =  resJson.ratings && parseFloat(resJson.ratings.average).toFixed(1) || 0
    ReviewContext.reviewStats.countPerRating =  tempList
}

const fetchReviewContents = async ({businessId, limit}) => {
    let res = await fetch(`/api/business-profile/business-reviews`, {
        method: 'POST',
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ id: businessId, limit: limit })

    })
    let resJson = await res.json();
    ReviewContext.reviewContents = resJson.data
}

const fetchReviewImageList = async (businessId) => {
    const params = {businessId}
    const query = createQueryParams(params);

    let res = await fetch(`/api/business-profile/review-images?` + query, {
        method: 'GET',
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    let resJson = await res.json();
    ReviewContext.reviewImageList = resJson.reviewImages
}   


const initialize = async (businessId, limit) => {
    await fetchReviewContents({businessId,limit})
    await fetchReviewStats(businessId)
    await fetchReviewImageList(businessId)
}

const getReviewContext = () => {
    return ReviewContext
}

const setReviewContext = (field, val) => {
    ReviewContext[field] = val
}

const render = () => {}


export default {initialize, getReviewContext, setReviewContext, render}