import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import axios from 'axios'

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    let response = await axios.post(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.query.loc}&key=${process.env.GOOGLE_API_KEY}`)
    let geocode = response.data.results[0].geometry.location
    res.json({geocode})
});

export default handler;