const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db.config");
const userRoutes = require("./routes/users.routes.js");
const authRoutes  = require("./routes/auth.routes.js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found..." });
});

const port = process.env.PORT || 8000;

db.authenticate( )
  .then(() => {
    console.log("Database connected...");
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Listening on port: http://localhost:${port}`)
    );
  })
  .catch((err) => {
    console.log("Error : " + err);
  });
