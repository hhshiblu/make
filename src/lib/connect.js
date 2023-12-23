import { MongoClient, Db, ServerApiVersion } from "mongodb";

let db;
/**
 * @returns {Promise<Db>} - Returns a promise that resolves to the database
 */
const connectToDB = async () => {
  if (!db) {
    const client = new MongoClient(process.env.DATABASE_URL, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });
    db = client.db("raj");
  }

  return db;
};

export default connectToDB;
