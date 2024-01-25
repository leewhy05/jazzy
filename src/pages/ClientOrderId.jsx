import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ClientOrderId = () => {
  const [clientOrder, setClientOrder] = useState([]);
  const { loggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const userId = useParams();
  const token = localStorage.getItem("token");
  const fetchClientOrder = async () => {
    const fetcher = await fetch(
      `https://ecommerce-3r9v.onrender.com/api/orders/${userId}`,
      {
        // method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const response = await fetcher.json();
    console.log(response.orders);
    // console.log(response);
    setClientOrder(response.orders);
  };

  
  useEffect(() => {
    if (!loggedIn) {
      toast.error("unauthorized,please login/signup");
      navigate("/");
    }

    fetchClientOrder();
  }, []);
  return (
    <>
      <main className="py-4 ">
        {clientOrder && clientOrder.length >= 1 ? (
          <>
            {clientOrder.map((itx) => {
              return (
                <div key={itx._id} className="border">
                  {/* <h2> {itx.createdAt}</h2> */}
                  <p className="text-center">
                   <span className="fw-bold">CUSTOMER </span> <span className="fw-bold">ORDER ID</span> {itx._id}
                  </p>
                  {/* <h4> {itx.createdAt.slice(0,10)}, {itx.createdAt.slice(12,19)}</h4> */}
                  <h2> {itx.createdAt}</h2>

                  <hr />
                    <h1 className="text-center text-danger">ADDRESS VERIFICATION</h1>
                  <h2><span className="text-danger">CITY:</span> {itx.address.city} </h2>
                  <h2><span className="text-danger">HOUSERNUMBER:</span> {itx.address.housenumber} </h2>
                  <h2> <span className="text-danger">ADDRESS:</span> {itx.address.street} </h2>
                  <hr />
                  <h1 className="text-center text-danger">IDENTITY VERIFICATION</h1>
                  <h3><span className="text-danger">EMAIL:</span> {itx.recipient.email} </h3>
                  <h3> <span className="text-danger">FIRSTNAME:</span> {itx.recipient.firstname} </h3>
                  <h3> <span className="text-danger">LASTNAME:</span> {itx.recipient.lastname} </h3>
                  <h3><span className="text-danger">NUMBER:</span> {itx.recipient.phonenumber} </h3>
                  <hr />
                  {itx.orderItems.map((its) => {
                    return (
                      <div key={its._id} className="">
                        <h1 className="text-center text-danger">WHAT YOU ORDER</h1>
                        <h3> {its.title} </h3>
                        <h3> {its.category} </h3>
                        <h4> {its.price} </h4>
                        <h4> {its.quantity} </h4>
                        <img src={its.image} alt="" />
                        <h3> {its.totalprice} </h3>
                      </div>
                    );
                  })}
                  <h1 className="text-success"> Delivery status : <span className="text-danger"> Pending </span></h1>
                  <h2 className="text-success text-center">PAY ON DELIVERY</h2>
                </div>
              );
            })}
          </>
        ) : (
          <>
            <h2>no order </h2>
          </>
        )}
      </main>
    </>
  );
};

export default ClientOrderId;
