// import mongoose from "mongoose";
// // track the connection
// let isConnected = false;
// export const connectToDataBase = async () => {
//   mongoose.set("strictQuery", true);
//   console.log("IN");
//   if (isConnected) {
//     console.log("DB connected already");
//     return;
//   }
//   try {
//     await mongoose.connect((process.env.MONGODB_URI as string), {
//       dbName: "MY_DB",
//     //   useNewUrlParser: true,
//     //   useUnifiedTopology: true,
//     });
//     isConnected = true;
//   } catch (error) {
//     console.log(error);
//   }
// };


import { MongoClient } from 'mongodb'

export const client = new MongoClient((process.env.MONGODB_URI as string),{
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
    // autoReconnect: true, // This is typically true by default in most drivers
    // reconnectTries: Number.MAX_VALUE,  // Keep trying to reconnect forever
    // reconnectInterval: 1000  
});

// mongodb.js


// const uri = process.env.MONGODB_URI as string
// const options = {
//   useUnifiedTopology: true,
//   useNewUrlParser: true,
// }

// let client
// let clientPromise

// if (!process.env.MONGODB_URI) {
//   throw new Error('Add Mongo URI to .env.local')
// }

// if (process.env.NODE_ENV === 'development') {
//   if (!global._mongoClientPromise) {
//     client = new MongoClient(uri, options)
//     global._mongoClientPromise = client.connect()
//   }
//   clientPromise = global._mongoClientPromise
// } else {
//   client = new MongoClient(uri, options)
//   clientPromise = client.connect()
// }

// export default clientPromise