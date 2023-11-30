import { useState, useEffect } from "react";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import {FaQuoteLeft} from 'react-icons/fa'

const AllPublisher = () => {
    const [publishers, setPublishers] = useState([]);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
      const fetchPublishers = async () => {
        try {
          const response = await axiosPublic.get("/users");
          setPublishers(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching publishers:", error);
        }
      };
  
      fetchPublishers();
    }, [axiosPublic]);
    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-4xl mt-20 font-bold mb-4 text-gray-500 underline text-center">All Publishers</h2>

            <h2 className="text-xl font-bold mb-10 text-gray-500 underline text-center">Total Publishers: {publishers?.length}</h2>
            
            <FaQuoteLeft className="text-gray-300 text-7xl mx-auto mb-10"/>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
            {
                publishers?.map((publisher) => 
                <SwiperSlide key={publisher._id}>
                <div className="flex flex-col items-center">
                                <img className="rounded-full h-20 w-20" src={publisher?.image} alt="" />
                                <h2 className="text-lg font-bold mt-2">{publisher?.name}</h2>
                            </div>
                </SwiperSlide>

                )
            }
            </Swiper>
        </div>
    );
};

export default AllPublisher;