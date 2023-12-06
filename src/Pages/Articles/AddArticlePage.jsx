import toast from "react-hot-toast";
import Select from "react-select";
import useAxios from "../../Hooks/useAxios";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useForm } from "react-hook-form";
import { GrArticle } from "react-icons/gr";
import { useEffect, useState } from "react";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticlePage = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [articles, setSelectedArticles] = useState([]);
  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxios();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosPublic.get("/users");
        setSelectedArticles(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [axiosPublic]);

  const onSubmit = async (data) => {
    console.log(data);
    const imageFIle = { image: data.image[0] };
    //         const formData = new FormData();
    // formData.append('image', data.image[0]);

    // const res = await axiosPublic.post(image_hosting_api, formData);
 // Get the current date and time
 const currentDate = new Date();
 const formattedDate = currentDate.toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
    const res = await axiosPublic.post(image_hosting_api, imageFIle, {
      headers: { "content-type": "multipart/form-data" },
    });
    if (res.data.success) {
      const articleData = {
        title: data.name,
        publisher: data.publisher,
        tags: selectedTags.map((tag) => tag.value),
        shortDescription: data.shortDescription,
        longDescription: data.longDescription,
        image: res.data.data.display_url,
        postedDate: formattedDate,
        status: "pending",
      };

      

      const articleRes = await axiosSecure.post("/articles", articleData);
      console.log(articleRes.data);
      if (articleRes.data.insertedId) {
        //show success popup
        reset();
        toast.success("Article Added. Wait for Admin Approval.");
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
                onChange={(selected) => {
                  setSelectedTags(selected)
                }}
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
    {...register("publisher", { required: true })}
    className="select select-bordered w-full"
    defaultValue={""}
  >
    <option disabled value="">
      Select publisher
    </option>
    {articles.map((article) => (
      <option key={article._id} value={article.name}>
        {article.name}
      </option>
    ))}
  </select>
</div>

          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Short Description*</span>
            </label>
            <textarea
              {...register("shortDescription", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Article short description"
            ></textarea>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Long Description*</span>
            </label>
            <textarea
              {...register("longDescription", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Article long description"
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
