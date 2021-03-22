import { connection, connect } from "mongoose";

connection.on("open", () =>
  console.log(`[${new Date().toISOString()}] MongoDB - Connection Established`)
);

const dbConnect = async () => {
  // check if connection has already
  // been established
  if (connection.readyState >= 1) {
    return;
  }

  const uri = process.env.MONGO_URI ?? "mongodb://localhost:27017/local";

  return connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};

export default dbConnect;
