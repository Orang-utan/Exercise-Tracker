const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

///////////////////////////////////////////////////////////////
// Connect to MongoDB
///////////////////////////////////////////////////////////////
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

///////////////////////////////////////////////////////////////
// Create Routes for CRUD operations
///////////////////////////////////////////////////////////////
const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);

///////////////////////////////////////////////////////////////
// Ready for Production
///////////////////////////////////////////////////////////////
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//   app.get("*", (request, response) => {
//     response.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

///////////////////////////////////////////////////////////////
// Testing Function (Runs after Start)
///////////////////////////////////////////////////////////////
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
