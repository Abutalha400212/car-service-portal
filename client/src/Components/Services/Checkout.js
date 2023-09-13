import React, { useContext } from "react";
import toast from "react-hot-toast";
import { useLoaderData, useParams } from "react-router-dom";
import banner from "../../assets/images/checkout/checkout.png";
import { AuthProvider } from "../../layout/AuthContext";
import axiosInstance from "../../utils/axiosInstance";
import { useCarService } from "../../hook/useCarService";
const Checkout = () => {
  const { id } = useParams();
  const [service] = useCarService(id);
  const { user } = useContext(AuthProvider);

  const handleCheckout = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = `${form.firstName.value} ${form.lastName.value}`;
    const email = user?.email || "unregistered";
    const phone = form.phone.value;
    const address = form.address.value;
    const currency = form.currency.value;
    const postcode = form.postcode.value;
    const serviceData = {
      serviceId: service?.service?._id,
      customer: name,
      email,
      phone,
      address,
      currency,
      postcode,
    };
    axiosInstance.post("/order", serviceData).then((data) => {
      if (data.status === 200) {
        window.location.replace(data.data.url);
      }
    });
  };
  return (
    <div className="mb-5">
      <div className="mb-5 relative">
        <img src={banner} alt="" />
        <div className="absolute top-1/2 left-5 ">
          <h1 className="text-5xl font-extrabold text-white">
            {service?.service?.title}
          </h1>
        </div>
      </div>
      <form onSubmit={handleCheckout} className="bg-gray-100 p-20">
        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            className="input w-full"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Second Name"
            className="input w-full"
          />
          <input
            type="email"
            name="email"
            defaultValue={user?.email}
            placeholder="Email"
            className="input w-full"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone No."
            className="input w-full"
          />

          <select
            name="currency"
            defaultValue={"BDT"}
            className="select select-bordered">
            <option value={"USD"}>USD</option>
            <option value={"BDT"}>BDT</option>
          </select>

          <input
            type="text"
            name="postcode"
            placeholder="Postcode"
            className="input w-full"
          />
        </div>
        <div>
          <textarea
            name="address"
            className="textarea w-full"
            placeholder="Address"></textarea>
        </div>
        <div className="mt-3">
          <button className="btn btn-success w-full">Pay</button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
