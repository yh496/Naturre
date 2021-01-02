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
        res.json({
            status: 'error',
            error:  'Please enter both email and password'
        })
    }
    

    const dbUser = await req.db.collection('Users').find({email}).toArray().catch(error => {
        console.err(error)
        res.json({status: 'error', error: 'database error'})
    })


    if (dbUser.length == 0) {
        res.json({status: 'error', error: 'user does not exist'})
    } else if (!bcrypt.compareSync(password, dbUser[0].pw)) {
        res.json({status: 'error', error: 'Incorrect password!'})
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

export default handler;