import mongoose from "mongoose";

export async function connectToMongoDb(url) {
  try {
    await mongoose.connect(url);
  } catch (error) {
    console.log("Cannot connect", error);
  }
}
