import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { HiEye } from "react-icons/hi";
import { Link } from "react-router-dom";

const MyArticleCard = ({ article }) => {
  const {
    _id,
    title,
    publisher,
    tags,
    viewCount,
    "shortDescription": shortDescription,
  } = article;

  console.log(article._id, title);

  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <div>
          <Card sx={{ maxWidth: 345, height: 570, boxShadow: 10 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              image={article?.image}
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
              {/* <img className="rounded-full h-8 w-8" src={image} alt="" /> */}
              <Button size="small">{publisher}</Button>
            </CardActions>
            <CardActions>
              {tags?.map((tag, index) => (
                <div
                  key={index}
                  className="bg-gray-200 rounded-full px-1 py-2 text-xs font-semibold text-gray-700 mr-2"
                >
                  {tag}
                </div>
              ))}
            </CardActions>

            <p
              className="px-4 font-medium flex items-center gap-2"
              size="small"
            >
              Views: {viewCount}
              <HiEye />
            </p>
            <Link
              to={`/article/${_id}`}
              className="flex justify-center shadow-md hover:bg-blue-500 w-20 mx-auto mt-1"
            >
              <Button className="hover:text-white rounded-md" size="small">
                Details
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default MyArticleCard;
