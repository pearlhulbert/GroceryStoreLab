import React from "react";

const Product = ({ product }) => {
  
  return (
      <div>
        <p>{product.name}</p>
        <p><i> {product.price}</i></p>
      </div>
  );
};

export default Product;
