import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

  const businessId = req.body.id
  const service = req.body.service;
  const query = { "id": businessId };
  const update = {
    "$push": {
      "services": service
    }
  }
  let updatedDocument = await req.db.collection('Business').findOneAndUpdate(query, update)

  console.log(updatedDocument, "helloooooooooooo")


  res.json({ msg: 'success!!!' })
});

export default handler;