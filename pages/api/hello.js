import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

  const businessObject = { 
    type: 'salon',
    name: 'ang'

  }

  let doc = await req.db.collection('Business').insertOne({businessObject}).catch(err => {
    console.log("Err", err);
    return res.json({succeed: false, data: null, message: err.stack || err});

  })
  return res.json({ success: true, data: update})
});

export default handler;