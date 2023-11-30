import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAdmin from '../../Hooks/useAdmin';

const AllArticles = () => {
  const [isAdmin] = useAdmin();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/users');
          setUserData(response.data);
          console.log(response.data); 
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
        fetchData();
  }, []);
  

  return (
    <div>
      {isAdmin ? (
        <div>
          <h1 className="text-2xl text-black">Admin</h1>
          {userData && (
            <div>
              {/* Render user data here */}
              {userData.map((user) => (
                <div key={user.id}>{user.name}</div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-2xl text-black">User</h1>
      )}
    </div>
  );
};

export default AllArticles;
