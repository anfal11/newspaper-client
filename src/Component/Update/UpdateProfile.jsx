import { Typography } from "@mui/material";
import useAuth from "../../Hooks/useAuth";
import { GrUpdate } from "react-icons/gr";
import { Puff } from "react-loader-spinner";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect } from "react";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateProfile = () => {
 
    const {user, loading} = useAuth();

    useEffect(() => {
      fetch(`http://localhost:5000/users/${user?.uid}`)
        .then(res => res.json())
        .then(data => {
          console.log(data);
        })
    }, [user?.uid]);


    const handleUpdate = async(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const name = form.get('name');
        const email = form.get('email');
        const image = form.get('image');
        console.log(image, name, email);

        const imgbbResponse = await axios.post(image_hosting_api, form, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
    
        const imageURL = imgbbResponse.data?.data?.url;
        console.log('image uplaoded to imgbb', imgbbResponse?.data);
    
        
        try {
          const res = await axios.patch(
            'http://localhost:5000/users',
            {
              name,
              email,
              image: imageURL, 
            }
          );
          if(res.data.modifiedCount > 0){
            toast.success('User successfully updated');
          }
    }
   catch (e) {
    console.error('Error registering user in MongoDB:', e);
    toast.error('Failed to create user. Please try again.');
  }
}
  return (
    <div className="pt-36">
      {
        !loading ? <>
        <Typography variant="h3" className="text-center underline" gutterBottom>
        Update Your Profile Here
      </Typography>

      <section className="max-w-3xl mx-auto">
        <div className="flex flex-col items-center justify-center px-6 mx-auto lg:py-4">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">

              <form className="space-y-4 md:space-y-6" onSubmit={handleUpdate}>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Your name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    defaultValue={user?.displayName}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    placeholder="username"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Image</label>
                  <input
                    type="file"
                    name="image"
                    id="image"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    defaultValue={user?.photoURL}
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    defaultValue={user?.email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                    placeholder="name@company.com"
                  />
                </div>
               <div className="flex items-center">
               <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-4  text-white bg-blue-400 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Update  <GrUpdate />
                </button>
               </div>
              </form>
            </div>
          </div>
        </div>
      </section>
        </>
        : 
        <>
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
        </>
      }
    </div>
  );
};

export default UpdateProfile;
