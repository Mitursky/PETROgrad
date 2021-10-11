const mongoose = require("mongoose");
const Scheme = mongoose.Schema;
if (process.env.NODE_ENV == "development") {
  mongoose.connect(
    "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }
  );
} else {
  mongoose.connect("mongodb://Mitursky:0509093345@127.0.0.1:27017/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
}

const UsersScheme = Scheme({
  _id: {
    type: Number,
    required: true,
    default: 0,
  },
  photo_200: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  geodata: {
    type: Object,
    default: {
      lat: 0,
      long: 0,
    },
  },
  scan_distance: {
    type: Number,
    default: 10000,
  },
});

const Users = mongoose.model("users", UsersScheme);
async function check() {
  let res = await Users.findOne({ _id: 0 });
  console.log(res);
}

module.exports = { Users };
