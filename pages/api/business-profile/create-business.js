import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {


  const businessType = req.body.type;
  const name = req.body.name;
  const mainImage = req.body.img;
  const contactInfo = req.body.contactInfo;
  const description = req.body.description;
  const location = req.body.location;
  const services = req.body.services;

  const insertObject = {
    businessType, name, mainImage, contactInfo, description, location, services
  }
  let business = await req.db.collection('Business').insertOne({ ...insertObject }).catch(err => {
    console.log("Err", err);
    return res.json({ succeed: false, data: null, message: err.stack || err });
  })

  return res.json({ success: true, data: insertObject })
});

export default handler;