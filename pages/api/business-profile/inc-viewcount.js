import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {

    const businessId = req.body.id

    try {
        await req.db.collection('Business').update({'_id': ObjectId(businessId)},{$inc: {viewCount: 1}})
    } catch {
        res.json({success:false})
    }

    return res.json({ success: true})
});

export default handler;