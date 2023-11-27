import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArticleCard from "../../Component/ArticleCard/ArticleCard";

const AllArticles = () => {

    const { refetch, data: articles = []} = useQuery({
        queryKey: ["articles"],
        queryFn: async () => {
            const res =  await axios.get("http://localhost:5000/articles");
            return res.data
        }
    });
    refetch();

    return (
        <div>
            <h1 className="text-3xl underline font-bold text-center pt-28 text-gray-500"> All Articles </h1>

            {
                articles.map(article => <ArticleCard key={article._id} article={article} />)
            }
        </div>
    );
};

export default AllArticles;