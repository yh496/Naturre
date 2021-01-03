import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) =>{

    let topview = await req.db.collection('Business').find().sort({viewCount: -1}).limit(10).toArray().catch(e => {
        console.error(e);
        res.json({msg:'failed to fetch'})
    })

    const shuffled = topview.sort(() => 0.5 - Math.random());
    let selected = shuffled.slice(0, 4);

    res.json({selected})
});

export default handler;