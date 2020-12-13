import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);


handler.get(async (req, res) => {

  let find_by = req.query.find_by || "Food"
  let query = {
    "$text": {"$search" : find_by}
   }  
  
  console.log("see query", query)


  let business = await req.db.collection('Business').find(query).toArray().catch(err => {
    console.log("Err", err);
    return res.json({ succeed: false, data: null, message: err.stack || err });
  })

  let businessCount = await req.db.collection('Business').find(query).count()

  return res.json({ success: true, data: business, count: businessCount })
});

export default handler;