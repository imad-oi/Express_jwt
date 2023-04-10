const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const db = require("./db.config");
const userRoutes = require("./routes/users.routes.js");
const patientRoutes = require("./routes/patient.routes.js");
const authRoutes = require("./routes/auth.routes.js");
const fs = require("fs");


const checkTokenMiddleware = require("./JWT/check.js");

dotenv.config();

const app = express();

// app.use(async (req, res, next) => {
//   const even = new Date();
//   const eventString = even.toString();
//   const EventEmitter = ` ${eventString}\t ${req.url} \t ${req.method}\n  `;

//   fs.appendFile("log.txt", `${EventEmitter} ` , (err) => {  
//     if (err) throw err;
//     console.log("The file has been saved!");
//   });
//   next();
// });

var whitelist = ['http://localhost:3000', 'http://localhost:3001']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods         : ['GET', 'POST', 'PUT', 'DELETE' , 'PATCH'],
}

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users",checkTokenMiddleware, userRoutes);
app.use("/api/patients",checkTokenMiddleware, patientRoutes);
app.use("/api/auth",  authRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("*", (req, res) => {
  res.status(404).json({ message: "Not found..." });
});

const port = process.env.PORT || 8000;

db.authenticate()
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
