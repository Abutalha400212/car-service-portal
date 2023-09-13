const { getDb } = require("../utils/dbConnect");

exports.paymentSuccess = async (req, res) => {
  try {
    const db = getDb();
    const { transactionId } = req.query;
    const result = await db
      .collection("orders")
      .updateOne(
        { transactionId },
        { $set: { status: true, paidAt: new Date() } }
      );
    if (result.modifiedCount > 0) {
      res.redirect(
        `http://localhost:3000/payment/success?transactionId=${transactionId}`
      );
    }
  } catch (error) {
    console.log(error);
  }
};
