const { MongoClient } = require('mongodb');
const debug = require('debug')('app:db');
const {
  dbUser,
  dbPassword,
  dbName,
  dbLocal,
  dbHost,
  dbPort,
} = require('../config');

const USER = encodeURIComponent(dbUser);
const PASSWORD = encodeURIComponent(dbPassword);
let mongoUri;

if (dbLocal) {
  mongoUri = dbLocal;
} else {
  mongoUri = `mongodb+srv://${USER}:${PASSWORD}@${dbHost}:${dbPort}/${dbName}?retryWrites=true&w=majority`;
}

class MongoLib {
  constructor() {
    this.client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    this.dbName = dbName;
  }

  connect() {
    if (!MongoLib.connection) {
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((err) => {
          if (err) {
            reject(err);
          }

          debug(`Connected succesfully to Mongo at ${mongoUri}`);
          resolve(this.client.db(this.dbName));
        });
      });
    }
    return MongoLib.connection;
  }

  async get(collection, query, options) {
    const db = await this.connect();
    return db.collection(collection).find(query, options).toArray();
  }

  async save(collection, data) {
    const db = await this.connect();
    return db.collection(collection).insertMany(data);
  }
}

module.exports = MongoLib;
