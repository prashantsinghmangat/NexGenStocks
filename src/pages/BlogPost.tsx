import React from 'react';
import { useParams } from 'react-router-dom';
import { Calendar, User, Tag } from 'lucide-react';

export const BlogPost: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = blogPosts.find(post => post.id === parseInt(id || ''));

  if (!post) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-lg text-gray-600">Post not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <article className="bg-white rounded-lg shadow-md overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <User className="w-4 h-4 mr-1" />
            <span className="mr-4">{post.author}</span>
            <Calendar className="w-4 h-4 mr-1" />
            <span>{post.date}</span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
          
          <div className="prose max-w-none">
            <p className="text-gray-600 mb-6">{post.content}</p>
          </div>

          <div className="flex items-center mt-8 pt-6 border-t">
            <Tag className="w-5 h-5 text-gray-400 mr-2" />
            <span className="text-blue-600">{post.category}</span>
          </div>
        </div>
      </article>
    </div>
  );
};