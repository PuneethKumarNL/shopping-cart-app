import { useState, useEffect } from "react";
import Products from "./components/Products";
import CartProduct from "./components/CartProduct";
import "./App.css";

const PRODUCTS = [
  { id: 1, name: "Laptop", price: 500 },
  { id: 2, name: "Smartphone", price: 300 },
  { id: 3, name: "Headphones", price: 100 },
  { id: 4, name: "Smartwatch", price: 150 },
];

const FREE_GIFT = { id: 99, name: "Wireless Mouse", price: 0 };
const THRESHOLD = 1000;

function App() {
  const [cartList, setCartList] = useState([]);

  const addItemsToCart = (each) => {
    const existingCartItem = cartList.find((item) => item.id === each.id);

    if (existingCartItem) {
      const newUpdatedCart = cartList.map((item) =>
        item.id === each.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartList(newUpdatedCart);
    } else {
      setCartList([...cartList, { ...each, quantity: 1 }]);
    }
  };

  const incrementQuantity = (itemId) => {
    const updatedCart = cartList.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartList(updatedCart);
  };

  const decrementQuantity = (itemId) => {
    const cartProduct = cartList.find((each) => each.id === itemId);

    if (cartProduct && cartProduct.quantity > 1) {
      setCartList((prevCart) =>
        prevCart.map((each) => {
          if (itemId === each.id) {
            const updateQuantity = each.quantity - 1;
            return { ...each, quantity: updateQuantity };
          }
          return each;
        })
      );
    } else {
      removeCartItem(itemId);
    }
  };

  const removeCartItem = (id) => {
    setCartList((prevCart) => prevCart.filter((each) => each.id !== id));
  };

  const totalCartAmount = () => {
    return cartList.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  useEffect(() => {
    if (totalCartAmount() >= 1000) {
      if (!cartList.find((item) => item.id === FREE_GIFT.id)) {
        setCartList([...cartList, { ...FREE_GIFT, quantity: 1 }]);
        alert("Congratulations! You earned a free gift!");
      }
    } else {
      setCartList(cartList.filter((item) => item.id !== FREE_GIFT.id));
    }
  }, [totalCartAmount()]);
  return (
    <div className="shopping-cart-main-container">
      <div>
        <h1 className="app-title">Shopping Cart</h1>
      </div>
      <div>
        <h1>Products</h1>
        <ul className="product-container">
          {PRODUCTS.map((eachProduct) => (
            <Products
              productDetails={eachProduct}
              key={eachProduct.id}
              addToCart={addItemsToCart}
            />
          ))}
        </ul>
      </div>
      <div>
        <h1>Cart Summary</h1>
        <div className="cart-summary-main-container">
          <div className="cart-summary-container">
            <h3>Subtotal:</h3>
            <h3>₹{totalCartAmount()}</h3>
          </div>
          <hr />
          <div className="progress-dsgn">
            <p>
              Add ₹{1000 - totalCartAmount()} more to get a FREE Wireless Mouse!
            </p>
            {totalCartAmount() >= 1000 ? (
              <p>You got a free Wireless Mouse!</p>
            ) : (
              <progress value={totalCartAmount()} max={THRESHOLD}></progress>
            )}
          </div>
        </div>
      </div>
      <div>
        <h1>Cart Items</h1>
        <ul className="cart-ul">
          {cartList.map((each) => (
            <li className="cart-list">
              <div>
                <h3>{each.name}</h3>
                <p>
                  ₹{each.price} x ${each.quantity} = ₹{each.price}
                </p>
              </div>
              <div>
                <div className="button-container">
                  <button
                    onClick={() => decrementQuantity(each.id)}
                    className="minus-btn"
                  >
                    -
                  </button>
                  <h3>₹{each.quantity}</h3>
                  <button
                    onClick={() => incrementQuantity(each.id)}
                    className="plus-btn"
                  >
                    +
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
