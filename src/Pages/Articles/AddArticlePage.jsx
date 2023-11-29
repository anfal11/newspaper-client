import Select from "react-select";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddArticlePage = () => {
  return (
    <div className="py-36">
      <form onSubmit={handleSubmit}>
        <input label="Title" name="title" value={} />

        <input
          type="file"
          label="Image"
          name="image"
          accept="image/*"
        />

        <Select
          label="Publisher"
          name="publisher"
          options={publishers}
          value={}
        />

        <Select
          label="Tags"
          name="tags"
          options={tagOptions}
          isMulti
          value={}
        />

        <input
          label="Description"
          name="description"
          value={articleData.description}
        />

        <button className="btn bt-mprimary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddArticlePage;
