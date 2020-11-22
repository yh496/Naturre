import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.put(async (req, res) => {
  const ObjectID = require('mongodb').ObjectID;

  const id = req.body.id;
  if (req.body.img != null) {
    const mainImage = req.body.img;
    const insertObject = { mainImage }
    let business = await req.db.collection('Business').updateOne(
      { _id: new ObjectID(id) },
      { $set: { mainImage: mainImage } },
      { upsert: true }
    )
      .catch((err) => {
        console.log("Err", err);
        return res.json({ succeed: false, data: null, message: err.stack || err });
      })
    return res.json({ success: true })
  }

});

export default handler;