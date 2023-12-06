import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import { Puff } from "react-loader-spinner";

const SingleDetailsPage = () => {
  const [article, setArticle] = useState(null);
  const isClickedRef = useRef(false);
  const { id } = useParams();
  const { loading } = useAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        if (isClickedRef.current) {
          return;
        }

        isClickedRef.current = true;
        const res = await axios.get(`https://newspaper-server-side.vercel.app/articles/${id}`);
        setArticle(res?.data);
      } finally {
        isClickedRef.current = false;
      }
    };
    console.log("Effect triggered");

    fetchArticle();
  }, [id]);

  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center pt-56 ">
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
        <div className="pt-44 max-w-7xl mx-auto">
          <img className="w-[60%] mx-auto" src={article?.image} alt="" />
          <div className="w-[60%] mx-auto my-4 py-2">
            <p className="text-3xl font-semibold">Title: {article?.title}</p>
            <p className="text-xl font-medium">
              Publisher: {article?.publisher}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Tags:</span>{" "}
              {article?.tags.join(", ")}
            </p>
            <p className="text-xl">
              <span className="font-semibold">Description:</span>{" "}
              {article?.longDescription}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleDetailsPage;
