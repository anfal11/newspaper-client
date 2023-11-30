import { useForm } from "react-hook-form";

import { FaUtensils } from "react-icons/fa";
import toast from "react-hot-toast";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxios from "../../Hooks/useAxios";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();
  const onSubmit = async (data) => {
    console.log(data);
    const imageFIle = { image: data.image[0] };
    //         const formData = new FormData();
    // formData.append('image', data.image[0]);

    // const res = await axiosPublic.post(image_hosting_api, formData);

    const res = await axiosPublic.post(image_hosting_api, imageFIle, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (res.data.success) {
      // now send the data of menu to the server with the image url
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price),
        recipe: data.recipe,
        image: res.data.data.display_url,
      };
      //
      const menuRes = await axiosSecure.post("/api/v1/menu", menuItem);
      console.log(menuRes.data);
      if (menuRes.data.insertedId) {
        //show success popup
        reset();
        toast.success("Item Added Successfully");
      }
    }
    console.log(res.data);
  };

  return (
    <div>


      <div className="p-10 bg-[#E8E8E8] m-10 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Recipe Name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category Name*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full"
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="salad">Salad</option>
                <option value="pizza">Pizza</option>
                <option value="soups">Soups</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
            </div>
            {/* price  */}

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                placeholder="Price"
                {...register("price", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Recipe Details*</span>
            </label>
            <textarea
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="recipe details"
            ></textarea>
          </div>

          <div className="w-full my-8">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button className="btn bg-gradient-to-r from-yellow-800 to-yellow-600 text-white">
            {" "}
            Add Item <FaUtensils></FaUtensils>{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddItems;
