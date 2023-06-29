import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = (process.env.NODE_ENV = "development"
    ? process.env.MONGO_URI
    : process.env.PROD_MONGO_URI);

  try {
    const conn = await mongoose.connect(mongoUri, {});
    console.log(`MongoDB Connected: ${conn.connection.host}`.blue.underline);
  } catch (error) {
    console.dir(`Error: ${error.message}`.red.bold);
    process.exit(1);
  }
};

export default connectDB;
