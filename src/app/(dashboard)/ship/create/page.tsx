'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Sidebar } from '@/components/Sidebar';
import { Shipment } from '@/types';
import {ShippingLabelForm} from "@/components/ShippingLabelForm";

export default function CreateShippingLabelPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Pre-fill from rate selection if coming from rates page
    const shipmentId = searchParams.get('shipmentId');
    const rateId = searchParams.get('rateId');
    const carrier = searchParams.get('carrier');
    const service = searchParams.get('service');
    const price = searchParams.get('price');

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-4xl mx-auto">
                    <ShippingLabelForm
                        prefilledShipmentId={shipmentId}
                        prefilledRateId={rateId}
                        prefilledCarrier={carrier}
                        prefilledService={service}
                        prefilledPrice={price}
                    />
                </div>
            </div>
        </div>
    );
}
