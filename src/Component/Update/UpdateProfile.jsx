import { Typography } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
// import { useParams } from "react-router-dom";

const UpdateProfile = () => {
    // const { id } = useParams();
    const {user, loading} = useAuth();
  return (
    <div className="pt-36">
      <Typography variant="h3" className="text-center underline" gutterBottom>
        Update Your Profile Here
      </Typography>
    </div>
  );
};

export default UpdateProfile;
