import React from 'react';
import QRCode from 'qrcode.react';
import { toast } from 'react-toastify';

const PaymentQR = ({ amount, onPaymentComplete, onCancel }) => {
  const paymentData = {
    amount: amount,
    timestamp: new Date().toISOString()
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center">Scan QR to Pay</h2>
        
        <div className="flex justify-center mb-4">
          <QRCode 
            value={JSON.stringify(paymentData)}
            size={200}
            level="H"
          />
        </div>

        <div className="text-center mb-4">
          <p className="text-lg font-semibold">Amount: ₹{amount}</p>
        </div>

        <div className="flex justify-center space-x-4">
          <button
            onClick={() => {
              toast.success("Payment Successful!");
              onPaymentComplete({
                amount: amount,
                paymentId: "QR_" + Date.now(),
                status: 'success'
              });
            }}
            className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
          >
            Pay Now
          </button>
          <button
            onClick={onCancel}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentQR; 