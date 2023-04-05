import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const Payment = () => {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
    } else {
      try {
        const response = await fetch('http://localhost:3001/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ amount: 1000, token: paymentMethod }),
        });
        if (response.ok) {
          // handle successful payment
        } else {
          throw new Error('Failed to process payment');
        }
      } catch (error) {
        setErrorMessage(error.message);
      }
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Payment Information</h2>
      <label>
        Card Information
        <CardElement />
      </label>
      <button type="submit" disabled={!stripe || loading}>
        {loading ? 'Processing...' : 'Pay'}
      </button>
      {errorMessage && <div className="error">{errorMessage}</div>}
    </form>
  );
};

export default Payment;
