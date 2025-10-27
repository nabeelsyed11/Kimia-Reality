import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Property from '@/models/Property';

// GET all properties or search/filter
export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const propertyType = searchParams.get('type');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const city = searchParams.get('city');
    const bedrooms = searchParams.get('bedrooms');
    const featured = searchParams.get('featured');

    let query: any = {};

    if (status) query.status = status;
    if (propertyType) query.propertyType = propertyType;
    if (city) query['location.city'] = new RegExp(city, 'i');
    if (bedrooms) query.bedrooms = { $gte: parseInt(bedrooms) };
    if (featured === 'true') query.featured = true;
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }

    const properties = await Property.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: properties });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// POST new property
export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const property = await Property.create(body);

    return NextResponse.json({ success: true, data: property }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
