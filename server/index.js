require("dotenv").config();
const express = require("express");
const cors = require("cors");
const colors = require("colors");
const { connectToServer } = require("./utils/dbConnect");
const port = process.env.PORT || 5000;
const app = express();
const serviceRoute = require("./routes/serviceRoute");
const orderRoute = require("./routes/orderRoute");
const paymentRoute = require("./routes/paymentRoute");
app.use(cors());
app.use(express.json());

connectToServer(function (err) {
  if (!err) {
    app.listen(port, () => {
      console.log(`Car service Center is running on ${port}`);
    });
  } else {
    console.log(err);
  }
});
app.use("/api/v1/service", serviceRoute);
app.use("/api/v1/order", orderRoute);
app.use("/payment", paymentRoute);
app.all("*", (req, res) => {
  res.send("No route found.");
});

// app.get("/orders", async (req, res) => {
//   try {
//     const decoded = req.decoded;
//     if (decoded.email !== req.query.email) {
//       res.status(403).send({ message: "Unauthorized Access" });
//     }

//     let query = {};
//     if (req.query.email) {
//       query = {
//         email: req.query.email,
//       };
//     }
//     const serviceItem = orders.find(query);
//     const data = await serviceItem.toArray();
//     res.send({
//       success: true,
//       data: data,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       error: error.message,
//     });
//   }
// });
// app.patch("/orders/:id", async (req, res) => {
//   const { id } = req.params;
//   const status = req.body.status;
//   try {
//     const updateStatus = {
//       $set: {
//         status: status,
//       },
//     };
//     const result = await orders.updateOne({ _id: ObjectId(id) }, updateStatus);
//     if (result.matchedCount) {
//       res.send({
//         success: true,
//         message: "Approved by authority",
//       });
//     } else {
//       res.send({
//         success: false,
//         error: "Did not Approve please wait sometimes",
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.delete("/orders/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deleteItem = await orders.deleteOne({ _id: ObjectId(id) });

//     if (deleteItem.deletedCount) {
//       res.send({
//         success: true,
//         message: `Delete order`,
//       });
//     } else {
//     }
//   } catch (error) {
//     console.log(error);
//   }
// });

// app.get("/orders/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const selected = await orders.findOne({ _id: ObjectId(id) });
//     res.send({
//       success: true,
//       data: selected,
//     });
//   } catch (error) {
//     res.send({
//       success: false,
//       error: error.message,
//     });
//   }
// });

// app.post("/orders", async (req, res) => {
//   try {
//     const order = await orders.insertOne(req.body);
//     if (order.insertedId) {
//       res.send({
//         success: true,
//         message: `Order recieved on serviceid ${order.insertedId}`,
//       });
//     } else {
//       res.send({
//         success: false,
//         error: "Something error! please try again. ",
//       });
//     }
//   } catch (error) {
//     res.send({
//       success: false,
//       error: error.message,
//     });
//   }
// });
