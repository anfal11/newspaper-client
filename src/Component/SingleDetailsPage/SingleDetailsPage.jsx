import axios from "axios";
import { useEffect, useState } from "react";
import {  useParams } from "react-router-dom";

const SingleDetailsPage = () => {
    const [article, setArticle] = useState(null);
    const {id} = useParams();

    useEffect(()=>{
        const fetchArticle = async () => {
            const res = await axios.get(`http://localhost:5000/articles/${id}`);
            console.log(res?.data);
            setArticle(res?.data);
        }
        fetchArticle();
    },[id])

    return (
        <div className="pt-44 max-w-7xl mx-auto">
           <img className="w-[60%] mx-auto" src={article?.image} alt="" />
           <div className="w-[60%] mx-auto my-4 py-2">
           <p className="text-3xl font-semibold">Title: {article?.title}</p>
           <p className="text-xl font-medium">Publisher: {article?.publisher}</p>
           <p className="text-xl"><span className="font-semibold">Tags:</span> {article?.tags.join(", ")}</p>
           <p className="text-xl"><span className="font-semibold">Descrption:</span> {article?.['long-description']}</p>
           </div>
        </div>
    );
};

export default SingleDetailsPage;