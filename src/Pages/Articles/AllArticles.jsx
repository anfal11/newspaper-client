import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArticleCard from "../../Component/ArticleCard/ArticleCard";
import useAuth from "../../Hooks/useAuth";
import { Puff } from "react-loader-spinner";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  TextField,
} from "@mui/material";

const AllArticles = () => {
  const { loading: authLoading } = useAuth();
  const {
    refetch,
    data: articles = [],
    isLoading: usersLoading,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/articles");
      return res.data;
    },
  });
  refetch();

  const loading = authLoading || usersLoading;

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl underline font-bold text-center pt-28 text-gray-500">
        {" "}
        All Articles{" "}
      </h1>

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
        <>
          {/* todo: add search and filter field */}
          <h1 className="my-10"> </h1>
          <TextField
            id="outlined-basic"
            label="Search here"
            variant="outlined"
            style={{ width: "100%" }}
          />
          <div className="my-20">
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Filter by
              </InputLabel>
              <NativeSelect
                defaultValue={30}
                inputProps={{
                  name: "filter",
                  id: "uncontrolled-native",
                }}
              >
                <option value={10}>Views</option>
                <option value={20}>Publisher Name</option>
              </NativeSelect>
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 lg:p-0 gap-4">
            {articles.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllArticles;
