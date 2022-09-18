import React, { useContext } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { CommerceContext } from "./Context";
import { Link } from "react-router-dom";

function Products() {
  const { searchItem, products } = useContext(CommerceContext);

  const cartItems = useSelector((state) => state.cart.cartArray);

  const dispatch = useDispatch();

  return (
    <div className="products__container">
      <p className="hero__tag">Grab all you want.</p>
      <p className="products__tagline">
        Choose from wide range of products across styles.
      </p>
      <div className="products__grid ">
        {products
          // eslint-disable-next-line
          .filter((value) => {
            if (searchItem === "") {
              return value;
            } else if (
              value.title.toLowerCase().includes(searchItem.toLowerCase())
            ) {
              return value;
            }
          })
          .map((item) => (
            <div key={item.id} className="product">
              <Link to={`/productPage/${item.id}`}>
                <img src={item.imageUrl} alt="productImage" />
              </Link>
              <div className="product__details">
                <div className="product__title">
                  <p className=" font-semibold">{item.title.toUpperCase()}</p>
                  <span>⭐ {item.rating}</span>
                </div>

                <p>{item.description.slice(0, 25)}...</p>
                <p>$ {item.price}</p>

                {cartItems.findIndex((cartItem) => cartItem.id === item.id) >=
                0 ? (
                  <button className=" addedToCart ">Added to cart</button>
                ) : (
                  <button
                    className=" addToCart "
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: item.id,
                          imageUrl: item.imageUrl,
                          title: item.title,
                          price: item.price,
                          quantity: 1,
                        })
                      )
                    }
                  >
                    Add to cart
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Products;
