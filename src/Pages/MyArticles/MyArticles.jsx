import { Puff } from "react-loader-spinner";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const MyArticles = () => {
  const [userData, setUserData] = useState([]);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();


  // Function to filter articles based on the current user's email
  const filterArticlesByUserEmail = (userEmail, articles) => {
    return articles.filter((articleItem) => {
      const publisherEmail = findPublisherEmail(articleItem._id);
      return publisherEmail === userEmail;
    });
  };

  // Function to find the email of the article's publisher
  const findPublisherEmail = (articleId) => {
    const foundArticle = articles.find((articleItem) => articleItem._id === articleId);

    if (foundArticle) {
      const publisherName = foundArticle.publisher;
      const foundUser = userData.find((userItem) => userItem.name === publisherName);

      if (foundUser) {
        return foundUser.email;
      }
    }

    return null;
  };

  const { refetch, data: articles = [] } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosPublic.get("/articles");
      return res.data;
    },
  });

  useEffect(() => {
    axiosPublic.get(`/users`).then((res) => {
      setUserData(res.data);
    });
  }, [axiosPublic]);

  // Filter articles based on the current user's email
  const filteredArticles = filterArticlesByUserEmail(user?.email, articles);


  // handle article delete
  const handleDelete = (articleId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this article!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
  
         axiosSecure.delete(`/articles/${articleId}`)
         .then((result) => {
          // console.log(result.data);
          if (result.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: `Your article has been deleted`,
              position: "top-end",
              icon: "success",
            });
          }
        })
        
      }
    });
  };

  // Function to handle modal open for decline reason
  const handleDeclineReason = async (articleId) => {
    try {
      // Make a request to the server to get the decline reason based on the articleId
      const response = await axiosPublic.get(`/articles/${articleId}/declineReason`);
      const declineReason = response.data.declineReason;

      // Open a modal or use any other UI element to display the decline reason
      console.log('Decline Reason:', declineReason);
    } catch (error) {
      toast.error('Failed to fetch decline reason');
      console.error('Error fetching decline reason:', error);
    }
  };

  return (
    <div>
      <p className="text-4xl py-32 text-center text-gray-500 font-bold underline">My articles</p>
      {loading ? (
        <div className="flex justify-center">
          <Puff color="#00BFFF" height={100} width={100} />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold underline mb-4">Your total Articles: {filteredArticles.length}</p>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>Article Title</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Is Premium</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredArticles?.map((articleItem, index) => (
                  <tr key={articleItem?._id}>
                    <td>{index + 1}</td>
                    <td>{articleItem?.title}</td>
                    <td>
                      {/* Details button */}
                      <button onClick={() => handleDetails(articleItem?._id)}>{articleItem?.['short-description']}</button>
                    </td>
                    <td>
                      {/* Status */}
                      {articleItem?.status === "approved" && "Approved"}
                      {articleItem?.status === "declined" && (
                        <>
                          Declined
                          <button onClick={() => handleDeclineReason(articleItem?.declineReason)}>View Reason</button>
                        </>
                      )}
                      {articleItem?.status === "pending" && "Pending"}
                    </td>
                    <td>{articleItem?.isPremium ? "Yes" : "No"}</td>
                    <td>
                    <Link to={`/update-article/${articleItem._id}`}>
                    <button>Update</button>
                    </Link>
                    </td>
                    <td>
                      {/* Delete button */}
                      <button onClick={() => handleDelete(articleItem?._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
