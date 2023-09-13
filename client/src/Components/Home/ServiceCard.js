import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCarService } from "../../hook/useCarService";

const ServiceCard = ({ ser }) => {
  return (
    <div className="card  bg-base-100 shadow-xl">
      <figure>
        <img src={ser?.img} alt="Shoes" />
      </figure>
      <div className="card-body ">
        <h2 className="card-title">{ser.title}</h2>
        <div className="flex justify-between text-red-600">
          <p>Price: $ {ser.price}</p>
          <button>
            <Link to={`/checkout/${ser._id}`}>
              <FaArrowRight />
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
