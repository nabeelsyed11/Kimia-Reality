'use client';

import { useState, useEffect } from 'react';
import { use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  MapPin, BedDouble, Bath, Square, Calendar, Home, ArrowLeft, Share2, Heart,
  ChevronLeft, ChevronRight 
} from 'lucide-react';

interface Property {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  propertyType: string;
  status: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  yearBuilt?: number;
  features: string[];
  amenities: string[];
  images: string[];
  mainImage: string;
  virtualTourUrl?: string;
}

export default function PropertyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetchProperty();
  }, [resolvedParams.id]);

  const fetchProperty = async () => {
    try {
      const response = await fetch(`/api/properties/${resolvedParams.id}`);
      const data = await response.json();
      if (data.success) {
        setProperty(data.data);
      }
    } catch (error) {
      console.error('Error fetching property:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = () => {
    if (property && property.images.length > 0) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-300 rounded-2xl mb-8"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Property Not Found</h1>
          <Link href="/properties" className="text-blue-600 hover:text-blue-700">
            Back to Properties
          </Link>
        </div>
      </div>
    );
  }

  const images = property.images.length > 0 ? property.images : [property.mainImage];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 font-semibold transition-colors"
          >
            <ArrowLeft size={20} />
            Back to Properties
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg">
              <div className="relative h-[500px] bg-gray-900">
                <Image
                  src={images[currentImageIndex] || '/placeholder-property.jpg'}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-3 rounded-full shadow-lg transition-colors"
                    >
                      <ChevronRight size={24} />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="p-4 flex gap-2 overflow-x-auto">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                        currentImageIndex === index
                          ? 'border-blue-600 scale-105'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <Image src={img} alt={`View ${index + 1}`} fill className="object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Details */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
                  <div className="flex items-center text-gray-600 text-lg">
                    <MapPin size={20} className="mr-2" />
                    <span>
                      {property.location.address}, {property.location.city}, {property.location.state}{' '}
                      {property.location.zipCode}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full border-2 transition-all ${
                      isFavorite
                        ? 'bg-red-50 border-red-600 text-red-600'
                        : 'border-gray-300 text-gray-600 hover:border-red-600 hover:text-red-600'
                    }`}
                  >
                    <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-300 text-gray-600 hover:border-blue-600 hover:text-blue-600 transition-colors">
                    <Share2 size={24} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8 p-6 bg-gray-50 rounded-xl">
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <BedDouble size={20} />
                    <span className="text-sm">Bedrooms</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{property.bedrooms}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Bath size={20} />
                    <span className="text-sm">Bathrooms</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{property.bathrooms}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Square size={20} />
                    <span className="text-sm">Area</span>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{property.area} sqft</p>
                </div>
                {property.yearBuilt && (
                  <div>
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar size={20} />
                      <span className="text-sm">Year Built</span>
                    </div>
                    <p className="text-2xl font-bold text-gray-900">{property.yearBuilt}</p>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {property.description}
                </p>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Amenities</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.amenities.map((amenity, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-700">
                        <div className="w-2 h-2 bg-cyan-600 rounded-full"></div>
                        {amenity}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-8 shadow-lg sticky top-24">
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-2">Price</p>
                <p className="text-4xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
                <p className="text-sm text-gray-600 mt-1 uppercase font-semibold">
                  {property.status.replace('-', ' ')}
                </p>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Property Type</span>
                  <span className="font-semibold text-gray-900 capitalize">{property.propertyType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Status</span>
                  <span className="font-semibold text-gray-900 capitalize">
                    {property.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors mb-3">
                Contact Agent
              </button>
              <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 py-4 rounded-xl font-semibold text-lg transition-colors">
                Schedule Viewing
              </button>

              {property.virtualTourUrl && (
                <a
                  href={property.virtualTourUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-cyan-600 hover:bg-cyan-700 text-white py-4 rounded-xl font-semibold text-lg transition-colors text-center mt-3"
                >
                  Virtual Tour
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
