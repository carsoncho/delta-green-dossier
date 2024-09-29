"use server";

import mongoose, { Connection } from "mongoose";

let cachedConnection: Connection | null = null;

export async function connectToMongoDB() {
  if (cachedConnection) {
    console.log("Using cached db connection");
    return cachedConnection;
  }
  try {
    const cnx = await mongoose.connect(process.env.MONGODB_URI!);
    // Cache the connection for future use
    cachedConnection = cnx.connection;
    console.log("New mongodb connection established");

    console.log(cachedConnection.models);

    // Now, models are registered since we imported them above
    return cachedConnection;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
