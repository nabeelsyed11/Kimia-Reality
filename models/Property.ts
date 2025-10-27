import mongoose, { Schema, model, models } from 'mongoose';

export interface IProperty {
  _id?: string;
  title: string;
  description: string;
  price: number;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'land' | 'commercial';
  status: 'for-sale' | 'for-rent' | 'sold' | 'rented';
  bedrooms: number;
  bathrooms: number;
  area: number; // in square feet
  yearBuilt?: number;
  features: string[];
  amenities: string[];
  images: string[];
  mainImage: string;
  virtualTourUrl?: string;
  featured: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const PropertySchema = new Schema<IProperty>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a property title'],
      maxlength: [200, 'Title cannot be more than 200 characters'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a property description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a price'],
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, default: 'USA' },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    propertyType: {
      type: String,
      enum: ['house', 'apartment', 'condo', 'townhouse', 'land', 'commercial'],
      required: true,
    },
    status: {
      type: String,
      enum: ['for-sale', 'for-rent', 'sold', 'rented'],
      default: 'for-sale',
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    area: {
      type: Number,
      required: true,
    },
    yearBuilt: Number,
    features: [String],
    amenities: [String],
    images: [String],
    mainImage: {
      type: String,
      required: true,
    },
    virtualTourUrl: String,
    featured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Property || model<IProperty>('Property', PropertySchema);
