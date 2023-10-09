import Head from "next/head";
import { useContext, useState, useEffect } from "react";
import { DataContext } from "../store/GlobalState";
import CartItem from "../components/CartItem";
import Link from "next/link";
import { patchData, getData, postData } from "../utils/fetchData";
import { useRouter } from "next/router";

const Cart = () => {
  const { state, dispatch } = useContext(DataContext);
  const { cart, auth, orders } = state;

  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState("esewa");
  const [paymentStatus, setPaymentStatus] = useState("pending");
  const router = useRouter();
  const [callback, setCallback] = useState(false);
  //if user is not logged in, redirect to login page

  useEffect(() => {
    const getTotal = () => {
      const res = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(res);
    };

    getTotal();
  }, [cart]);

  //check if user is logged in
  const isUserLoggedIn = auth.user && auth.user.role === "user";

  //getting user email
  const email = auth.user && auth.user.email;
  const name = auth.user && auth.user.name;

  if (!isUserLoggedIn) {
    router.push("/signin");
  }

  useEffect(() => {
    const cartLocal = JSON.parse(localStorage.getItem("__next__cart01__vesla"));
    if (cartLocal && cartLocal.length > 0) {
      let newArr = [];
      const updateCart = async () => {
        for (const item of cartLocal) {
          const res = await getData(`product/${item._id}`);
          const { title, images, price, inStock, sold } = res.product;
          if (inStock > 0) {
            newArr.push({
              _id: item._id,
              title,
              images,
              price,
              inStock,
              sold,
              quantity: item.quantity > inStock ? 1 : item.quantity,
            });
          }
        }
        dispatch({ type: "ADD_CART", payload: newArr });
      };
      updateCart();
    }
  }, []);

  if (cart.length === 0)
    return (
      <img
        className="img-responsive w-100"
        src="/empty_cart.jpg"
        alt="not empty cart"
      />
    );
  //showing tailwind popup on handlePayment
  const handlePayment = async () => {
    if (!address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile." },
      });
    let newCart = [];
    for (const item of cart) {
      const res = await getData(`product/${item._id}`);
      if (res.product.inStock - item.quantity >= 0) {
        newCart.push(item);
      }
    }
    if (newCart.length < cart.length) {
      setCallback(!callback);
      return dispatch({
        type: "NOTIFY",
        payload: {
          error: "The product is out of stock or the quantity is insufficient.",
        },
      });
    }

    //else show popup
    setShowPopup(true);
    setTotalAmount(total);
  };
  const paidHandler = async () => {
    if (!address || !mobile)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please add your address and mobile." },
      });
    setPaymentStatus("paid");
    //clear cart
    dispatch({ type: "ADD_CART", payload: [] });
    dispatch({ type: "ADD_ORDERS", payload: [...orders, { ...cart, total }] });
    //making patch request to product/paid
    const res = await patchData(
      "product/paid",
      { address, mobile, cart, total, email, name },
      auth.token
    );
    if (res.err)
      return dispatch({ type: "NOTIFY", payload: { error: res.err } });
    return dispatch({ type: "NOTIFY", payload: { success: res.msg } });
  };
  return (
    <div className="mx-auto row">
      <Head>
        <title>Cart Page</title>
      </Head>

      <div className="my-3 col-md-8 text-secondary table-responsive">
        <h2 className="text-uppercase">Shopping Cart</h2>
        <table className="table my-3">
          <tbody>
            {cart.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                dispatch={dispatch}
                cart={cart}
              />
            ))}
          </tbody>
        </table>
      </div>
      {/* showing tailwind dialog box */}
      {showPopup ? (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div
              className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="px-4 pt-5 pb-4 bg-green sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="modal-headline"
                    >
                      Payment
                    </h3>

                    <div className="mt-2">
                      {
                        //showing esewa image from https://esewa.com.np/common/images/esewa_logo.png in blue background
                      }
                      <img
                        src="http://lh3.googleusercontent.com/Imp5kLEg6mIoYZcsyQoTUQdIIP3gpVPJyxNUj10eqRa1Alw9rf4UkuY_W4xZcl2nCHU=w300"
                        height={50}
                        width={50}
                        alt="esewa"
                        className="w-32 h-32 bg-blue-500 rounded-full"
                      />
                      <h1>eSewa</h1>

                      <p className="text-sm text-gray-500">
                        Account Name: Vesla
                      </p>
                      <p className="text-sm text-gray-500">
                        Account Number: 9844581340
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Total Amount: Rs. {totalAmount}
                      </p>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Payment Status: {paymentStatus}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 font-medium bg-green-600 border border-transparent rounded-md shadow-sm text-gray hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => paidHandler()}
                >
                  Done
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="">
            <form>
              <h2>Shipping</h2>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                className="mb-2 form-control"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />

              <label htmlFor="address">Mobile Number</label>
              <input
                type="number"
                name="mobile"
                id="mobile"
                className="mb-2 form-control"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </form>

            <h3>
              Total:{" "}
              <span className="text-danger text-capitalize">Rs.{total}</span>
            </h3>

            {
              //proceed with payment only if user is logged in

              <button
                className="my-2 btn btn-dark"
                disabled={cart.length === 0}
                onClick={() => handlePayment()}
              >
                Proceed with payment
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
