import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {


  let business = await req.db.collection('Business').find({category: req.query.type}).toArray().catch(err => {
    console.log("Err", err);
    return res.json({ succeed: false, data: null, message: err.stack || err });
  })

  let businessCount = await req.db.collection('Business').find({category: req.query.type}).count()

  return res.json({ success: true, data: business, count: businessCount })
});

export default handler;