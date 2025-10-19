import React from 'react';
import { useCart } from './CartContext';

const CartItem = ({ item }) => {
  const { removeFromCart, updateQuantity } = useCart();

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const handleQuantityChange = (e) => {
    updateQuantity(item.id, e.target.value);
  };

  return (
    <div className="cart-item">
      <h4>{item.name}</h4>
      <p>{item.price} VND</p>
      <input 
        type="number" 
        value={item.quantity} 
        onChange={handleQuantityChange} 
        min="1" 
      />
      <button onClick={handleRemove}>Xóa</button>
    </div>
  );
};

export default CartItem;
