import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(process.env.MONGO_URI, {
      keepAlive: true,
      connectTimeoutMS: 3000,
    })
    .then(() => console.log("DB connected succesfully"))
    .catch((err) => console.log(err));
  mongoose.connection.on("disconnected", () => {
    console.log("Mongo DB disconnected");
  });
  mongoose.connection.on("connected", () => {
    console.log("Mongo DB connected");
  });
};

export default connectDB;
