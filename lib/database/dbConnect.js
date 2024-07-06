import mongoose from "mongoose";

const MONGODB_URL =
  "mongodb+srv://incoginatiomkhan:246456789@cluster0.va3blfm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

if (!MONGODB_URL) {
  throw new Error(
    "Please define the MONGODB_URL environment variable inside .env.local"
  );
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { connection: null, promise: null };
}

const dbconnect = async () => {
  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL).then((mongoose) => {
      return mongoose;
    });
  }
  cached.connection = await cached.promise;
  return cached.connection;
};

export default dbconnect;
