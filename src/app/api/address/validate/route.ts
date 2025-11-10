import { NextRequest, NextResponse } from 'next/server';
import EasyPost from '@easypost/api';

const client = new EasyPost(process.env.EASYPOST_API_KEY!);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Create and verify address
        const address = await client.Address.create({
            verify: true, // This will validate the address
            ...body
        });

        // Check verification results
        const verifications = address.verifications;

        return NextResponse.json({
            success: true,
            address: {
                id: address.id,
                street1: address.street1,
                street2: address.street2,
                city: address.city,
                state: address.state,
                zip: address.zip,
                country: address.country,
                verified: verifications?.delivery?.success || false,
                errors: verifications?.delivery?.errors || []
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message },
            { status: 400 }
        );
    }
}
