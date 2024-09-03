'use client';

import React, { useState } from 'react';

type Props = {
  recipes?: any;
};
/**
 *
 * To do
 * 1. Take out optional tag from types
 *
 */
const RecipeCategories = ({ recipes = [] }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'Appetizers',
    'Snacks',
    'Breakfast & Brunch',
    'Bread',
    'Dinner',
    'Side Dishes',
    'Desserts',
    'Lunch',
    'Soups',
    'Salads',
    'Sauces, Condiments and Preserves',
  ];

  const filteredRecipes =
    selectedCategory === 'All'
      ? recipes
      : recipes?.filter((recipe) => recipe.category === selectedCategory);
  return (
    <div className='p-4'>
      <div className='flex flex-wrap gap-4 mb-8 justify-center'>
        {categories.map((category, index) => (
          <button
            key={index}
            onClick={() => setSelectedCategory(category)}
            className={`py-2 px-4 rounded-md transition-colors 
            ${
              selectedCategory === category
                ? 'bg-gray-800 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RecipeCategories;
