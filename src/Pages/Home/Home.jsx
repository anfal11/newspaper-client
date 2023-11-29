import { useEffect, useState } from "react";
import Banner from "../../Component/Home/Banner";
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // ... (previous code)
  
    const navigateToSubscriptionPage = () => {
      navigate('/subscription');
    };
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setShowModal(true);
      }, 10000); // 10 seconds
  
      return () => clearTimeout(timeoutId); 
    }, []); 
    return (
        <div>
            <Banner></Banner>
        <div>
        {showModal && (
        <div className="modal">
          <p>Subscribe now for premium content!</p>
          <button onClick={() => navigateToSubscriptionPage()}>Subscribe</button>
        </div>
      )}
        </div>
        </div>
    );
};

export default Home;