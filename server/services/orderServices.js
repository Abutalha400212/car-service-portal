const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");
module.exports.addOrderService = async (data) => {
  //true for live, false for sandbox
  const db = getDb();
  const { serviceId, customer, postcode, email } = data;
  const { price, title } = await db
    .collection("service")
    .findOne({ _id: ObjectId(serviceId) });
  const transactionId = new ObjectId().toString();
  const paymentData = {
    total_amount: price,
    currency: "BDT",
    payment_status: false,
    tran_id: transactionId, // use unique tran_id for each api call
    success_url: `http://localhost:5000/payment/success?transactionId=${transactionId}`,
    fail_url: `http://localhost:5000/payment/fail?transactionId=${transactionId}`,
    cancel_url: `http://localhost:5000/payment/cancel?transactionId=${transactionId}`,
    ipn_url: "http://localhost:3030/ipn",
    shipping_method: "Courier",
    product_name: title,
    product_category: "Electronic",
    product_profile: "general",
    cus_name: customer,
    cus_email: email,
    cus_add1: "Dhaka",
    cus_add2: "Dhaka",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: postcode,
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    ship_name: "Customer Name",
    ship_add1: "Dhaka",
    ship_add2: "Dhaka",
    ship_city: "Dhaka",
    ship_state: "Dhaka",
    ship_postcode: 1000,
    ship_country: "Bangladesh",
  };
  const storeOrder = await db.collection("orders").insertOne({
    ...data,
    transactionId,
    status: false,
  });
  // return { provideData, paymentData };
  // const order = await db.collection("orders").insertOne(paymentData);
  return paymentData;
};
