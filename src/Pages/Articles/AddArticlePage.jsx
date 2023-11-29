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
  const [selectedTags, setSelectedTags] = useState([]);

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
        tags: selectedTags.map((tag) => tag.value),
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

  const tags = [
    { value: 'world', label: 'World' },
    { value: 'sport', label: 'Sport' },
    { value: 'national', label: 'National' },
    { value: 'local', label: 'Local News' },
    { value: 'commmunity', label: 'Community' },
    { value: 'business', label: 'Business' },
    { value: 'environment', label: 'Environment' },
    { value: 'urban', label: 'Urban' },
    { value: 'technlogy', label: 'Technology' },
    { value: 'research', label: 'Research' },
    { value: 'science', label: 'Science' },
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
                <span className="label-text">Tags*</span>
              </label>

              <Select
                options={tags}
                defaultValue={selectedOption}
                onChange={setSelectedOption}
                name="tags"
                className="text-black"
                placeholder="Select Tags..."
                isMulti
              />
            </div>
            <div className="form-control w-full my-6">
            <label className="label">
                <span className="label-text">Publisher*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered w-full"
                defaultValue={"default"}
              >
                <option disabled value="default">
                  Select publisher
                </option>
                <option value="a">a</option>
                <option value="b">b</option>
              </select>
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
