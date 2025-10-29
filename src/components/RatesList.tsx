'use client';

import { Rate, Shipment } from '@/types';
import { RateCard } from './RateCard';
import { LoadingSpinner } from './LoadingSpinner';

interface RatesListProps {
    shipment: Shipment | null;
    loading: boolean;
    discountEnabled?: boolean;
    discountValue?: string;
    discountType?: 'percentage' | 'fixed';
}

export function RatesList({
                              shipment,
                              loading,
                              discountEnabled = false,
                              discountValue = '',
                              discountType = 'percentage'
                          }: RatesListProps) {
    if (loading) {
        return (
            <div className="mt-8">
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg border border-gray-200">
                    <LoadingSpinner 
                        text="Finding the best shipping rates for you..." 
                        size={20}
                        color="#3b82f6"
                    />
                </div>
                
                {/* Optional: Keep skeleton cards below the spinner for better UX */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 opacity-50">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white animate-pulse">
                            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
                            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                            <div className="h-6 bg-gray-200 rounded mb-4"></div>
                            <div className="h-10 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (!shipment || !shipment.rates || shipment.rates.length === 0) {
        return null;
    }

    const ratesByCarrier = shipment.rates.reduce((acc, rate) => {
        const carrier = rate.carrier;
        if (!acc[carrier]) acc[carrier] = [];
        acc[carrier].push(rate);
        return acc;
    }, {} as Record<string, Rate[]>);

    return (
        <div className="mt-8">
            <h2 className="text-3xl font-bold mb-6 text-gray-900">Available Rates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(ratesByCarrier).map(([carrier, rates]) =>
                    rates.map((rate) => (
                        <RateCard
                            key={rate.id}
                            rate={rate}
                            carrierName={carrier}
                            discountEnabled={discountEnabled}
                            discountValue={discountValue}
                            discountType={discountType}
                        />
                    ))
                )}
            </div>
        </div>
    );
}
