import Swal from "sweetalert2";
import {MdDelete} from "react-icons/md";
import { Link } from "react-router-dom";
import useCart from "../../Hooks/useCart";
import useAxios from "../../Hooks/useAxios";

const Cart = () => {
  const [cart, reFetch] = useCart();
  const axiosSecure = useAxios();
 
  const totalPrice = cart.reduce((acc, current) => {
    return acc + current.price;
  }, 0);

  const handleDelete = (id) => {
    
    Swal.fire({
        title: "Are you sure you want to remove item from cart?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!"
      }).then((result) => {
        if (result.isConfirmed) {

            axiosSecure.delete(`/cart/${id}`)
            .then((result) => {
                if (result.data.deletedCount > 0) {
                    Swal.fire({
                        title: "Removed!",
                        text: "Your item has been removed.",
                        icon: "success"
                      });
                      reFetch();
                }
            })

          
        }
      });
  }
  return (
    <div className="mt-20">
      <div className="flex justify-evenly">
        <h1 className="text-xl lg:text-4xl">Total Orders: {cart.length}</h1>
        <h1 className="text-xl lg:text-4xl">Total Price: ${totalPrice}</h1>
        {
          cart?.length ? <Link to='/dashboard/payment'>
        <button className="btn text-base lg:text-3xl bg-[#D1A054]">Pay</button>
        </Link> : 
        <button disabled className="btn text-base lg:text-3xl bg-[#D1A054]">Pay</button>
        }
      </div>

      <div className="my-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                 #
                </th>
                <th>Item Image</th>
                <th>Item Name</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
                {
                    cart.map((item, index) => 

                    <tr key={item._id}>
                <th className="lg:text-xl">
                  {index + 1}
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={ item?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </div>
                </td>

                <td className="lg:text-xl">{ item?.name}</td>
                <th>
                  <button className="btn btn-ghost btn-xs lg:text-xl">{ item?.price}</button>
                </th>
                <td>
                <button onClick={()=> handleDelete(item?._id)}>
                <MdDelete className="text-2xl lg:text-4xl text-[#B91C1C]" />
                </button>
                </td>
              </tr>
                     )
                }

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );
};

export default Cart;
