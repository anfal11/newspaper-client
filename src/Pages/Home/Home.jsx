import { useEffect, useState } from "react";
import Banner from "../../Component/Home/Banner";
import { useNavigate } from "react-router-dom";
import Subscription from "../Subscription/Subscription";
import Count from "../../Component/Home/Count";
import TrendingCards from "../Articles/TrendingCards";
import AllPublisher from "../../Component/Home/AllPublisher";
import CallUs from "../../Component/Home/CallUs";

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const navigateToSubscriptionPage = () => {
    navigate("/subscription");
  };

  const closeBanner = () => {
    setShowModal(false);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowModal(true);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div>
      <div>
        {showModal && (
          <div
            style={{
              position: "fixed",
              zIndex: 30,
              padding: "50px",
              borderRadius: "8px",
              width: "400px",
              height: "200px",
              textAlign: "center",
              backgroundColor: "#3498db",
              top: "80%",
              left: "220px",
            }}
            className="left-1/2 bg-blue-500 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <p className="text-white mb-4 font-semibold text-xl">
              Subscribe now for premium content!
            </p>
            <button className="btn" onClick={() => navigateToSubscriptionPage()}>
              Subscribe
            </button>
            <span
              onClick={closeBanner}
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                cursor: "pointer",
                fontSize: "20px",
                color: "white",
              }}
            >
              &#10006;
            </span>
          </div>
        )}
      </div>
      <Banner></Banner>
      <TrendingCards></TrendingCards>
      <AllPublisher></AllPublisher>
      <Count></Count>
      <Subscription></Subscription>
      <CallUs></CallUs>
    </div>
  );
};

export default Home;
