import { ObjectId } from 'mongodb';
import nextConnect from 'next-connect';
import middleware from '../../../middleware/database';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
    const {email, password} = req.body
    const KEY = process.env.JWT_KEY;

    if (!email || !password) {
        return res.json({
            status: 'error',
            error:  'Please enter both email and password'
        })
    }

    let pw = pwEncode(password)
    const newUser = {
        email, pw, createdAt: new Date(), updatedAt: new Date(), permission: 'user'
    }

    let dbUser = await req.db.collection('Users').insertOne(newUser).catch(error => {
        console.err(error)
        res.json({status: 'error', error: 'database error'})
    })

    dbUser = dbUser.ops
    if (!dbUser) { 
        res.json({status: 'error', error: 'sign in fail'})
    } else {
        const payload = {
            email: dbUser[0].email,
            permission: dbUser[0].permission,
            createdAt: dbUser[0].createdAt,
        };
    
        let token = jwt.sign(payload, KEY, {expiresIn: 86400})
    
        res.json({status: 'success', token, email:dbUser[0].email, permission: dbUser[0].permission})
    }
   
});

function pwEncode(pw) {
    return bcrypt.hashSync(pw, bcrypt.genSaltSync(10));
}


export default handler;