require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDb = require("./connection/db");
const cors = require("cors");

app.use(cors());
app.use(express.json());

// importing routes
const userRoutes = require("./routes/user-routes");

// using the routes
app.use("/api/user", userRoutes);

app.get("/", (req, res) => res.send("Hello from backend"));

connectDb().then(() =>
  app.listen(port, () => console.log(`Listening on port ${port}!`))
);
