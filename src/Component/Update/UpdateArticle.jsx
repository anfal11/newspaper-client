import  { useState, useEffect } from 'react';
import {  useNavigate, useParams } from 'react-router-dom';
import useAxios from '../../Hooks/useAxios';
import toast from 'react-hot-toast';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { GrArticle } from 'react-icons/gr';
import axios from 'axios';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateArticle = () => {
    const { id } = useParams();
    const axiosSecure = useAxios();
    const { register, handleSubmit, setValue } = useForm();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const [allPublishers, setAllPublishers] = useState([]);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();

//   const imgbbResponse =  axios.post(image_hosting_api, form, {
//     headers: { 'Content-Type': 'multipart/form-data' },
//     });

//     const imageURL = imgbbResponse.data?.data?.url;
//     console.log('image uplaoded to imgbb', imgbbResponse?.data);



  useEffect(() => {
    axiosSecure.get('/articles')
      .then(response => {
        const articles = response.data;
        const publishers = [...new Set(articles.map(article => article.publisher))];
        setAllPublishers(publishers.map(publisher => ({ value: publisher, label: publisher })));
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
        toast.error('Failed to fetch articles');
      });
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get(`/articles/${id}`)
      .then((response) => {
        const articleData = response.data;
        setValue('name', articleData.title);
        setValue('shortDescription', articleData['short-description']);
        setValue('longDescription', articleData['long-description']);
        setSelectedOption({ value: articleData.publisher, label: articleData.publisher });
        setSelectedTags(articleData.tags.map((tag) => ({ value: tag, label: tag })));
      })
      .catch((error) => {
        console.error('Error fetching article:', error);
        toast.error('Failed to fetch article details');
      });
  }, [axiosSecure, id, setValue]);

  const onSubmit = async (data) => {
    try {
      let imageURL = null;
  
      // Check if there's a selected image
      if (selectedImage) {
        // Create a FormData object
        const formData = new FormData();
        // Append the selected image to the FormData object
        formData.append('image', selectedImage);
  
        // Upload image to ImgBB
        const imgbbResponse = await axios.post(image_hosting_api, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        imageURL = imgbbResponse.data?.data?.url;
        console.log('image uploaded to imgbb', imgbbResponse?.data);
  
        // Check if the image upload was successful
        if (!imageURL) {
          toast.error('Failed to upload image to ImgBB');
          return;
        }
      }
  
      // Update article data
      const articleData = {
        title: data.name,
        publisher: selectedOption?.value,
        tags: selectedTags.map((tag) => tag.value),
        'short-description': data.shortDescription,
        'long-description': data.longDescription,
        // Conditionally include the image property
        ...(imageURL && { image: imageURL }),
      };
  
      const res = await axiosSecure.put(`/articles/${id}`, articleData);
  
      if (res.data.modifiedCount > 0) {
        toast.success('Article updated successfully');
        // Use Navigate from 'react-router-dom' to navigate
        return navigate('/my-article');
      } else {
        toast.error('Failed to update article. No modifications were made.');
      }
    } catch (error) {
      console.error('Error updating article:', error);
      toast.error(`Failed to update article. ${error.message}`);
    }
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
  const publishers = [
    ...allPublishers,
  ];

  return (
    <div className="py-36">
      <div className="p-10 bg-[#E8E8E8] m-10 rounded-lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Title*</span>
            </label>
            <input
              type="text"
              placeholder="Title Name"
              {...register('name', { required: true })}
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Tags*</span>
            </label>
            <Select
              options={tags}
              defaultValue={selectedTags}
              onChange={(value) => setSelectedTags(value)}
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
            <Select
              options={publishers}
              defaultValue={selectedOption}
              onChange={(value) => setSelectedOption(value)}
              name="publisher"
              className="text-black"
              placeholder="Select Publisher..."
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Short Description*</span>
            </label>
            <textarea
              {...register('shortDescription', { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Article short description"
            ></textarea>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Long Description*</span>
            </label>
            <textarea
              {...register('longDescription', { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Article long description"
            ></textarea>
          </div>

                    <div className="form-control w-full my-6">
            <label className="label">
              <span className="label-text">Image*</span>
            </label>
            <input
              type="file"
              onChange={(e) => setSelectedImage(e.target.files[0])}
              className="input input-bordered w-full"
            />
          </div>

          <button className="btn bg-gradient-to-r from-blue-800 to-blue-500 text-white mt-5">
            Update Article <GrArticle className="text-xl" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateArticle;
