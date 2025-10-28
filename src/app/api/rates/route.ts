import { NextRequest, NextResponse } from 'next/server';

// Mock response since we don't have real API key
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Generate fake rates data
    const fakeRates = [
      {
        id: 'rate_1',
        carrier: 'UPS',
        service: 'Ground Saver',
        rate: '22.29',
        retail_rate: '46.71',
        delivery_days: 5
      },
      {
        id: 'rate_2',
        carrier: 'UPS',
        service: 'Ground',
        rate: '22.33',
        retail_rate: '49.52',
        delivery_days: 3
      },
      {
        id: 'rate_3',
        carrier: 'USPS',
        service: 'Ground Advantage',
        rate: '23.19',
        retail_rate: '40.45',
        delivery_days: 4
      },
      {
        id: 'rate_4',
        carrier: 'UPS',
        service: '3 Day Select',
        rate: '42.18',
        retail_rate: '143.66',
        delivery_days: 3
      },
      {
        id: 'rate_5',
        carrier: 'USPS',
        service: 'Priority Mail',
        rate: '44.84',
        retail_rate: '71.52',
        delivery_days: 2
      },
      {
        id: 'rate_6',
        carrier: 'FedEx',
        service: '2nd Day Air',
        rate: '67.53',
        retail_rate: '238.47',
        delivery_days: 2
      },
      {
        id: 'rate_7',
        carrier: 'UPS',
        service: 'Next Day Air Saver',
        rate: '103.25',
        retail_rate: '316.27',
        delivery_days: 1
      },
      {
        id: 'rate_8',
        carrier: 'UPS',
        service: 'Next Day Air',
        rate: '110.18',
        retail_rate: '335.33',
        delivery_days: 1
      },
      {
        id: 'rate_9',
        carrier: 'FedEx',
        service: 'Next Day Air Early',
        rate: '141.95',
        retail_rate: '350.27',
        delivery_days: 1
      },
      {
        id: 'rate_10',
        carrier: 'USPS',
        service: 'Priority Mail Express',
        rate: '157.25',
        retail_rate: '168.64',
        delivery_days: 1
      },
    ];

    return NextResponse.json({
      success: true,
      shipment_id: `shipment_${Date.now()}`,
      rates: fakeRates.map((rate) => ({
        id: rate.id,
        object: 'rate',
        carrier: rate.carrier,
        service: rate.service,
        rate: rate.rate,
        currency: 'USD',
        retail_rate: rate.retail_rate,
        retail_currency: 'USD',
        list_rate: rate.retail_rate,
        list_currency: 'USD',
        delivery_days: rate.delivery_days,
        delivery_date: null,
        est_delivery_days: rate.delivery_days,
      })),
    });
  } catch (error: any) {
    console.error('Error in rates API:', error);
    return NextResponse.json(
        { success: false, error: error.message || 'Failed to get rates' },
        { status: 400 }
    );
  }
}
