import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import md5 from 'md5'
const handler = nextConnect();
import formidable from 'formidable-serverless';
const fs = require('fs');


const AWS = require('aws-sdk')
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
  region: 'ap-northeast-2'
})

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadToS3 = async (file, fields) => {
    const now = new Date()
    const fileExtension = file.name.split('.').pop()
    const params = {
        Bucket: 'naturre',
        Key: `business/${fields.businessId}/${md5(file.name + now)}.${fileExtension}`,
        ContentType: file.type,
        ACL: 'public-read',
        Body: fs.createReadStream(file.path)
    }

    await s3.putObject(params).promise()
    return `https://naturre.s3.ap-northeast-2.amazonaws.com/business/${fields.businessId}/${md5(file.name + now)}.${fileExtension}`
    
}

export default async (req, res) => {
  const form = new formidable.IncomingForm();
  form.multiples = true;

  form.parse(req,  async (err, fields, files) => {
      console.log('length of files', files.files.length)
      const s3Sources = []
      if (files.files.length > 0) {
          for (let i = 0; i < files.files.length; i++) {
              let s3Source = await uploadToS3(files.files[i], fields);
              s3Sources.push(s3Source)
          }
      } else {
          let s3Source = await uploadToS3(files.files, fields);
          s3Sources.push(s3Source)
      }

      res.json({s3Sources: s3Sources})
  });
};
