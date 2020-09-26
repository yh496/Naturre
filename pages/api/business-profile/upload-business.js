import { FormatAlignLeftSharp } from '@material-ui/icons';
import nextConnect from 'next-connect';
import middleware from '../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.get(async (req, res) => {
    return res.json({ success: true, data: "hi" })

    //     const businessType = req.body.type;
    //     const name = req.body.name;
    //     const mainImage = req.body.img;
    //     const contactInfo = req.body.contactInfo;
    //     const description = req.body.description;

    //     const services = req.body.services

    //     let serviceIds = []
    //     for (let i = 0; i <= services.length; i ++) {
    //         let serviceId = await req.db.collection('Services').insertOne({...services[i]}).catch(err => {
    //             console.log("Err", err)
    //             return res.json({succeed: false, data: null, message: err.stack || err});
    //         })
    //         serviceIds.push(serviceId._id)
    //     }

    //     const insertObject = {
    //         businessType, name, mainImage, contactInfo, description, serviceIds
    //     }

    //     let business = await req.db.collection('Business').insertOne({...insertObject}).catch(err => {
    //         console.log("Err", err);
    //         return res.json({succeed: false, data: null, message: err.stack || err});
    //     })


    //   return res.json({ success: true, data: business})
});

export default handler;