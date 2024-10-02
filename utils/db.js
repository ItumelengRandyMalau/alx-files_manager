// utils/db.js
import { MongoClient, ObjectId } from 'mongodb';
import crypto from 'crypto';

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 27017;
const DB_DATABASE = process.env.DB_DATABASE || 'files_manager';
const url = `mongodb://${DB_HOST}:${DB_PORT}`;

/* class for performing mongo operation */
class DBClient {
  constructor() {
    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect()
      .then(() => {
        this.db = this.client.db(DB_DATABASE);
        this.usersCollection = this.db.collection('users');
        this.filesCollection = this.db.collection('files');
      })
      .catch((err) => {
        console.error(err.message);
        this.db = false;
      });
  }

  isAlive() {
    return Boolean(this.db);
  }

  async nbUsers() {
    return this.usersCollection.countDocuments();
  }

  async nbFiles() {
    return this.filesCollection.countDocuments();
  }

  async createUser(email, password) {
    const existingUser = await this.usersCollection.findOne({ email });
    if (existingUser) {
      throw new Error('Already exist');
    }
    const hashedPassword = crypto.createHash('sha1').update(password).digest('hex');
    const result = await this.usersCollection.insertOne({ email, password: hashedPassword });
    return { id: result.insertedId, email };
  }

  async findUser(email) {
    return this.usersCollection.findOne({ email });
  }

  async getUserByEmailAndPassword(email, hashedPassword) {
    return this.usersCollection.findOne({ email, password: hashedPassword });
  }

  async getUserById(id) {
    return this.usersCollection.findOne({ _id: new ObjectId(id) });
  }
}

const dbClient = new DBClient();
export default dbClient;
