import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { CommerceContext } from "./Context";

function ProductPage() {
  const { productId } = useParams();
  const { products } = useContext(CommerceContext);
  const selectedItem = products.find((item) => item.id === productId);

  return (
    <div>
      {selectedItem && (
        <div>
          <img src={selectedItem.imageUrl} alt="" />
          <h1>{selectedItem.title}</h1>
          <p>{selectedItem.description}</p>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
