//making this page to check paid orders
// Compare this snippet from pages\api\product\gettingPaidOrders.js:

import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import Link from "next/link";
import { postData, getData } from "../../utils/fetchData";

const gettingPaidOrders = ({ paidOrders }) => {
  //paidOrdersData is the paidOrders.products
  const paidOrdersData = paidOrders.products;
  const handleDelivered = async (id) => {
    const res = await postData(
      "product/delivered",
      { id },
    );

    if (res.err) return alert(res.err);
    alert("Order Delivered");
    window.location.reload();
  };

  return (
    <div className="container">
      <Head>
        <title>Getting Paid Orders</title>
      </Head>
      <h1>Getting Paid Orders</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Order Date</th>
                  <th>Order Status</th>
                  <th>Order Total</th>
                  <th>Order Details</th>
                  <th>Order Actions</th>
                </tr>
              </thead>
              <tbody>
                {paidOrdersData.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {
                        //converting order.paidAt to date and time
                        new Date(order.paidAt).toLocaleString()
                      }
                    </td>
                    <td>{order.paymentStatus}</td>
                    <td>RS. {order.amount}</td>
                    <td><b>Name : {order?.name}</b> 
                    <br />
                    Email : {order?.email}
                    <br />
                    Address : {order?.address}
                    
                    </td>
                    <td>{
                      //if delivered is true then show delivered else show delivered button
                      order.delivered
                        ? 
                        <button 
                         className="btn btn-primary btn-sm"
                         >
                           Delivered
                         </button>
                        : 
                        <button 
                         className="btn btn-success btn-sm"
                         onClick={
                           () => handleDelivered(order._id)
                         }>
                           Deliver
                         </button>

                      
                      }
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

//server side rendering
export async function getServerSideProps() {
  const res = await fetch(
    "http://localhost:3000/api/product/gettingPaidOrders"
  );
  const data = await res.json();
  return {
    props: {
      paidOrders: data,
    },
  };
}

export default gettingPaidOrders;
