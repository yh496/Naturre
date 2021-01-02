import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    //TODO
    const businessId = req.body.id
    //total count, average rating, number of rating for each star
    const ratings = await req.db.collection('Reviews').aggregate([
      {$match: {'businessId' : businessId}},
      {$group:
          {
            _id: "$name",
            "count" : {$sum : 1},
            "average": {$avg: "$rating"},
            "5" :{
                "$sum": {
                  "$cond": [ { "$eq": [ "$rating", 5 ] }, 1, 0 ]
                    }
                },
            "4" :{
                "$sum": {
                  "$cond": [ { "$eq": [ "$rating", 4 ] }, 1, 0 ]
                  }
              },
            "3" :{
                "$sum": {
                    "$cond": [ { "$eq": [ "$rating", 3 ] }, 1, 0 ]
                  }
              },
            "2" :{
                "$sum": {
                    "$cond": [ { "$eq": [ "$rating", 2 ] }, 1, 0 ]
                  }
                },
            "1" :{
                "$sum": {
                    "$cond": [ { "$eq": [ "$rating", 1 ] }, 1, 0 ]
                  }
               }
      }}
    ]).toArray()

  return res.json({ success: true, ratings: ratings[0] })
});

export default handler;