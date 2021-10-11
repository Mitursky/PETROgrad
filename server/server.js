const mongo = require("mongodb").MongoClient;
const crypto = require("crypto");
const qs = require("querystring");
const fs = require("fs");

const get = require("./routes/get");
const goe = require("./routes/geo");
const messages = require("./routes/messages");
