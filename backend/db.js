const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// Function to switch databases
const getDatabase = (dbName) => {
  return mongoose.connection.useDb(dbName);
};

module.exports = { connectDB, getDatabase };