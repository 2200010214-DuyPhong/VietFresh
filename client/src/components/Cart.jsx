import React, { useState } from 'react';
import { useCart } from './CartContext';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  console.log('Giỏ hàng hiện tại:', cart);
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrData, setQrData] = useState('');

  const handleQuantityChange = (id, value) => updateQuantity(id, value);

  const handleCheckout = () => {
    if (cart.length > 0) {
      alert(`Đã thanh toán thành công! Tổng tiền: ${total.toLocaleString('vi-VN')}đ`);
      cart.forEach(item => removeFromCart(item.id));
    } else alert('Giỏ hàng trống, không thể thanh toán!');
  };

  const handleQRCheckout = () => {
    if (cart.length > 0) {
      const paymentData = {
        amount: total.toLocaleString('vi-VN') + 'đ',
        account: '1234567890',
        note: 'Thanh toán giỏ hàng - Nông sản sạch',
      };
      const qrString = `https://example.com/pay?amount=${paymentData.amount}&account=${paymentData.account}&note=${paymentData.note}`;
      setQrData(qrString);
      setShowQRModal(true);
    } else alert('Giỏ hàng trống, không thể thanh toán!');
  };

  const handleQRConfirm = () => {
    alert('Thanh toán bằng QR thành công! Tổng tiền: ' + total.toLocaleString('vi-VN') + 'đ');
    cart.forEach(item => removeFromCart(item.id));
    setShowQRModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col lg:flex-row">
      <Header />
      <div className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-8 text-center">Giỏ Hàng Của Bạn</h1>
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Giỏ hàng của bạn trống.</p>
              <Link to="/" className="mt-4 inline-block bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition">
                Quay lại mua sắm
              </Link>
            </div>
          ) : (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {cart.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <img src={item.image || 'https://via.placeholder.com/50'} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{item.name}</h3>
                        <p className="text-gray-600 dark:text-gray-300">{item.price.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <input type="number" value={item.quantity} onChange={e => handleQuantityChange(item.id, e.target.value)} min="1" className="w-16 p-1 border border-gray-300 dark:border-gray-600 rounded-md text-center focus:outline-none focus:ring-2 focus:ring-green-500" />
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 transition-colors">Xóa</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {cart.length > 0 && (
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Tổng tiền:</h2>
                <p className="text-xl font-bold text-green-600">{total.toLocaleString('vi-VN')}đ</p>
              </div>
              <div className="mt-4 space-x-4">
                <button onClick={handleCheckout} className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold">Thanh toán</button>
                <button onClick={handleQRCheckout} className="w-full sm:w-auto px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-semibold">Thanh toán bằng QR</button>
              </div>
            </div>
          )}
          {showQRModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Quét Mã QR để Thanh Toán</h2>
                <div className="w-full h-64 bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500">{qrData ? 'Mã QR sẽ hiển thị tại đây (cài đặt qrcode.react)' : 'Đang tải...'}</div>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  Số tài khoản: 1234567890<br />
                  Số tiền: {total.toLocaleString('vi-VN')}đ<br />
                  Ghi chú: Thanh toán giỏ hàng - Nông sản sạch
                </p>
                <div className="mt-6 flex justify-end space-x-4">
                  <button onClick={() => setShowQRModal(false)} className="px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors">Hủy</button>
                  <button onClick={handleQRConfirm} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">Xác nhận thanh toán</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Cart;
