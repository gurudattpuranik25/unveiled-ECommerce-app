import React, { useContext, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { CommerceContext } from "./Context";
import { Link } from "react-router-dom";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

function Products() {
  const { searchItem, products, setProducts } = useContext(CommerceContext);

  const [x, setX] = useState([]);

  const productCollectionRef = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    setX(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line
  }, []);

  const cartItems = useSelector((state) => state.cart.cartArray);

  const dispatch = useDispatch();

  const handleCategory = (selectedCategory) => {
    if (selectedCategory === "all") setProducts(x);
    else {
      setProducts(x.filter((item) => item.category === selectedCategory));
    }
  };

  return (
    <div className="products__container">
      <p className="hero__tag">Grab all you want.</p>
      <p className="products__tagline">
        Choose from wide range of products across styles.
      </p>
      <div className="category__btn">
        <button onClick={() => handleCategory("all")}>All</button>
        <button onClick={() => handleCategory("sarees")}>Saree</button>
        <button onClick={() => handleCategory("kurtas")}>Kurta</button>
        <button onClick={() => handleCategory("shoes")}>Formal Shoes</button>
        <button onClick={() => handleCategory("shirts")}>Shirts</button>
        <button onClick={() => handleCategory("jeans")}>Jeans</button>
      </div>
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
