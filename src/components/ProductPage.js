import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { CommerceContext } from "./Context";
import "./ProductPage.css";

function ProductPage() {
  const { productId } = useParams();
  const { products } = useContext(CommerceContext);
  const selectedItem = products.find((item) => item.id === productId);

  const dispatch = useDispatch();

  return (
    <div>
      {selectedItem && (
        <div className="product__container">
          <div className="selected__product">
            <img src={selectedItem.imageUrl} alt="" />
            <div className="details">
              <h1>{selectedItem.title}</h1>
              <hr />
              <p className="description">{selectedItem.description}</p>
              <p>⭐ {selectedItem.rating}</p>

              <p>$ {selectedItem.price}</p>
              <p className=" text-gray-400 " id="tax__tag">
                Inclusive of all taxes
              </p>
              <div className="  flex mt-4 gap-6">
                <div className=" delivery__details flex flex-col items-center gap-1">
                  <i className="fa-solid fa-arrow-rotate-left"></i>
                  <span className=" text-center text-blue-700 font-semibold">
                    10 days <br /> returnable
                  </span>
                </div>
                <div className=" delivery__details flex flex-col items-center gap-1">
                  <i className="fa-solid fa-truck"></i>
                  <span className=" text-center text-blue-700 font-semibold">
                    Unveiled
                    <br /> Delivered
                  </span>
                </div>
                <div className=" delivery__details flex flex-col items-center gap-1">
                  <i className="fa-solid fa-building-circle-check"></i>
                  <span className=" text-center text-blue-700 font-semibold">
                    No-Contact <br /> Delivery
                  </span>
                </div>
              </div>
              <div className="btn">
                <button
                  className="cart__btn"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: selectedItem.id,
                        imageUrl: selectedItem.imageUrl,
                        title: selectedItem.title,
                        price: selectedItem.price,
                        quantity: 1,
                      })
                    )
                  }
                >
                  Add to cart
                </button>
                <button className="home__btn">
                  <Link to="/products">Home</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
