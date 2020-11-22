import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  const AWS = require('aws-sdk')
  const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: 'ap-northeast-2'
  })
  const fileName = req.body.fileName;
  const fileType = req.body.fileType;
  const s3Params = {
    Bucket: 'naturre',
    Key: fileName,
    ContentType: fileType,
    ACL: 'public-read'
  }
  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      res.json({ success: false, error: err })
    }
    const returnData = {
      signedRequest: data,
      url: `https://naturre.s3.ap-northeast-2.amazonaws.com/${fileName}`
    }
    res.json({ success: true, data: { returnData } })
  })
});

export default handler;