import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  
    const businessId = req.body.id

    let business = await req.db.collection('Business').findOne({'_id': ObjectId(businessId)}).catch(err => {
        console.log("Err", err);
        return res.json({succeed: false, data: null, message: err.stack || err});
    })

    let reviews = await req.db.collection('Reviews').find({'businessId': businessId}).toArray().catch(err => {
      console.log("Err", err);
      return res.json({succeed: false, data: null, message: err.stack || err});
  })

    console.log('reviews', reviews)

  return res.json({ success: true, data: business, reviews: reviews})
});

export default handler;