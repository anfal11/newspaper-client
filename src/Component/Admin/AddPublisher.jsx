import axios from "axios";
import toast from "react-hot-toast";

const AddPublisher = () => {

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);

        const name = data.get('name');
        const image = data.get('image');
        const publisher = { name, image };
        console.log(publisher);

        try {
            const res = await axios.post(
              'http://localhost:5000/publisher',
              {
                publisher,
              }
            );
      
            console.log('User registered in MongoDB:', res.data);
      
            if (res.data.insertedId) {
            
              toast.success('User successfully created');
            }
          } catch (error) {
            console.error('Error registering user in MongoDB:', error);
            toast.error('Failed to create user. Please try again.');
          }

    }



    return (
        <div>
           
           <form onSubmit={handleSubmit}>
           <input type="text" placeholder="Publisher name" name="name" className="input input-bordered w-full" /> <br /> <br />
           <input type="text" placeholder="Image url" name="image" className="input input-bordered w-full" /> <br /> <br />
           <button type="submit" className="btn  bg-blue-500 text-white hover:text-black"> Add Publisher </button>

           </form>
        </div>
    );
};

export default AddPublisher;