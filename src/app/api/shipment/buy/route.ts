import { NextRequest, NextResponse } from 'next/server';
import EasyPost from '@easypost/api';

const client = new EasyPost(process.env.EASYPOST_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const { shipmentId, rateId, insuranceAmount } = await request.json();

        // Prepare the buy parameters
        const buyParams: any = {
            rate: { id: rateId }
        };

        // Add insurance if specified
        if (insuranceAmount) {
            buyParams.insurance = insuranceAmount.toString();
        }

        // Buy the shipment with the selected rate
        const purchasedShipment = await client.Shipment.buy(
            shipmentId,
            buyParams
        );

        return NextResponse.json({
            success: true,
            shipment: {
                id: purchasedShipment.id,
                tracking_code: purchasedShipment.tracking_code,
                postage_label: purchasedShipment.postage_label,
                selected_rate: purchasedShipment.selected_rate,
                insurance: purchasedShipment.insurance,
            }
        });
    } catch (error: any) {
        console.error('Purchase error:', error);
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
