import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: 'Understanding Market Trends in 2024',
    excerpt: 'A comprehensive analysis of the current market trends and what they mean for investors.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Rahul Sharma',
    date: 'Mar 15, 2024',
    category: 'Market Analysis'
  },
  {
    id: 2,
    title: 'Top 5 Stocks to Watch This Quarter',
    excerpt: 'Expert picks for the most promising stocks in the Indian market for this quarter.',
    image: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Priya Patel',
    date: 'Mar 12, 2024',
    category: 'Stock Picks'
  },
  {
    id: 3,
    title: 'Navigating Market Volatility',
    excerpt: 'Strategies for maintaining a stable portfolio during market uncertainties.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    author: 'Amit Kumar',
    date: 'Mar 10, 2024',
    category: 'Investment Strategy'
  }
];

export const Blog: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Market Insights</h1>
          <p className="text-xl text-gray-600">Stay updated with the latest market news and analysis</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map(post => (
            <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-blue-600 font-medium mb-2">{post.category}</div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <User className="w-4 h-4 mr-1" />
                  <span className="mr-4">{post.author}</span>
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{post.date}</span>
                </div>
                <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
                  Read More
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};