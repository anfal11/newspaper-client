import useAuth from '../../Hooks/useAuth';
import { Puff } from 'react-loader-spinner';
import DynamicPieChartComponent from './DynamicPieChartComponent';
import { Chart } from 'react-google-charts';
import { useEffect, useState } from 'react';
import useAxios from '../../Hooks/useAxios';
import { PiUsersThreeFill } from "react-icons/pi";
import { IoCellularOutline } from "react-icons/io5";


const AdminHome = () => {
  const [data, setData] = useState([]);
  const [users, setUsers] = useState([]);
  const [totalViews, setTotalViews] = useState(0); // Add state for totalViews
  const [totalPosts, setTotalPosts] = useState(0); // Add state for totalPosts
  const { user } = useAuth();
  const axiosPublic = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch articles to get post data
        const articlesResponse = await axiosPublic.get('/articles');
        const articles = articlesResponse.data;
  
        // Fetch users to get publisher data
        const usersResponse = await axiosPublic.get('/users');
        const users = usersResponse.data;
  
        console.log('articles', articles);
        console.log('users', users);
  
        if (!Array.isArray(articles) || !Array.isArray(users)) {
          throw new Error('Invalid response format. Expected an array.');
        }
  
        setUsers(users);  // Set the users state
  
        // Map user data to a dictionary for quick lookup
        const userDictionary = users.reduce((dict, user) => {
          dict[user.name] = user;
          return dict;
        }, {});
  
        // Count the number of posts for each publisher
        const publisherPostCounts = articles.reduce((counts, article) => {
          const publisherName = article.publisher;
          const publisher = userDictionary[publisherName];
  
          if (publisher) {
            counts[publisherName] = (counts[publisherName] || 0) + 1;
          }
  
          return counts;
        }, {});
  
        // Convert publisherPostCounts to an array for the Bar Chart
        const userChartData = Object.entries(publisherPostCounts).map(([publisher, postCount]) => [
          publisher,
          postCount,
        ]);
  
        setData([['Publisher', 'Post Count'], ...userChartData]);
  
        // Calculate total views and total posts
        const totalViewsCount = articles.reduce((total, article) => total + (article.viewCount || 0), 0);
        const totalPostsCount = articles.length;
  
        setTotalViews(totalViewsCount);
        setTotalPosts(totalPostsCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [axiosPublic]);
  

  return (
    <div className="px-36 mt-20 max-w-7xl mx-auto mb-20">
      <h1 className="text-5xl mb-4 text-gray-500 font-bold">Hi, Welcome</h1>

      {user?.displayName ? (
        <p className="text-xl text-gray-500 font-semibold">{user?.displayName} Back!</p>
      ) : (
        <Puff color="#00BFFF" height={100} width={100} />
      )}

      <div className="stats shadow my-10">
        {/* Total Users stat div */}
        <div className="stat">
          <div className="stat-figure text-primary">
          <PiUsersThreeFill className='text-4xl text-blue-500' />
          </div>
          <div className="stat-title">Total Users</div>
          <div className="stat-value text-blue-500">{users?.length}</div>
          <div className="stat-desc">21% more than last month</div>
        </div>

        {/* Total Views stat div */}
        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <div className="stat-title">Total Views</div>
          <div className="stat-value text-secondary">{totalViews}</div>
          <div className="stat-desc">55% more than last month</div>
        </div>

        {/* Total Posts stat div */}
        <div className="stat">
          <div className="stat-figure text-secondary">
            <div className="avatar online">
              <div className="w-16 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" alt="user avatar" />
              </div>
            </div>
          </div>
          <div className="stat-value">{totalPosts}</div>
          <div className="stat-title">Total Posts</div>
          <div className="stat-desc text-secondary"></div>
        </div>
      </div>

      {/* Dynamic Pie Chart for percentage of articles based on publisher */}
      <DynamicPieChartComponent />

      {/* Static Bar Chart for users' article based*/}
      <div className="mt-8">
        <h2 className="flex items-center gap-5 text-2xl font-semibold text-gray-500">Users Bar Chart <PiUsersThreeFill className='text-4xl' /></h2>
        <Chart
          width={'600px'}
          height={'400px'}
          chartType="BarChart"
          loader={<div><Puff color="#00BFFF" height={100} width={100} /></div>}
          data={data}
          options={{
            title: 'Publisher Post Count',
            colors: ['#60A5FA'],
          }}
        />
      </div>

      {/* Static Line Chart example just */}
      <div className="mt-8">
        <h2 className="flex items-center gap-5 text-2xl font-semibold text-gray-500">Static Line Chart <IoCellularOutline  className='text-4xl' /></h2>
        <Chart
          width={'500px'}
          height={'300px'}
          chartType="LineChart"
          loader={<div><Puff color="#00BFFF" height={100} width={100} /></div>}
          data={[
            ['posts', 'Publishers'],
            [0, 0],
            [1, 10],
            [2, 23],
            [3, 17],
            [4, 18],
            [5, 9],
            [6, 11],
            [7, 27],
            [8, 33],
            [9, 40],
            [10, 32],
          ]}
          options={{
            title: 'Static Line Chart',
          }}
        />
      </div>
    </div>
  );
};

export default AdminHome;
