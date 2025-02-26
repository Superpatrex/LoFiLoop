const express = require("express");
const connectDB = require("./db");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});