import mongoose, { MongooseError } from "mongoose";
import { config } from ".";

export async function connectMongoDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.MONGO_DB_URI}${config.DB_NAME}`
    );

    console.log(
      "Mongo DB connected at host : ",
      connectionInstance.connection.host
    );
  } catch (error) {
    if (error instanceof MongooseError) {
      console.error("Error", error.message);
    } else {
      console.error("Error", error);
    }
    process.exit(1);
  }
}
