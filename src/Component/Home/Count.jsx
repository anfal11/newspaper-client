import axios from 'axios';
import { useEffect, useState } from 'react';
import CountUp from 'react-countup';

const Count = () => {
    const [article, setArticle] = useState([]);
    useEffect(() => {
        axios
          .get(
            `http://localhost:5000/articles`
          )
          .then((res) => {
            setArticle(res.data);
          })
          .catch((error) => {
            console.error("Error fetching articles:", error);
          });
      }, []);

      const calculateTotalViews = (articles) => {
        return articles.reduce((totalViews, article) => totalViews + article.views, 0);
      };
    return (
        <div>
           <CountUp
  start={0}
  end={calculateTotalViews}
  duration={5}

/>
        </div>
    );
};

export default Count;