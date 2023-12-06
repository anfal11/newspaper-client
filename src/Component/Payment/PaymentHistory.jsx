import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxios from "../../Hooks/useAxios";

const PaymentHistory = () => {
  const { user } = useAuth();
const axiosSecure = useAxios();

  const { data: payments = [] } = useQuery({
    queryKey: ["payments", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/payments/${user.email}`,
        payments
      );
      return res.data;
    },
  });

  console.log(payments);
  return (
    <div>
      <div className="my-20 px-16">
        <h2 className="text-2xl text-center"> Total Payments: {payments?.length}</h2>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>EMAIL</th>
                <th>TRANSACTION ID</th>
                <th>TOTAL PRICE</th>
                <th>PAYMENT STATUS</th>
                <th>PAYMENT DATE</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {payments.map((item) => (
                <tr key={item._id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <h2 className="text-base">{item?.email}</h2>
                      </div>
                    </div>
                  </td>

                  <td className="lg:text-xl">{item?.transactionId}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs lg:text-xl">
                      {item?.price}
                    </button>
                  </th>
                  <td>
                    <h2>{item?.status}</h2>
                  </td>
                  <td>
                    <h2>{item?.date}</h2>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;
