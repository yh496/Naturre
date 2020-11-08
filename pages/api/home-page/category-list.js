import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) =>{ 

  let categories = await req.db.collection('Categories').find({}).toArray().catch(e => {
      console.error(e);
      res.json({msg:'failed to fetch'})
  })



  res.json({categories})
});

export default handler;