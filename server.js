const mongoose = require("mongoose");
const app = require("./app");
mongoose.set('useCreateIndex', true);
const urldb ="mongodb+srv://Cosmar:hipolito@cluster0.cunin.mongodb.net/Project0?retryWrites=true&w=majority";
const port = process.env.PORT || 4000;

mongoose.connect(
  urldb,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) console.log(`Error connecting to the data base ${err}`);
    else {
      app.listen(port, () => {
        console.log(`API started on: http://localhost:${port}`);
      });
      console.log("Succesfully connected to db");
    }
  }
);
