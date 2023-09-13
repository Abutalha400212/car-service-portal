const { addOrderService } = require("../services/orderServices");
const SSLCommerzPayment = require("sslcommerz-lts");
const { getDb } = require("../utils/dbConnect");
const { ObjectId } = require("mongodb");
exports.addOrder = async (req, res) => {
  try {
    const is_live = false;
    const store_id = process.env.STORE_ID;
    const store_passwd = process.env.STORE_PASSWORD;
    const data = await addOrderService(req.body);
    const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
    sslcz.init(data).then((apiResponse) => {
      // Redirect the user to payment gateway
      let GatewayPageURL = apiResponse.GatewayPageURL;
      res.send({ url: GatewayPageURL });
    });
  } catch (error) {
    console.log(error);
  }
};
exports.getOrderbyId = async (req, res) => {
  try {
    const db = getDb();
    const { id } = req.params;
    console.log(id);
    if (!ObjectId.isValid(id)) {
      return res.send({
        success: false,
        message: "Id is not valid",
      });
    }

    const order = await db.collection("orders").findOne({ transactionId: id });
    if (!order) {
      return res.send({
        success: false,
        message: "order is not available",
      });
    }
    res.send({ status: true, order });
  } catch (error) {
    res.send({
      status: false,
      message: error.message,
    });
  }
};
// exports.getOrders = async (req, res) => {
//   try {
//     const db = getDb();

//     const order = await db.collection("orders")
//     if (!order.length) {
//       return res.send({
//         success: false,
//         message: "order is not available",
//       });
//     }
//     res.send({ status: true, order });
//   } catch (error) {
//     res.send({
//       status: false,
//       message: error.message,
//     });
//   }
// };
