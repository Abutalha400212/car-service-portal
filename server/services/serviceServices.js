const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

module.exports.getServiceServices = async () => {
  const db = getDb();
  const productService = await db.collection("service").find({}).toArray();
  return productService;
};
module.exports.getServiceServicesById = async (id) => {
  const db = getDb();
  const service = await db.collection("service").findOne({ _id: ObjectId(id) });
  return service;
};
