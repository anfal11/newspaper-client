import { Button, Typography } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import { Puff } from "react-loader-spinner";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { Link} from "react-router-dom";
// import { useEffect, useState } from "react";


const UserProfile = () => {
    // const [u, setU] = useState(null);
  const { user, loading } = useAuth();
  console.log(user);
  // useEffect(() => {
 
  //     fetch(`http://localhost:5000/users/6563bdf4bdab3a858375068e`)
  //       .then(res => res.json())
  //       .then(data => {
  //         setU(data);
  //         console.log(data);
  //       })

  // }, [u._id]);
  
  
 

  return (
    <div className="pt-36 max-w-7xl mx-auto">
      <Typography variant="h3" className="text-center underline" gutterBottom>
        User Profile
      </Typography>
      <div>
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
        ) :
      
          <div className="flex flex-col items-center py-2">
            <img className="w-[10%] h-[10%] rounded-full" src={user?.photoURL} alt="" />
            <p className="text-xl font-bold">Name:  {user?.displayName}</p>
            <p className="text-xl font-bold">Email: {user?.email}</p>
          </div>
     
    }
      </div>
      <Link
      className="flex justify-center"
      to={`/update-profile/${user?.uid}`}
      >
      <Button variant="outlined" startIcon={<ModeEditIcon />}>
  Update Profile
</Button>
      </Link>
    </div>
  );
};

export default UserProfile;
