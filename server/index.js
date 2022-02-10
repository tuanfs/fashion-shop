require("dotenv").config();
const express = require("express");
const connectDB = require("./src/config/db/connectDB");
const route = require("./src/routes");
const { newUser } = require("./src/controllers/userController");
const cors = require("cors");

const app = express();

connectDB();

app.use(express.json());
app.use(cors());
route(app);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
