import {createQueryParams} from '../../lib/utils';

const ReviewContext = {
    reviewImages: [],
    reviewStats: {
        totalCount: 0,
        average: 0,
        countPerRating: []
    },
    reviewContents: [],
    imageSkipCount: 0
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

const fetchReviewImages = async (businessId) => {
    const params = {businessId, skipCount: ReviewContext.imageSkipCount}
    const query = createQueryParams(params);

    let res = await fetch(`/api/business-profile/review-images?` + query, {
        method: 'GET',
        headers: { "Content-Type": "application/json; charset=utf-8" },
    })
    let resJson = await res.json();
    ReviewContext.reviewImages = resJson.reviewImages
}   


const initialize = async (businessId, limit) => {
    await fetchReviewContents({businessId,limit})
    await fetchReviewStats(businessId)
    await fetchReviewImages(businessId)
}

const getReviewContext = () => {
    return ReviewContext
}

const setReviewContext = (field, val) => {
    ReviewContext[field] = val
}

const renderReviewStat = () => {}
const renderReviewContents = () => {}
const renderReviewImages = () => {}



export default {
    initialize,
    getReviewContext,
    setReviewContext,
    renderReviewStat,
    renderReviewContents,
    renderReviewImages,
    fetchReviewImages,
}