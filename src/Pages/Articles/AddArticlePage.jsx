import toast from "react-hot-toast";
import Select from "react-select";
import useAxios from "../../Hooks/useAxios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { GrArticle } from "react-icons/gr";
import { useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticlePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
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
      const articleData = {
        title: data.name,
        publisher: selectedOption?.value, 
        tags: [data.tags],
        description: data.description,
        imageUrl: res.data.data.display_url,
      };

      const articleRes = await axiosSecure.post("", articleData);
      console.log(articleRes.data);
      if (articleRes.data.insertedId) {
        //show success popup
        reset();
        toast.success("Item Added Successfully");
      }
    }
    console.log(res.data);
  };

  const options = [
    { value: 'publisher1', label: 'Publisher 1' },
    { value: 'publisher2', label: 'Publisher 2' },
    { value: 'publisher3', label: 'Publisher 3' },
  ];

  return (
    <div className="py-36">
        <div>
      {/* <SectionTitle
        heading="What's new"
        subHeading="Add an Item"
      ></SectionTitle> */}

      <div className="p-10 bg-[#E8E8E8] m-10 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              type="text"
              placeholder="Title Name"
              {...register("name", { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-6">
            {/* category */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Publisher*</span>
              </label>
              {/* <select
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
              </select> */}
              <Select
                options={options}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                name="publisher"
                className="text-black"
              />
            </div>
            {/* price  */}

            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Tags*</span>
              </label>
              <input
                type="number"
                placeholder="Tags"
                {...register("tags", { required: true })}
                className="input input-bordered w-full"
              />
            </div>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description*</span>
            </label>
            <textarea
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Article description"
            ></textarea>
          </div>

          <div className="w-full my-8">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input file-input-bordered w-full max-w-xs"
            />
          </div>

          <button className="btn bg-gradient-to-r from-blue-800 to-blue-500 text-white">
            {" "}
            Add Article <GrArticle className="text-xl" />
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default AddArticlePage;
