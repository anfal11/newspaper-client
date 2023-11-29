import { Puff } from "react-loader-spinner";
import useAuth from "../../Hooks/useAuth";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import MyArticleCard from "../../Component/ArticleCard/MyArticleCard";

const MyArticles = () => {
  const [userData, setUserData] = useState([]);
  const [article, setArticle] = useState([]);
  const { user, loading } = useAuth();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get(`/articles`).then((res) => {
      setArticle(res.data);
    });
  }, [axiosPublic]);

  useEffect(() => {
    axiosPublic.get(`/users`).then((res) => {
      setUserData(res.data);
    });
  }, [axiosPublic]);

  // Function to filter articles based on the current user's email
  const filterArticlesByUserEmail = (userEmail) => {
    return article.filter((articleItem) => {
      const publisherEmail = findPublisherEmail(articleItem._id);
      return publisherEmail === userEmail;
    });
  };

  // Function to find the email of the article's publisher
  const findPublisherEmail = (articleId) => {
    const foundArticle = article.find((articleItem) => articleItem._id === articleId);

    if (foundArticle) {
      const publisherName = foundArticle.publisher;
      const foundUser = userData.find((userItem) => userItem.name === publisherName);

      if (foundUser) {
        return foundUser.email;
      }
    }

    return null;
  };

  // Filter articles based on the current user's email
  const filteredArticles = filterArticlesByUserEmail(user?.email);

  return (
    <div>
      <p className="text-4xl py-32 text-center text-gray-500 font-bold underline">
        My articles
      </p>
      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Puff
            height="80"
            width="80"
            radius={1}
            color="#4fa94d"
            ariaLabel="puff-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <p className="text-2xl font-semibold underline mb-4">Your total Articles: {filteredArticles.length}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 lg:p-0 gap-4">
          {filteredArticles?.map((articleItem) => <MyArticleCard key={articleItem._id} article={articleItem}></MyArticleCard>)}
          </div>
        </div>
      )}
    </div>
  );
};

export default MyArticles;
