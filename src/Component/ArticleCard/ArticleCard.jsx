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

const ArticleCard = ({ article }) => {
  const { user } = useAuth();

  const {
    _id,
    title,
    image,
    publisher,
    tags,
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
      <div></div>
      <div>
        <Card sx={{ maxWidth: 345, height: 550}}>
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
              {tags.map((tag) => (
                <span className="bg-gray-200 rounded-full px-1 py-2 text-sm font-semibold text-gray-700 mr-2">
                  {tag}
                </span>
              ))}
            </Button>
          </CardActions>
            <Link>
            <Button size="small">Details</Button>
            </Link>
        </Card>
      </div>
    </div>
  );
};

export default ArticleCard;
