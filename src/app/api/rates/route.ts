import { NextRequest, NextResponse } from 'next/server';
import EasyPost from '@easypost/api';

const client = new EasyPost(process.env.EASYPOST_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const shipment = await client.Shipment.create({
      from_address: body.from_address,
      to_address: body.to_address,
      parcel: body.parcel,
    });

    return NextResponse.json({
      success: true,
      shipment_id: shipment.id,
      rates: shipment.rates,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
