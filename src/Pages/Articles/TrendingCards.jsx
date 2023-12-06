import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { HiEye } from "react-icons/hi";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const TrendingCards = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    axios
      .get("https://newspaper-server-side.vercel.app/articles")
      .then((res) => {
        setArticles(res.data);
      })
      .catch((error) => {
        console.error("Error fetching articles:", error);
      });
  }, []);

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://newspaper-server-side.vercel.app/users");
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  // Sorting articles by viewCount in descending order
  const sortedArticles = articles.slice().sort((a, b) => b.viewCount - a.viewCount);

  // Selecting the top 6 trending articles
  const trendingArticles = sortedArticles.slice(0, 6);



  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-28 text-gray-500 underline text-center">Trending Articles</h2>
      <Swiper
            // slidesPerView={3}
        spaceBetween={30}
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        pagination={true}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
        }}
      >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {trendingArticles.map((article) => {
        const matchedUser = users?.find((user) => user?.name === article?.publisher);
        const userImage = matchedUser ? matchedUser.image : null;

        return (
          <div key={article._id} className="trending-card">
          <SwiperSlide >
            <div className="max-w-7xl mx-auto">
              <div>
                <Card sx={{ maxWidth: 345, height: 520, boxShadow: 10 }}>
                  <CardMedia
                    component="img"
                    alt="green iguana"
                    image={article?.image}
                    className="h-60 w-full object-cover"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {article?.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {article?.shortDescription}
                    </Typography>
                  </CardContent>
                  <CardActions className="flex items-center gap-2">
                    <img className="rounded-full h-8 w-8" src={userImage} alt="" />
                    <Button size="small">{article?.publisher}</Button>
                  </CardActions>
                  <CardActions>
                    <Button size="small">
                      {article?.tags.map((tag, index) => (
                        <span key={index} className="bg-gray-200 rounded-full px-1 py-2 text-xs font-semibold text-gray-700 mr-2">
                          {tag}
                        </span>
                      ))}
                    </Button>
                  </CardActions>
                  <p className="px-4 font-medium flex items-center gap-2" size="small">
                    Views: {article?.viewCount}
                    <HiEye />
                  </p>
                  <Link to={`/article/${article?._id}`} className="flex justify-center shadow-md hover:bg-blue-500 w-20 mx-auto mt-1">
                    <Button className="hover:text-white rounded-md" size="small">
                      Details
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
            </SwiperSlide>
          </div>
        );
      })}
      </div>
      </Swiper>
      <div className="flex justify-center">
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-10">
        <Link to="/all-articles">View All Articles</Link>
        </button>
      </div>
    </div>
  );
};

export default TrendingCards;
