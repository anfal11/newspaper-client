/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import ArticleCard from '../../Component/ArticleCard/ArticleCard';
import useAuth from '../../Hooks/useAuth';
import { Puff } from 'react-loader-spinner';

const PremiumArticles = () => {
  const { loading } = useAuth();

  // Fetch premium articles from the API
  const { refetch, data: premiumArticles = [] } = useQuery({
    queryKey: ['premiumArticles'],
    queryFn: async () => {
      const res = await axios.get('https://newspaper-server-side.vercel.app/articles');
      return res.data.filter((article) => article.status === 'approved');
    },
});

    const premiumArticle = premiumArticles?.filter((article) => article.isPremium === true);
    console.log(premiumArticle, "premiumArticle");

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl underline font-bold text-center pt-28 text-gray-500">
        Premium Articles
      </h1>

      {loading ? (
        <div className="flex justify-center items-center mt-10">
          <Puff height="80" width="80" radius={1} color="#4fa94d" ariaLabel="puff-loading" visible={true} />
        </div>
      ) : (
        <>
          <div className="my-20">
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-10 lg:p-0 gap-4">
            {premiumArticle?.map((article) => (
              <ArticleCard key={article._id} article={article} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default PremiumArticles;
