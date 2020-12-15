import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import axios from 'axios'

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    console.log(req.body)
    const bottomLeft = req.body.bottomLeft
    const upperRight = req.body.upperRight

    console.log(bottomLeft,upperRight)

    let business_in_range = await req.db.collection('Business').find( { location: { $geoWithin: { $box: [bottomLeft, upperRight] } } } ).toArray().catch(e => {
        console.log(e)
    })

    console.log('businessed', business_in_range)


    res.json({list: business_in_range})


});

export default handler;