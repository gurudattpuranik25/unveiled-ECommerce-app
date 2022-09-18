import React, { createContext, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";

export const CommerceContext = createContext();

function Context({ children }) {
  const [products, setProducts] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  const productCollectionRef = collection(db, "products");

  const getProducts = async () => {
    const data = await getDocs(productCollectionRef);
    setProducts(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const searchHandler = (e) => {
    setSearchItem(e.target.value);
  };

  const value = {
    searchItem,
    searchHandler,
    products,
  };

  return (
    <CommerceContext.Provider value={value}>
      {children}
    </CommerceContext.Provider>
  );
}

export default Context;
