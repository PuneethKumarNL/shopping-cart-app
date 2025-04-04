import React from "react";

const Products = (props) => {
  const { productDetails, addToCart } = props;
  const { name, price } = productDetails;
  const onClickCartBtn = () => {
    addToCart(productDetails);
  };
  return (
    <li className="product-card-container">
      <h3>{name}</h3>
      <p>{price}</p>
      <button onClick={onClickCartBtn} className="cart-btn" type="button">
        Add to Cart
      </button>
    </li>
  );
};

export default Products;
