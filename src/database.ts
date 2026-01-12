import mongoose from "mongoose";

const MONGO_URI = `mongodb+srv://abdulrahmangalfahad_db_user:${process.env.dbpassword}@cluster0.4gygrgp.mongodb.net/?appName=Cluster0`;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(MONGO_URI);
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
