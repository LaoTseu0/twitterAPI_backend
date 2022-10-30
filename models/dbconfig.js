const mongoose = require("mongoose");

mongoose.connect(process.env.ACCESS_MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection database error: "));
db.once("database open", function () {
  console.log("Connected successfully");
});
