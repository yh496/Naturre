import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import axios from 'axios'

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const bottomLeft = req.body.bottomLeft
    const upperRight = req.body.upperRight

    const find_by = req.body.find_by
    let count = req.body.count

    let query = {
        "$text": {"$search" : find_by}
    } 
    if (bottomLeft.length > 0 && upperRight.length > 0) {
        query.location = { "$geoWithin": { "$box": [bottomLeft, upperRight] } }
        
    }
  
    let business_in_range = await req.db.collection('Business').find(query).toArray().catch(e => {
        console.log(e)
    })

    if (!count) count = await req.db.collection('Business').find(query).count()


    res.json({list: business_in_range, count: count})


});

export default handler;