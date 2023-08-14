import colors from "colors";
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";

dotenv.config();

const URI = process.env.MONGO_URI || "";

const client = new MongoClient(URI, {
  serverApi: {
    version: mongodb.ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db: mongodb.Db;

const connectDB = async () => {
  if (db) {
    console.log(
      colors.magenta.underline(`Already connected to DB: ${db.namespace}`)
    );
    return db;
  }
  try {
    db = client.db("movies");

    console.log(colors.magenta.underline(`Connected to DB: ${db.namespace}`));

    return db;
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
