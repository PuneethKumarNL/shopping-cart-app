import React from "react";
import "./index.css";

const CartProduct = (props) => {
  const { id, cartDetails, incrementQuantity, decrementQuantity } = props;
  const { price, quantity } = cartDetails;
  return (
    <li className="cart-list">
      <div>
        <h3>name</h3>
        <p>
          ${price} x ${quantity} = $ {price}
        </p>
      </div>
      <div>
        <div>
          <button onClick={() => decrementQuantity(id)} className="minus-btn">
            -
          </button>
          <h3>${quantity}</h3>
          <button onClick={() => incrementQuantity(id)} className="plus-btn">
            +
          </button>
        </div>
      </div>
    </li>
  );
};

export default CartProduct;
