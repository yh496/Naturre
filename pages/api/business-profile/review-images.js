import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);


handler.get(async (req, res) => {

  let businessId = req.query.businessId
  let skipCount = parseInt(req.query.skipCount) || 0

  let reviewImages = await req.db.collection('ReviewImages').find({businessId}).skip(skipCount).limit(3).toArray().catch(err => {
    console.log("Err", err);
    return res.json({ succeed: false });
  })

  res.json({ success:true, reviewImages: reviewImages })
});

export default handler;