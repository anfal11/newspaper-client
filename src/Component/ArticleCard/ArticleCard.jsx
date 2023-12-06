import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { HiEye } from "react-icons/hi";

const truncateText = (text, wordLimit) => {
  const words = text.split(' ');
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(' ') + '...';
  } else {
    return text;
  }
};
const ArticleCard = ({ article }) => {
  const { user } = useAuth();
  const [hasSubscription, setHasSubscription] = useState(false);

  const {
    _id,
    title,
    image,
    publisher,
    tags,
    viewCount,
    isPremium,
    "shortDescription": shortDescription,
  } = article;

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("https://newspaper-server-side.vercel.app/users");
      return res.data;
    },
  });
 
  useEffect(() => {
    // Check if the user has a subscription
    const checkSubscription = async () => {
      try {
        const res = await axios.get("https://newspaper-server-side.vercel.app/subscription"); // Assuming there's an endpoint to get subscription details
        setHasSubscription(res.data.hasSubscription);
      } catch (error) {
        console.error("Error fetching subscription details:", error);
      }
    };

    checkSubscription();
  }, []);

  const matchedUser = users?.find((user) => user?.name === publisher);
  const userImage = matchedUser ? matchedUser.image : null;

  return (
    <div className="max-w-7xl mx-auto">
      <Card sx={{ maxWidth: 345, height: 600, boxShadow: 10 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          image={image}
          className="h-60 w-full object-cover"
        />
        {isPremium && (
          <p className="relative -top-[40%] left-[70%] w-24 text-center bg-yellow-700 text-white px-2 py-1 rounded-md font-semibold">
            Premium
          </p>
        )}

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {truncateText(shortDescription, 20)}
          </Typography>
        </CardContent>
        <CardActions className="flex items-center gap-2">
          <img className="rounded-full h-8 w-8" src={userImage} alt="" />
          <Button size="small">{publisher}</Button>
        </CardActions>
        <CardActions>
          <Button size="small">
            {tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-200 rounded-full px-1 py-2 text-xs font-semibold text-gray-700 mr-2"
              >
                {tag}
              </span>
            ))}
          </Button>
        </CardActions>
        <p className="px-4 font-medium flex items-center gap-2" size="small">
          Views: {viewCount}
          <HiEye />
        </p>
        {isPremium && !hasSubscription ? (
          <div className="flex justify-center  shadow-md w-20 mx-auto mt-1">
          <Button
            className="disabled:opacity-70 text-black rounded-md"
            disabled={!hasSubscription}
            size="small"
          >
            Details
          </Button>
          </div>
        ) : (
          <Link
            to={`/article/${_id}`}
            className="flex justify-center shadow-md hover:bg-blue-500 w-20 mx-auto mt-1"
          >
            <Button className=" rounded-md" size="small">
              Details
            </Button>
          </Link>
        )}
      </Card>
    </div>
  );
};

export default ArticleCard;
