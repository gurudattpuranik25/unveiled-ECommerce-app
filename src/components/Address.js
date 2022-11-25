import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./Address.css";

const validator = require("validator");

function Address() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    cardNumber: "",
    cvv: "",
  });

  const [summary, setSummary] = useState("");

  const handleChange = (e) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleOrders = (formData) => {
    if (formData.name === "") alert("Please provide your name.");
    else if (!validator.isEmail(formData.email))
      alert("Please provide the correct email address.");
    else if (formData.phoneNumber.length !== 10)
      alert("Please provide a 10 digit phone number");
    else if (formData.address === "") alert("Please provide the address");
    else if (formData.pincode.length !== 6)
      alert("Please provide a 6 digit pincode");
    else if (formData.cardNumber.length !== 12)
      alert("Please provide your 12 digit card number");
    else if (formData.cvv.length !== 3)
      alert("Please provide the correct cvv number");
    // if (
    //   formData.name === "" ||
    //   formData.email === "" ||
    //   formData.phoneNumber === "" ||
    //   formData.address === "" ||
    //   formData.pincode === "" ||
    //   formData.cardNumber === "" ||
    //   formData.cvv === ""
    // ) {
    // alert("Please enter correct address/payment details");}
    else {
      setSummary(
        `Payment successful 😇.Your shipment will be delivered to ${formData.name}, ${formData.address} - ${formData.pincode}. `
      );
    }
  };

  const cartItems = useSelector((state) => state.cart.cartArray);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    setTotal(cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0));
  }, [cartItems]);
  return (
    <div className="order__container">
      <h1 className=" order__heading ">Checkout</h1>

      <div className=" order__grid">
        <div className="order__items">
          <div className="address__section">
            <h1>Address & Payment</h1>
            <hr />
            <form className="address__form">
              <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
              <input
                type="tel"
                name="phoneNumber"
                pattern="[1-9]{1}[0-9]{9}"
                placeholder="Phone Number"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                onChange={handleChange}
                required
              />
              <h1>Card Details</h1>
              <div className="card__details">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  onChange={handleChange}
                  required
                  className="card__number"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  onChange={handleChange}
                  required
                  className="cvv"
                />
              </div>
            </form>
          </div>
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
          <div
            className=" checkout__btn"
            onClick={() => handleOrders(formData)}
          >
            <Link to="/address">Place Order</Link>
          </div>
        </div>
      </div>
      <div className="summary">{summary}</div>
    </div>
  );
}

export default Address;
