import { useState } from 'react';
import axios from 'axios';
import { PaystackConsumer } from '@paystack/inline-js';

const Verification = () => {
  const [email, setEmail] = useState('');
  const [verificationStatus, setVerificationStatus] = useState(null);

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/payment/verify', { email });
      const { authorization_url, reference } = response.data;

      const paystack = new PaystackConsumer({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
        email,
        amount: 1000 * 100,
        reference,
        onSuccess: async () => {
          // Poll backend for verification status after payment
          const checkStatus = setInterval(async () => {
            const user = await axios.get('http://localhost:3000/api/user', { params: { email } }); 
            const request = user.data.verificationRequests.find(req => req.reference === reference);
            if (request && request.status === 'completed') {
              setVerificationStatus(request.result);
              clearInterval(checkStatus);
            }
          }, 2000);
        },
        onClose: () => alert('Payment closed'),
      });
      paystack.start();
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Verify Tenant/Landlord (₦1,000)</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
      />
      <button onClick={handlePayment}>Pay Now</button>
      {verificationStatus && <p>Verification Result: {verificationStatus}</p>}
    </div>
  );
};

export default Verification;