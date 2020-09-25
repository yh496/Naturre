import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  
    const businessId = req.body.id
    //total count, average rating, number of rating for each stars
    let countAndAverage = await req.db.collection('Reviews').aggregate([
        {$match: {
            'businessId' : '5f66f686f6dddb007ba26307'}},
        {
          $group:
            {
              _id: "null",
              count: {$sum: 1},
              average: { $avg: "$rating"}
            }
        }
      ]
    ).toArray()

    let countPerRating = await req.db.collection('Reviews').aggregate([
        {$match: {
            'businessId' : '5f66f686f6dddb007ba26307'}},
        {
          $group:
            {
              _id: "$rating",
              count: {$sum: 1},
            }
        }
      ]
        ).toArray();

    let returnObj = [
        {_id: 1, count: 0},
        {_id: 2, count: 0},
        {_id: 3, count: 0},
        {_id: 4, count: 0},
        {_id: 5, count: 0}
    ]

    const _idList = countPerRating.map(e => e._id)

    for (let i = 0; i < returnObj.length; i++) {
       if (_idList.indexOf(returnObj[i]._id) === -1) {
           countPerRating.push(returnObj[i])
       }
    }

    countPerRating.sort((a,b) => (a._id > b._id) ?  -1 : 1)

    console.log("countPerRating", countPerRating)

  return res.json({ success: true, totalCount: countAndAverage[0].count, average: countAndAverage[0].average, countPerRating})
});

export default handler;