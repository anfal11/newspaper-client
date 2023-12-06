
import  { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import useAxios from '../../Hooks/useAxios';
import { Puff } from 'react-loader-spinner';
import { GrArticle } from "react-icons/gr";

const DynamicPieChartComponent = () => {
  const [data, setData] = useState([]);
  const axiosPublic = useAxios()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosPublic.get('/articles');
        const articles = response.data; 
    
        console.log('articles', articles);
        
        if (!Array.isArray(articles)) {
          throw new Error('Invalid response format. Expected an array.');
        }
    
        const publicationData = articles?.reduce((result, article) => {
          result[article?.publisher] = (result[article?.publisher] || 0) + 1;
          return result;
        }, {});
    
        const totalArticles = articles?.length;
    
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
    <div className='mt-10'>
      <h2 className="flex items-center gap-5 text-2xl font-semibold text-gray-500">Publication Articles Percentage Pie Chart <GrArticle className='text-4xl' /></h2>
      <Chart
        width={'600px'}
        height={'400px'}
        chartType="PieChart"
        loader={<div>
        <Puff color="#00BFFF" height={100} width={100} />
        </div>}
        data={data}
        options={{
          title: 'Publication Articles Percentage',
          colors: ['#60A5FA', '#FF1493', '#FF8C00', '#FFD700', '#7C3AED', '#34D399', '#F87171', '#FBBF24', '#6EE7B7', '#93C5FD', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80', '#FBBF24', '#F472B6', '#A78BFA', '#FCD34D', '#4ADE80'],
        }}
      />
    </div>
  );
};

export default DynamicPieChartComponent;
