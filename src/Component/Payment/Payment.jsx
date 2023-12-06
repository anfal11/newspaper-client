import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK)
const Payment = () => {
  const location = useLocation();
  // const { period, price } = new URLSearchParams(location.search);

  // useEffect(() => {
  //   // Your logic to handle payment and finalize the subscription
  //   console.log("Processing payment for", period, "at price", price);
  //   // Implement payment processing logic using a payment gateway (e.g., Stripe)
  // }, [period, price]);

  return (
    <div>
      <div>
            <Elements stripe={stripePromise}>
      <CheckOutForm />
    </Elements>
            </div>
    </div>
  );
};

export default Payment;
