import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useOrderService } from "../../../hook/useOrderService";

export default function Success() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const transactionId = query.get("transactionId");
  const [order] = useOrderService(transactionId);
  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/v1/order/${transactionId}`)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // });
  console.log(order);
  return (
    <div>
      <h1 className="text-center font-black text-xl py-2">
        Contratulation for pay Product on your transaction id is{" "}
        <span className="text-green-700">{order.transactionId}</span>
      </h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Customer Name</th>
              <th>Email</th>
              <th>Phone No.</th>
              <th>Transaction Id</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th></th>
              <th>{order.customer}</th>
              <td>{order.email}</td>
              <td>{order.phone}</td>
              <td>{order.transactionId}</td>
              <td>{order.status && "Paid"}</td>
            </tr>
            {/* row 2 */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
