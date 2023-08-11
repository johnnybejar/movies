import colors from "colors";
import dotenv from "dotenv";
import mongodb, { MongoClient } from "mongodb";

dotenv.config();

const connectDB = async () => {
  try {
    if (process.env.MONGO_URI) {
      const URI = process.env.MONGO_URI;

      const client = new MongoClient(URI, {
        serverApi: {
          version: mongodb.ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });

      const db = await client.db("movies");

      console.log(colors.magenta.underline(`Connected to DB: ${db.namespace}`));

      return db;
    }
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

export default connectDB;
