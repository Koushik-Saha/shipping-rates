'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { RatesForm } from '@/components/RatesForm';
import { RatesList } from '@/components/RatesList';
import { Shipment } from '@/types';

export default function RatesPage() {
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [loading, setLoading] = useState(false);
    const [discountEnabled, setDiscountEnabled] = useState(false);
    const [discountValue, setDiscountValue] = useState('');
    const [discountType, setDiscountType] = useState<'percentage' | 'fixed'>('percentage');

    const handleRatesReceived = (data: Shipment) => {
        setShipment(data);
    };

    return (
        <div className="flex bg-gray-50 min-h-screen">
            <Sidebar />
            <div className="flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <RatesForm
                        onRatesReceived={handleRatesReceived}
                        onLoadingChange={setLoading}
                        discountEnabled={discountEnabled}
                        setDiscountEnabled={setDiscountEnabled}
                        discountValue={discountValue}
                        setDiscountValue={setDiscountValue}
                        discountType={discountType}
                        setDiscountType={setDiscountType}
                    />

                    <RatesList
                        shipment={shipment}
                        loading={loading}
                        discountEnabled={discountEnabled}
                        discountValue={discountValue}
                        discountType={discountType}
                    />
                </div>
            </div>
        </div>
    );
}
