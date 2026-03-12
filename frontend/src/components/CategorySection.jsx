import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CategorySection = ({ categories }) => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Browse Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/categories/${category.name.toLowerCase()}`}
              className="block bg-moviebox-gray hover:bg-moviebox-light p-6 rounded-lg text-center transition-all duration-300 transform hover:scale-105"
            >
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <span className="font-semibold">{category.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;