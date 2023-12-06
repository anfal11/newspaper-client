// import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ArticleCard from "../../Component/ArticleCard/ArticleCard";
import useAuth from "../../Hooks/useAuth";
import { Puff } from "react-loader-spinner";
import { FormControl, IconButton, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const AllArticles = () => {
  const [asc, setAsc] = useState(true);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [article, setArticle] = useState([]);
  const {loading} = useAuth();


  useEffect(() => {
    axios
      .get(
        `https://newspaper-server-side.vercel.app/articles?sort=${
          asc ? "asc" : "desc"
        }&search=${search}`
      )
      .then((res) => {
        const approvedArticles = res.data.filter((article) => article.status === "approved");
        setFilter(approvedArticles);
        setArticle(approvedArticles);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, [asc, search]);

  // const loading = authLoading || usersLoading;

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.elements.search.value);
  };

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
         
          <h1 className="my-10"> </h1>
          <div className="flex items-center gap-2">
            <form
              onSubmit={handleSearch}
              className="w-full flex items-center gap-2"
            >
              <TextField
                id="outlined-basic"
                label="Search here by title"
                variant="outlined"
                style={{ width: "100%" }}
                name="search"
              />
              <IconButton
                size="large"
                type="submit"
                aria-label="search"
                color="inherit"
              >
                <SearchIcon />
              </IconButton>
            </form>

            {/* <button className="bg-blue-400 text-white p-3 rounded-lg" onClick={() => refetch()}>Search</button> */}
          </div>
          <div className="my-20">
            <FormControl fullWidth>
              <div className="flex flex-col gap-2 items-center justify-center">
                <p className="font-bold text-xl">Filtered by:</p>

                <div className="flex gap-3">
                  <button
                    onClick={() => setAsc(!asc)}
                    className="btn bg-blue-500 text-white hover:bg-blue-700"
                  >
                    {asc
                      ? "Views by descending orders"
                      : "Views by ascending orders"}
                  </button>
                </div>
              </div>
            </FormControl>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 lg:p-0 gap-4">
            {search.length > 0
              ? filter?.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))
              : article?.map((article) => (
                  <ArticleCard key={article._id} article={article} />
                ))
              }
          </div>
        </>
      )}
    </div>
  );
};

export default AllArticles;
