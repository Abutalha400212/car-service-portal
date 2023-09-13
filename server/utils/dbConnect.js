const { bgBlue } = require("colors");
const { MongoClient } = require("mongodb");

const url = process.env.DB_URL;
// const url = `mongodb+srv://car-service:cyeVF9geWt5kk41o@cluster0.xddzsoq.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let dbConnection;
module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      if (err || !db) {
        return callback(err);
      }
      dbConnection = db.db("carsService");
      console.log("MongoDb Connected".bgYellow);
      return callback();
    });
  },
  getDb: function () {
    return dbConnection;
  },
};
