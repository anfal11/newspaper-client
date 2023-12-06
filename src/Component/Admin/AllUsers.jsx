import { useQuery } from "@tanstack/react-query";
import {MdDelete} from 'react-icons/md'
import {FaUsers} from 'react-icons/fa'
import Swal from "sweetalert2";
import useAxios from "../../Hooks/useAxios";


const AllUsers = () => {
  const axiosSecure = useAxios();

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get('/users'

      );
      return res.data;
    },
  });

  

  console.log(users);
  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Are you sure you want to remove this user?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!"
    }).then((result) => {
      if (result.isConfirmed) {

          axiosSecure.delete(`/users/${user._id}`)
          .then((result) => {
              if (result.data.modifiedCount > 0) {
                refetch();
                  Swal.fire({
                      title: "Removed!",
                      text: "Your item has been removed.",
                      icon: "success"
                    });
              }
          })

        
      }
    });
  }

  const handleMakeAdmin = (user) => {
    axiosSecure.patch(`/users/admin/${user._id}`)
    .then((result) => {
      if (result.data.modifiedCount > 0) {
        Swal.fire({
          position: 'top-end',
          title: `${user?.name} is an Admin Now...`,
          showConfirmButton: false,
          icon: "success",
          timer: 1500,
        });
        refetch();

  }
    });
  }

  return (
    <div className="">
      <div className="mt-10">
          <h1 className="text-xl text-center text-gray-500 font-bold my-16 underline lg:text-4xl">All Users</h1>
        <div className="flex justify-evenly">
          <h1 className="text-xl lg:text-4xl">Total Users: {users?.length}</h1>
          {/* <button className="btn text-base lg:text-3xl bg-blue-500">
            Pay
          </button> */}
        </div>

        <div className="my-20">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>#</th>
                  <th>User Name</th>
                  <th>User Email</th>
                  <th>Roll</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users?.map((user, index) => (
                  <tr key={user?._id}>
                    <td>{index + 1}</td>
                    <td className="lg:text-xl">{user?.name}</td>
                    <td>
                      <div className="flex items-center space-x-2">
                        <h1 className="lg:text-xl">{user?.email}</h1>
                      </div>
                    </td>
                    <td>
                    {
                      user?.role === 'admin' ? <p className="text-xl font-bold text-gray-500">Admin</p> :
                      <button onClick={()=> handleMakeAdmin(user)}>
                <FaUsers className="text-2xl lg:text-4xl bg-blue-500 text-white p-1" />
                </button>
                    }
                    </td>                   
                    <td>
                      <button onClick={()=> handleDeleteUser(user)}>
                <MdDelete className="text-2xl lg:text-4xl text-red-500" />
                </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
