import mongoose from "mongoose";
async function db() {
  try {
    // await mongoose.connect("mongodb://localhost:27017/urlshortnerapp");
    await mongoose.connect(
      "mongodb+srv://rujen:Alphabeta1@cluster0.rwwgn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
    );
    // mongoose.connection.once("open", () => {
    //   console.log("mongo connected");
    // });
    // mongoose.connection.on(
    //   "error",
    //   console.error.bind(console, "connection error: ")
    // );
  } catch (error) {
    console.log("mongo connection error", error);
    process.exit(1);
  }
  // console.log("this");
}

export default db;
