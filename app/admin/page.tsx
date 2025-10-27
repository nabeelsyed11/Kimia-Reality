'use client';

import { useState, useEffect } from 'react';
import { Building2, BookOpen, Eye, TrendingUp } from 'lucide-react';
import Link from 'next/link';

interface Stats {
  totalProperties: number;
  totalBlogs: number;
  totalViews: number;
  activeListings: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProperties: 0,
    totalBlogs: 0,
    totalViews: 0,
    activeListings: 0,
  });
  const [recentProperties, setRecentProperties] = useState<any[]>([]);
  const [recentBlogs, setRecentBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [propertiesRes, blogsRes] = await Promise.all([
        fetch('/api/properties'),
        fetch('/api/blogs'),
      ]);

      const propertiesData = await propertiesRes.json();
      const blogsData = await blogsRes.json();

      if (propertiesData.success && blogsData.success) {
        const properties = propertiesData.data;
        const blogs = blogsData.data;

        setStats({
          totalProperties: properties.length,
          totalBlogs: blogs.length,
          totalViews: blogs.reduce((sum: number, blog: any) => sum + blog.views, 0),
          activeListings: properties.filter(
            (p: any) => p.status === 'for-sale' || p.status === 'for-rent'
          ).length,
        });

        setRecentProperties(properties.slice(0, 5));
        setRecentBlogs(blogs.slice(0, 5));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'Total Properties',
      value: stats.totalProperties,
      icon: Building2,
      color: 'blue',
      link: '/admin/properties',
    },
    {
      title: 'Active Listings',
      value: stats.activeListings,
      icon: TrendingUp,
      color: 'green',
      link: '/admin/properties',
    },
    {
      title: 'Blog Posts',
      value: stats.totalBlogs,
      icon: BookOpen,
      color: 'purple',
      link: '/admin/blogs',
    },
    {
      title: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'cyan',
      link: '/admin/blogs',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's what's happening with your real estate business.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.link}>
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-${stat.color}-100`}
                >
                  <stat.icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-3xl font-bold text-gray-900">
                {loading ? '...' : stat.value.toLocaleString()}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Properties */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Properties</h2>
            <Link
              href="/admin/properties"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View All
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentProperties.length > 0 ? (
            <div className="space-y-4">
              {recentProperties.map((property) => (
                <div
                  key={property._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{property.title}</h3>
                    <p className="text-sm text-gray-600">
                      ${property.price.toLocaleString()} • {property.location.city}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No properties yet</p>
          )}
        </div>

        {/* Recent Blogs */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Recent Blog Posts</h2>
            <Link
              href="/admin/blogs"
              className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
            >
              View All
            </Link>
          </div>
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex gap-4">
                  <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : recentBlogs.length > 0 ? (
            <div className="space-y-4">
              {recentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate">{blog.title}</h3>
                    <p className="text-sm text-gray-600">
                      {blog.views} views • {blog.category}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No blog posts yet</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/admin/properties/new"
          className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl p-8 hover:shadow-xl transition-shadow"
        >
          <Building2 size={32} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">Add New Property</h3>
          <p className="text-white/90">List a new property for sale or rent</p>
        </Link>
        <Link
          href="/admin/blogs/new"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-xl p-8 hover:shadow-xl transition-shadow"
        >
          <BookOpen size={32} className="mb-4" />
          <h3 className="text-2xl font-bold mb-2">Write Blog Post</h3>
          <p className="text-white/90">Share insights and real estate tips</p>
        </Link>
      </div>
    </div>
  );
}
