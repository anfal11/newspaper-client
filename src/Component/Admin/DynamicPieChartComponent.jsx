
import  { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import useAxios from '../../Hooks/useAxios';

const DynamicPieChartComponent = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxios()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articles = await axiosPublic.get('/articles');


        console.log('articles', articles);
        
        const publicationData = articles.reduce((result, article) => {
          result[article.publisher] = (result[article.publisher] || 0) + 1;
          return result;
        }, {});

        const totalArticles = articles.length;

        const publicationChartData = Object.entries(publicationData).map(([publication, count]) => [
          publication,
          (count / totalArticles) * 100,
        ]);

        setData([['Publication', 'Percentage'], ...publicationChartData]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [axiosPublic]);

  return (
    <div>
      <h1>Dynamic Pie Chart</h1>
      <Chart
        width={'500px'}
        height={'300px'}
        chartType="PieChart"
        loader={<div>Loading Chart</div>}
        data={data}
        options={{
          title: 'Publication Articles Percentage',
        }}
      />
    </div>
  );
};

export default DynamicPieChartComponent;
