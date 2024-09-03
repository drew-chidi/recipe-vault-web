'use client';

// app/recipes/page.tsx
// import { useQuery } from '@tanstack/react-query';
// import { fetchRecipes } from '@/lib/api'; // Make sure to adjust the path
import { useState } from 'react';
import RecipeCard from './recipe-card';

const RecipeList = () => {
  const [page, setPage] = useState(1);
  //   const { data, error, isLoading } = useQuery(['recipes', page], () => fetchRecipes(page), {
  //     keepPreviousData: true,
  //   });

  //   if (isLoading) return <div>Loading...</div>;
  //   if (error) return <div>Error: {error.message}</div>;

  const data = { data: [] };

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        {data?.data.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe?.id} />
        ))}
      </div>
      <div className='mt-4 flex justify-between'>
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>{/* Page {data.currentPage} of {data.totalPages} */}</span>
        <button
        //   onClick={() => setPage((prev) => prev + 1)}
        //   disabled={page === data.totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecipeList;
