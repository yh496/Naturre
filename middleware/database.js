import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';

const client = new MongoClient('mongodb+srv://mongodb+srv://bbonggu:pc06191122@cluster0.o5tqp.mongodb.net/naturre?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });


async function database(req, res, next) {
    if (!client.isConnected()) await client.connect();
    req.dbClient = client;
    req.db = client.db('naturre');
    return next();
  }
  
const middleware = nextConnect();

middleware.use(database);

export default middleware;

