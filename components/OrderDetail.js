import Link from "next/link";
import {patchData} from '../utils/fetchData'
import { updateItem } from "../store/Actions";

const OrderDetail = ({ orderDetail, state, dispatch }) => {
  const  {auth, orders} = state


  const handleDelivered =  (order) => {
    dispatch({type: 'NOTIFY', payload: {loading: true}})
    patchData(`order/delivered/${order._id}`, null, auth.token)
    .then(res => {
      if(res.err) return dispatch({type: 'NOTIFY', payload: {error: res.err}})

    
    const { paid, dateOfPayment, method, delivered } = res.result
    dispatch(updateItem(orders, order._id, {

      ...order, paid, dateOfPayment, method, delivered
    }, 'ADD_ORDERS'))
    return dispatch({type: 'NOTIFY', payload: {success: res.msg}})
    })
  }
  if(!auth.user) return null;
  return (
    <>
      {orderDetail.map((order) => (
        <div style={{ maxWidth: "600px", margin: "20px auto" }} className="row justify-content-around">

          <div key={order._id} className="text-uppercase my-3" style={{maxWidth: '600px'}}>
            <h2 className="text-break">Order {order._id}</h2>
            <div className="mt-4 text-secondary">
              <h3>Shipping</h3>
              <p>Name: {order.name}</p>
              <p>Email: {order.email}</p>
              <p>Address: {order.address}</p>
              <p>Mobile: {order.mobile}</p>

              <div
                className={`alert ${
                  order.delivered ? "alert-success" : "alert-danger"
                }
                                d-flex justify-content-between align-item-center`}
                role="alert"
              >
                {order.delivered
                  ? `Delivered on ${order.updatedAt}`
                  : "Not Delivered"}
              </div>
              {
                auth.user.role === 'admin' && !order.delivered &&
                <button className="btn btn-dark text-uppercase"
                onClick={() => handleDelivered(order)}>
                  Mark as delivered
                </button>
              }
            </div>

            <h3>Payment</h3>
            <div
                className={`alert ${
                  order.paid ? "alert-success" : "alert-success"
                }
                                d-flex justify-content-between align-item-center`}
                role="alert"
              >
                {order.paid
                  ? `paid on ${order.dateOfPayment}`
                  : "Paid"}
              </div>
            <div>
              <h3>Order Items</h3>

              {order.cart?.map((item) => (
                <div
                  className="p-2 mx-0 row border-bottom justify-content-between align-items-center"
                  key={item._id}
                  style={{ maxWidth: "550px" }}
                >
                  <img
                    src={item.images[0].url}
                    alt={item.images[0].url}
                    style={{
                      width: "50px",
                      height: "45px",
                      objectfit: "cover",
                    }}
                  />

                  <h5 className="px-3 m-0 flex-fill text-seconday">
                    <Link href={`/product/${item._id}`} legacyBehavior>
                      <a>{item.title}</a>
                    </Link>
                  </h5>
                  <span className="m-0 text-info">
                    {item.quantity} x Rs.{item.price} = Rs.
                    {item.price * item.quantity}
                  </span>
                </div>    
              ))}
            </div>
          </div>
          {
            !order.paid && auth.user.role !== 'admin' &&
            <div className="p-4">
            <h2 className="mb-4 justify-content-around text-capitalize"></h2>
          </div>
          }
       
        </div>
      ))}
    </>
  );
};

export default OrderDetail;
