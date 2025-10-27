'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save } from 'lucide-react';

export default function NewPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA',
    propertyType: 'house',
    status: 'for-sale',
    bedrooms: '',
    bathrooms: '',
    area: '',
    yearBuilt: '',
    features: '',
    amenities: '',
    mainImage: '',
    images: '',
    virtualTourUrl: '',
    featured: false,
  });
  const [mainImageFile, setMainImageFile] = useState<File | null>(null);
  const [additionalImageFiles, setAdditionalImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleMainImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMainImageFile(e.target.files[0]);
      // Clear the URL field when a file is selected
      setFormData(prev => ({ ...prev, mainImage: '' }));
    }
  };

  const handleAdditionalImageFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAdditionalImageFiles(Array.from(e.target.files));
      // Clear the URLs field when files are selected
      setFormData(prev => ({ ...prev, images: '' }));
    }
  };

  const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
    
    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error);
    }
    
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setUploading(true);

    try {
      // Upload files if selected
      let mainImageUrl = formData.mainImage;
      const additionalImageUrls: string[] = [];

      // Handle main image file upload
      if (mainImageFile) {
        mainImageUrl = await uploadFile(mainImageFile);
      }

      // Handle additional image files upload
      if (additionalImageFiles.length > 0) {
        for (const file of additionalImageFiles) {
          const url = await uploadFile(file);
          additionalImageUrls.push(url);
        }
      }

      // Parse existing additional images from URLs if any
      let existingImageUrls: string[] = [];
      if (formData.images) {
        existingImageUrls = formData.images.split(',').map(url => url.trim()).filter(url => url);
      }

      // Combine all image URLs
      const allImageUrls = [...additionalImageUrls, ...existingImageUrls];

      const propertyData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        location: {
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country,
        },
        propertyType: formData.propertyType,
        status: formData.status,
        bedrooms: parseInt(formData.bedrooms),
        bathrooms: parseInt(formData.bathrooms),
        area: parseInt(formData.area),
        yearBuilt: formData.yearBuilt ? parseInt(formData.yearBuilt) : undefined,
        features: formData.features ? formData.features.split(',').map(f => f.trim()).filter(f => f) : [],
        amenities: formData.amenities ? formData.amenities.split(',').map(a => a.trim()).filter(a => a) : [],
        mainImage: mainImageUrl,
        images: allImageUrls,
        virtualTourUrl: formData.virtualTourUrl || undefined,
        featured: formData.featured,
      };

      const response = await fetch('/api/properties', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
      });

      if (response.ok) {
        alert('Property created successfully!');
        router.push('/admin/properties');
      } else {
        const error = await response.json();
        alert(`Error: ${error.error || 'Failed to create property'}`);
      }
    } catch (error: any) {
      console.error('Error creating property:', error);
      alert(`Failed to create property: ${error.message}`);
    } finally {
      setLoading(false);
      setUploading(false);
    }
  };

  return (
    <div>
      <Link
        href="/admin/properties"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold mb-6 transition-colors"
      >
        <ArrowLeft size={20} />
        Back to Properties
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Property</h1>
        <p className="text-gray-600">Fill in the details to list a new property</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
        {/* Basic Information */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Basic Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Beautiful 3-bedroom house in downtown"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Describe the property in detail..."
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="500000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Property Type *
              </label>
              <select
                name="propertyType"
                value={formData.propertyType}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="townhouse">Townhouse</option>
                <option value="land">Land</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Status *
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="for-sale">For Sale</option>
                <option value="for-rent">For Rent</option>
                <option value="sold">Sold</option>
                <option value="rented">Rented</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="mr-2"
                />
                Mark as Featured
              </label>
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Location</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="123 Main Street"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="New York"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="NY"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                ZIP Code *
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="10001"
              />
            </div>
          </div>
        </div>

        {/* Property Details */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Property Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bedrooms *
              </label>
              <input
                type="number"
                name="bedrooms"
                value={formData.bedrooms}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="3"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bathrooms *
              </label>
              <input
                type="number"
                name="bathrooms"
                value={formData.bathrooms}
                onChange={handleChange}
                required
                min="0"
                step="0.5"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="2"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Area (sqft) *
              </label>
              <input
                type="number"
                name="area"
                value={formData.area}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="2000"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Year Built
              </label>
              <input
                type="number"
                name="yearBuilt"
                value={formData.yearBuilt}
                onChange={handleChange}
                min="1800"
                max={new Date().getFullYear()}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="2020"
              />
            </div>
          </div>
        </div>

        {/* Features & Amenities */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Features & Amenities</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Features (comma-separated)
              </label>
              <input
                type="text"
                name="features"
                value={formData.features}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Hardwood floors, Updated kitchen, Central AC"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Amenities (comma-separated)
              </label>
              <input
                type="text"
                name="amenities"
                value={formData.amenities}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="Pool, Gym, Parking, Garden"
              />
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Media</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Main Image URL or Upload *
              </label>
              <div className="space-y-3">
                <input
                  type="url"
                  name="mainImage"
                  value={formData.mainImage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="https://example.com/image.jpg"
                  disabled={!!mainImageFile}
                />
                <div className="relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleMainImageFileChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {mainImageFile && (
                    <button
                      type="button"
                      onClick={() => {
                        setMainImageFile(null);
                        setFormData(prev => ({ ...prev, mainImage: '' }));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Either enter a URL or upload a JPG/PNG file. If you upload a file, the URL field will be ignored.
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Additional Images (URLs or Uploads)
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  name="images"
                  value={formData.images}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                  disabled={additionalImageFiles.length > 0}
                />
                <div className="relative">
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleAdditionalImageFilesChange}
                    multiple
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  {additionalImageFiles.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        setAdditionalImageFiles([]);
                        setFormData(prev => ({ ...prev, images: '' }));
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  Either enter comma-separated URLs or upload JPG/PNG files. If you upload files, the URLs field will be ignored.
                </p>
                {additionalImageFiles.length > 0 && (
                  <div className="text-sm text-gray-600">
                    Selected files: {additionalImageFiles.map(f => f.name).join(', ')}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Virtual Tour URL
              </label>
              <input
                type="url"
                name="virtualTourUrl"
                value={formData.virtualTourUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                placeholder="https://example.com/virtual-tour"
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Save size={20} />
            {uploading ? 'Uploading...' : loading ? 'Creating...' : 'Create Property'}
          </button>
          <Link
            href="/admin/properties"
            className="px-8 py-4 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg font-semibold text-lg transition-colors"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
