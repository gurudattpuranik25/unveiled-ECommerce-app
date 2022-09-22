import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  increaseProductQuantity,
  decreaseProductQuantity,
} from "../features/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const cartItems = useSelector((state) => state.cart.cartArray);

  const user = useSelector((state) => state.user);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0));
  }, [cartItems]);

  const dispatch = useDispatch();

  const removeItem = (item) => {
    dispatch(removeFromCart(item));
  };
  const handleIncreaseQuantity = (item) => {
    dispatch(increaseProductQuantity(item));
  };
  const handleDecreaseQuantity = (item) => {
    dispatch(decreaseProductQuantity(item));
  };

  return (
    <div className="cart__container">
      <h1 className=" cart__heading "> My Shopping Cart</h1>
      {cartItems.length !== 0 ? (
        <div className=" cart__grid">
          <div className="cart__items">
            {cartItems.map((item) => (
              <div className="cart__card" key={item.id}>
                <img src={item.imageUrl} className=" " alt="productImage" />
                <div className="cart__details">
                  <p className=" font-semibold">{item.title.toUpperCase()}</p>
                  <p>$ {item.price}</p>
                  <div className=" item__quantity ">
                    <p>Quantity :</p>
                    <button
                      className="counter__btn"
                      onClick={() => handleDecreaseQuantity(item)}
                    >
                      -
                    </button>
                    <span className="">{item.quantity}</span>
                    <button
                      className="counter__btn"
                      onClick={() => handleIncreaseQuantity(item)}
                    >
                      +
                    </button>
                  </div>
                  <p>SubTotal : $ {item.quantity * item.price}</p>

                  <button
                    className="remove__from__cart "
                    onClick={() => removeItem(item)}
                  >
                    Remove From Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="price__summary">
            <h1>Price Summary</h1>
            <hr />
            <div className=" flex justify-between pt-4 text-xl">
              <p> Product's Total</p>
              <p>$ {total}.00</p>
            </div>
            <div className=" flex justify-between pt-4 text-xl">
              <p>Discount</p>
              <p>- $ 149.00</p>
            </div>
            <div className=" flex justify-between pt-4 text-xl">
              <p>Delivery Charges</p>
              <p>$ 49.00</p>
            </div>
            <hr />
            <div className=" flex justify-between pt-4 text-2xl">
              <p>Total Amount</p>
              <p>$ {total - 100}.00</p>
            </div>
            <hr />
            <div className=" checkout__btn">
              <Link to={user.userName === null ? "/login" : "/address"}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="empty__cart">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png"
            alt="empty__cart"
          />
          <div>
            <p>Oops...no items in your cart!</p>
            <div className=" mt-4">
              <Link className="add__items" to="/products">
                Click here to add +
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
