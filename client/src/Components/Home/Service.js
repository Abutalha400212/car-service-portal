import React from "react";
import ServiceCard from "./ServiceCard";
import { useCarService } from "../../hook/useCarService";
const Service = () => {
  const [service] = useCarService();
  return (
    <div className="mt-4">
      <p className="text-center text-blue-700 font-bold text-xl">Services</p>
      <div className="text-center mb-3">
        <h1 className="text-3xl font-semibold">Our Service Area</h1>
        <p className="text-md ">
          the majority have suffered alteration in some form, by injected
          humour, or <br />
          randomised words which don't look even slightly believable.{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 ">
        {service?.services?.map((ser) => (
          <ServiceCard key={ser._id} ser={ser}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Service;
