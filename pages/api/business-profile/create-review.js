import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const rating = req.body.rating;
  const businessId = req.body.businessId;
  const insertObject = {
    title, content, rating, businessId
  }
  let review = await req.db.collection('Reviews').insertOne({ ...insertObject }).catch(err => {
    console.log("Err", err);
    return res.json({ succeed: false, data: null, message: err.stack || err });
  })
  return res.json({ success: true, data: insertObject })

});

export default handler;