import React from 'react';
import { Shield, Target, Users, Award } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Stock market"
          className="w-full h-[400px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-900/50 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About NSE Tracker</h1>
            <p className="text-xl max-w-2xl">Your trusted partner in navigating the Indian stock market with real-time data, comprehensive analytics, and expert insights.</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-gray-600 mb-8">
              At NSE Tracker, we're committed to democratizing stock market information and empowering investors with the tools they need to make informed decisions. Our platform combines cutting-edge technology with comprehensive market data to provide you with a seamless investment tracking experience.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <Shield className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold">Reliable Data</h3>
                  <p className="text-gray-600">Real-time market data from trusted sources</p>
                </div>
              </div>
              <div className="flex items-start">
                <Target className="w-6 h-6 text-blue-600 mt-1" />
                <div className="ml-4">
                  <h3 className="font-semibold">Precision Analytics</h3>
                  <p className="text-gray-600">Advanced tools for technical and fundamental analysis</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Trading analysis"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">10K+</h3>
            <p className="text-gray-600">Active Users</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Award className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">5 Years</h3>
            <p className="text-gray-600">Market Experience</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">99.9%</h3>
            <p className="text-gray-600">Uptime</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">500+</h3>
            <p className="text-gray-600">Listed Companies</p>
          </div>
        </div>
      </div>
    </div>
  );
};