import React, { useState } from 'react';
import { Form, Input, Button, Select } from 'daisyui';
import Select from 'react-select';


const AddArticles = () => {

    const [articleData, setArticleData] = useState({
        title: '',
        image: null,
        publisher: '',
        tags: [],
        description: '',
      });
    
      const publishers = [
        { value: 'publisher1', label: 'Publisher 1' },
        { value: 'publisher2', label: 'Publisher 2' },
        // Add more publishers as needed
      ];
    
      const tagOptions = [
        { value: 'tag1', label: 'Tag 1' },
        { value: 'tag2', label: 'Tag 2' },
        // Add more tags as needed
      ];
    
      const handleInputChange = (name, value) => {
        setArticleData({ ...articleData, [name]: value });
      };
    
      const handleImageChange = (e) => {
        setArticleData({ ...articleData, image: e.target.files[0] });
      };
    
      const handleSubmit = async () => {
        // Perform the article submission logic here
        // You may want to use a library like axios to make a POST request to your server
        // Also, handle image upload to imgbb or cloudinary here
    
        // Example:
        // const formData = new FormData();
        // formData.append('title', articleData.title);
        // formData.append('image', articleData.image);
        // formData.append('publisher', articleData.publisher);
        // formData.append('tags', articleData.tags.join(','));
        // formData.append('description', articleData.description);
    
        // Send formData to your backend API for further processing
    
        // After successful submission, you may want to redirect or show a success message
      };
    
    
    return (
        <div>
            <Form onSubmit={handleSubmit}>
      <Input
        label="Title"
        name="title"
        value={articleData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
      />

      <Input
        type="file"
        label="Image"
        name="image"
        accept="image/*"
        onChange={handleImageChange}
      />

      <Select
        label="Publisher"
        name="publisher"
        options={publishers}
        value={publishers.find((p) => p.value === articleData.publisher)}
        onChange={(selectedOption) =>
          handleInputChange('publisher', selectedOption.value)
        }
      />

      <Select
        label="Tags"
        name="tags"
        options={tagOptions}
        isMulti
        value={tagOptions.filter((tag) =>
          articleData.tags.includes(tag.value)
        )}
        onChange={(selectedOptions) =>
          handleInputChange('tags', selectedOptions.map((tag) => tag.value))
        }
      />

      <Input
        label="Description"
        name="description"
        value={articleData.description}
        onChange={(e) => handleInputChange('description', e.target.value)}
      />

      <Button type="submit">Submit</Button>
    </Form>

        </div>
    );
};

export default AddArticles;