import { NextRequest, NextResponse } from 'next/server';
import EasyPost from '@easypost/api';

// Initialize EasyPost client with your API key
const client = new EasyPost(process.env.EASYPOST_API_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    console.log('Creating shipment with:', body);

    // Create shipment with EasyPost
    const shipment = await client.Shipment.create({
      from_address: {
        name: body.from_address.name || 'Sender Name',
        company: body.from_address.company || '',
        street1: body.from_address.street1,
        street2: body.from_address.street2 || '',
        city: body.from_address.city,
        state: body.from_address.state,
        zip: body.from_address.zip,
        country: body.from_address.country || 'US',
        phone: body.from_address.phone || '4155551234',
      },
      to_address: {
        name: body.to_address.name || 'Recipient Name',
        company: body.to_address.company || '',
        street1: body.to_address.street1 || '',
        street2: body.to_address.street2 || '',
        city: body.to_address.city || '',
        state: body.to_address.state || '',
        zip: body.to_address.zip,
        country: body.to_address.country || 'US',
        phone: body.to_address.phone || '4155551234',
      },
      parcel: {
        length: body.parcel.length,
        width: body.parcel.width,
        height: body.parcel.height,
        weight: body.parcel.weight * 16, // Convert pounds to ounces for EasyPost
      },
    });

    console.log('Shipment created:', shipment.id);
    console.log('Rates count:', shipment.rates?.length || 0);

    // Return the rates
    return NextResponse.json({
      success: true,
      shipment_id: shipment.id,
      rates: shipment.rates || [],
    });
  } catch (error: any) {
    console.error('EasyPost API Error:', error);

    // More detailed error handling
    if (error.message?.includes('api_key')) {
      return NextResponse.json(
          {
            success: false,
            error: 'Invalid API key. Please check your EasyPost configuration.',
            details: error.message
          },
          { status: 401 }
      );
    }

    if (error.message?.includes('address')) {
      return NextResponse.json(
          {
            success: false,
            error: 'Invalid address. Please check the shipping addresses.',
            details: error.message
          },
          { status: 400 }
      );
    }

    return NextResponse.json(
        {
          success: false,
          error: error.message || 'Failed to get rates',
          details: process.env.NODE_ENV === 'development' ? error.toString() : undefined
        },
        { status: 400 }
    );
  }
}
