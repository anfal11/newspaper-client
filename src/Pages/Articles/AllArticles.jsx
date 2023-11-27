import axios from "axios";

const AllArticles = () => {

    axios.get('http://localhost:5000/articles')
    .then(res => {
        console.log(res.data);
    })

    return (
        <div>
            <h1 className="text-3xl underline font-bold text-center pt-28 text-gray-500"> All Articles </h1>
        </div>
    );
};

export default AllArticles;