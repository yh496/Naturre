import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);


handler.get(async (req, res) => {

  let businessId = req.query.businessId 
  
  let reviewImagesDB = await req.db.collection('Reviews').find({businessId}).toArray().catch(err => {
    console.log("Err", err);
    return res.json({ succeed: false });
  })

  let reviewImagesFinal = []
  reviewImagesDB.map(item => {
      reviewImagesFinal = reviewImagesFinal.concat(item.images)
  })


  res.json({ success:true, reviewImages: reviewImagesFinal })
});

export default handler;