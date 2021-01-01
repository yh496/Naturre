import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  
    const businessId = req.body.id
    const limit = req.body.limit
    console.log('limit', limit)

    let reviews = await req.db.collection('Reviews').find({'businessId': businessId}).limit(limit).toArray().catch(err => {
      console.log("Err", err);
      return res.json({succeed: false, data: null, message: err.stack || err});
  })

  return res.json({ success: true, data: reviews})
});

export default handler;