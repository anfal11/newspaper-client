
import { FiDollarSign } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";


const adminHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxios();

  const { data: stats = [] } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure.get("/api/v1/admin-stats");
      return res.data;
    },
  });

  return (
    <div className="px-36 mt-20">
      <h1 className="text-3xl font-bold">Hi, Welcome </h1>

      {user?.displayName ? (
        <p className="text-xl font-semibold">{user?.displayName}</p>
      ) : (
        "Back!"
      )}

      <div className="stats shadow mt-20">
        <div className="stat p-10">
          <div className="stat-figure text-secondary">
            <FiDollarSign className="text-4xl" />
          </div>
          <div className="stat-title">Revenue</div>
          <div className="stat-value">${stats?.revenue}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <FaUser className="text-4xl" />
          </div>
          <div className="stat-title">Customers:</div>
          <div className="stat-value">{stats?.users}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Orders:</div>
          <div className="stat-value">{stats?.orders}</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
          {/* <BiSolidFoodMenu className="text-4xl" /> */}
          </div>
          <div className="stat-title">Total Menu:</div>
          <div className="stat-value">{stats?.menu}</div>
        </div>
      </div>
    </div>
  );
};

export default adminHome;
