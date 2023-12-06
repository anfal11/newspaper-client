import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { Puff } from "react-loader-spinner";
import { FcApprove, FcDisapprove } from "react-icons/fc";
import useAxios from "../../Hooks/useAxios";
import toast from "react-hot-toast";

const AllArticles = () => {
  const [articles, setArticles] = useState([]);
  const [users, setUsers] = useState([]);
  const [reason, setReason] = useState("");
  const [premiumArticles, setPremiumArticles] = useState({});
  const { loader } = useAuth();
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const articlesResponse = await axios.get("https://newspaper-server-side.vercel.app/articles");
        const usersResponse = await axios.get("https://newspaper-server-side.vercel.app/users");

        setArticles(articlesResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const userDB = users?.map((user) => user?.email);
  console.log(userDB, "userDB");

  const handleApprove = (articleId) => {
    axiosSecure
      .patch(`/articles/approve/${articleId}`)
      .then((result) => {
        console.log(result.data);
        toast.success("Article Approved!");
        // Optionally, you can trigger a refetch of articles after approval
      })
      .catch((error) => {
        console.error("Error approving article:", error);
        toast.error("Failed to approve article.");
      });
  };

  const handleDecline = (articleId) => {
    if (reason) {
      axiosSecure
        .patch(`/articles/decline/${articleId}`, { declineReason: reason })
        .then((result) => {
          console.log(result.data);
          toast.success("Article Declined!");
          // Optionally, you can trigger a refetch of articles after decline
        })
        .catch((error) => {
          console.error("Error declining article:", error);
          toast.error("Failed to decline article.");
        });
    } else {
      toast.error("Please provide a decline reason.");
    }
  };

  const handleMakePremium = (articleId) => {
    axiosSecure
      .patch(`/articles/make-premium/${articleId}`)
      .then((result) => {
        console.log(result.data);
  
        toast.success("Article marked as Premium!");
      })
      .catch((error) => {
        console.error("Error marking article as Premium:", error);
        toast.error("Failed to mark article as Premium.");
      });
  };
  console.log(premiumArticles, "premiumArticles");
  
  

  return (
    <div className="my-10">
      {loader ? (
        <Puff color="#00BFFF" height={100} width={100} />
      ) : (
        <>
          <h1 className="text-2xl text-gray-500 underline text-center my-10">All Articles </h1>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Article Title</th>
                  <th>Author Name</th>
                  <th>Author Email</th>
                  <th>Posted Date</th>
                  <th>Status</th>
                  <th>Publisher</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((article) => {
                  const authorUser = users.find((user) => user?.name === article?.publisher);
                 
  
                  return (
                    <tr key={article.id}>
                      <td className="font-semibold">{article?.title}</td>
                      <td>{article?.publisher}</td>
                      <td>{authorUser?.email}</td>
                      <td>{article?.postedDate}</td>
                      <td>
                        {article?.status === 'approved' ? (
                          <span className="text-green-500 font-semibold">Approved</span>
                        ) : article?.status === 'declined' ? (
                          <span className="text-red-500 font-semibold">Declined</span>
                        ) : (
                          <span className="text-yellow-500 font-semibold">Pending</span>
                        )}
                      </td>
                      <td>{article?.publisher}</td>
                      <td className="flex items-center gap-2">
                        {article?.status === 'approved' ? (
                          <span className="text-green-500 font-semibold">Approved</span>
                        ) : article?.status === 'declined' ? (
                          <span className="text-red-500 font-semibold">Declined</span>
                        ) : (
                          <>
                            <button onClick={() => handleApprove(article?._id)}>
                              <FcApprove className="text-3xl" />
                            </button>
                            <button>
                              <FcDisapprove
                                className="text-3xl"
                                onClick={() => document.getElementById('my_modal_5').showModal()}
                              />
                            </button>
                            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                              <div className="modal-box">
                                <h3 className="font-bold text-lg">Hello, type the reason for decline!</h3>
                                <p className="py-4">Press ESC key to close</p>
                                <textarea
                                  type="text"
                                  className="border-2 outline-none border-gray-300 p-2 w-full"
                                  placeholder="Type decline reason"
                                  value={reason}
                                  onChange={(e) => setReason(e.target.value)}
                                />
                                <div className="modal-action">
                                  <form method="dialog">
                                    <button className="btn" onClick={() => handleDecline(article?._id)}>
                                      Submit
                                    </button>
                                  </form>
                                </div>
                              </div>
                            </dialog>
                          </>
                        )}
  
                        {article?.status === 'approved' && (
  <>
    { !article?.isPremium && (
      <button className="btn bg-yellow-500" onClick={() => handleMakePremium(article._id)}>Make Premium</button>
    )} 
    {article?.isPremium && (
      <span className="text-green-500 font-semibold">Premium</span>
    )}
  </>
)}



                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
  
};

export default AllArticles;
