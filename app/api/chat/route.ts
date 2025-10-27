import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { message } = await request.json();

    if (!process.env.OPENAI_API_KEY) {
      // Fallback response if OpenAI key is not configured
      return NextResponse.json({
        success: true,
        message: getFallbackResponse(message),
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `You are a helpful real estate assistant for Kimia Realty. You help users with:
            - Property search and recommendations
            - Real estate market information
            - Buying and selling process guidance
            - Rental information
            - General real estate questions
            Keep responses concise, friendly, and professional. If asked about specific properties, suggest the user browse the listings page.`,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        max_tokens: 150,
        temperature: 0.7,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to get AI response');
    }

    return NextResponse.json({
      success: true,
      message: data.choices[0].message.content,
    });
  } catch (error: any) {
    console.error('AI Chat Error:', error);
    return NextResponse.json(
      {
        success: false,
        message: getFallbackResponse(''),
      },
      { status: 200 } // Return 200 with fallback instead of error
    );
  }
}

function getFallbackResponse(message: string): string {
  const lowercaseMessage = message.toLowerCase();

  if (lowercaseMessage.includes('buy') || lowercaseMessage.includes('purchase')) {
    return "I'd be happy to help you find a property! Browse our listings page to see available properties for sale. You can filter by price, location, and property type. If you need personalized assistance, please contact our agents.";
  }

  if (lowercaseMessage.includes('rent') || lowercaseMessage.includes('rental')) {
    return "Looking for a rental? Check out our rental listings! We have a variety of apartments, houses, and condos available. Use our search filters to find the perfect place for you.";
  }

  if (lowercaseMessage.includes('sell') || lowercaseMessage.includes('list')) {
    return "Interested in selling your property? Kimia Realty can help! Our experienced agents will guide you through the selling process. Contact us to schedule a property valuation and listing consultation.";
  }

  if (lowercaseMessage.includes('price') || lowercaseMessage.includes('cost')) {
    return "Property prices vary based on location, size, and amenities. Browse our listings to see current market prices, or contact our agents for a detailed market analysis in your area of interest.";
  }

  if (lowercaseMessage.includes('location') || lowercaseMessage.includes('area')) {
    return "We have properties in various locations! Use our search feature to filter properties by city or neighborhood. Each listing includes detailed location information and nearby amenities.";
  }

  return "Welcome to Kimia Realty! I'm here to help you with property searches, buying/selling guidance, and general real estate questions. How can I assist you today?";
}
