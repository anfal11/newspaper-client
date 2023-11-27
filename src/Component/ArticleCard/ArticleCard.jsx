/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import useAuth from "../../Hooks/useAuth";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { HiEye } from "react-icons/hi";

const ArticleCard = ({ article }) => {
  const { user } = useAuth();

  const {
    _id,
    title,
    image,
    publisher,
    tags,
    viewCount,
    "short-description": shortDescription,
    "long-description": longDescription,
  } = article;

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/users");
      return res.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const matchedUser = users?.find((user) => user?.name === publisher);
  const userImage = matchedUser ? matchedUser.image : null;

  return (
    <div className="max-w-7xl mx-auto">
      <div>
        <Card sx={{ maxWidth: 345, height: 570, boxShadow:10 }}>
          <CardMedia
            component="img"
            alt="green iguana"
            image={image}
            className="h-60 w-full object-cover"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {shortDescription}
            </Typography>
          </CardContent>
          <CardActions className="flex items-center gap-2">
            <img className="rounded-full h-8 w-8" src={userImage} alt="" />
            <Button size="small">{publisher}</Button>
          </CardActions>
          <CardActions>
            <Button size="small">
              {tags.map((tag, index) => (
                <span key={index} className="bg-gray-200 rounded-full px-1 py-2 text-xs font-semibold text-gray-700 mr-2">
                  {tag}
                </span>
              ))}
            </Button>
          </CardActions>
            <p className="px-4 font-medium flex items-center gap-2"  size="small">Views: {viewCount}<HiEye /></p>
            <Link
             to={`/article/${_id}`}
             className="flex justify-center shadow-md hover:bg-blue-500 w-20 mx-auto mt-1">
            <Button className="hover:text-white rounded-md" size="small">Details</Button>
            </Link>
        </Card>
      </div>
    </div>
  );
};

export default ArticleCard;
