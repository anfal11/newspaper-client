import { Button, Typography } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
// import { Puff } from "react-loader-spinner";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link} from "react-router-dom";
import { useEffect, useState } from "react";



const UserProfile = () => {
  const [u, setU] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetch(`http://localhost:5000/users`)
      .then((res) => res.json())
      .then((data) => {
        setU(data);
      });
  }, []);

  // Check if u is an array before using filter
  const userData = Array.isArray(u) ? u.find((users) => users?.email === user?.email) : [];
  console.log(userData);

  return (
    <div className="pt-36 max-w-7xl mx-auto">
      <Typography variant="h3" className="text-center underline" gutterBottom>
        User Profile
      </Typography>
      <div>
        {userData && (
          <div className="flex flex-col items-center py-2">
  <img
    src={userData?.image}
    alt=""
    className="rounded-full h-40 w-40 object-cover"
  />
  <p className="text-xl font-bold">Name: {userData?.name}</p>
  <p className="text-xl font-bold">Email: {userData?.email}</p>
  <p className="text-xl font-bold">ID: {userData?._id}</p>
</div>

        )}
      </div>
      <Link className="flex justify-center" to={`/update-profile/${userData?._id}`}>
        <Button variant="outlined" startIcon={<ModeEditIcon />}>
          Update Profile
        </Button>
      </Link>
    </div>
  );
};

export default UserProfile;
