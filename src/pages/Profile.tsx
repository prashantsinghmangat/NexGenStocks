import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../store/store';
import { User, Mail, Calendar } from 'lucide-react';

export const Profile: React.FC = () => {
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="space-y-6">
          <div className="flex items-center">
            <User className="w-6 h-6 text-gray-400 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="text-lg font-medium">{user?.username}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Mail className="w-6 h-6 text-gray-400 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="text-lg font-medium">{user?.email}</p>
            </div>
          </div>

          <div className="flex items-center">
            <Calendar className="w-6 h-6 text-gray-400 mr-4" />
            <div>
              <p className="text-sm text-gray-500">Member Since</p>
              <p className="text-lg font-medium">
                {new Date(user?.createdAt || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};