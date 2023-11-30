import { useEffect, useState } from "react";
import CountUp from "react-countup";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Count = () => {
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  useEffect(() => {
    axiosPublic
      .get(`/users`)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [axiosPublic]);


  return (
    <div>
    <h2 className="text-4xl mt-20 font-bold mb-16 text-gray-500 underline text-center">Statistics</h2>
      

      <section className="flex justify-center">
      <div className="stats shadow">
        <div className="stat place-items-center">
          <div className="stat-title">All Users</div>
          <div className="stat-value">{<CountUp start={0} end={users?.length} duration={5} />}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Normal Users</div>
          <div className="stat-value text-secondary">{<CountUp start={0} end={users?.length} duration={5} />}</div>
        </div>

        <div className="stat place-items-center">
          <div className="stat-title">Premium Users</div>
          <div className="stat-value text-primary">{<CountUp start={0} end={users?.length} duration={5} />}</div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default Count;
