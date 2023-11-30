import { MdDelete, MdEdit } from "react-icons/md";

// import useMenu from "../Hooks/useMenu";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import useAxios from "../../Hooks/useAxios";

const ManageItems = () => {
//   const [menu, , refetch] = useMenu();
  const axiosSecure = useAxios();

//   const handleDelete = (item) => {
//     console.log(item);
//     Swal.fire({
//       title: "Are you sure you want to remove the item?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, remove it!",
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         const res = await axiosSecure.delete(`/articles/${item._id}`);

//         if (res.data.modifiedCount > 0) {
//           // refetch to update the ui
//           refetch();
//           Swal.fire({
//             showConfirmButton: false,
//             title: `${item.name} has been deleted`,
//             position: "top-end",
//             icon: "success",
//             timer: 1500,
//           });
//         }
//       }
//     });
//   };

  return (
    <div>


      <div className="my-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {menu.map((item, index) => (
                <tr key={item._id}>
                  <th className="lg:text-xl">{index + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img
                            src={item?.image}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="lg:text-xl">{item?.name}</td>
                  <th>
                    <button className="btn btn-ghost btn-xs lg:text-xl">
                      {item?.price}
                    </button>
                  </th>
                  <td>
                    <Link to={`/dashboard/updateItem/${item?._id}`}>
                    <button>
                      <MdEdit className="text-2xl lg:text-4xl text-[#B91C1C]" />
                    </button>
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => handleDelete(item?._id)}>
                      <MdDelete className="text-2xl lg:text-4xl text-[#B91C1C]" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
