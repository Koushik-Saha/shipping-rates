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
            </div>
        );
    }

    if (!shipment || !shipment.rates || shipment.rates.length === 0) {
        return null;
    }

    // Find the cheapest rate
    const cheapestRate = shipment.rates.reduce((min, current) => {
        const currentPrice = parseFloat(current.rate);
        const minPrice = parseFloat(min.rate);
        return currentPrice < minPrice ? current : min;
    }, shipment.rates[0]);

    // Sort rates by price
    const sortedRates = [...shipment.rates].sort((a, b) => {
        return parseFloat(a.rate) - parseFloat(b.rate);
    });

    // Group by carrier while maintaining sort
    const ratesByCarrier: { carrier: string; rate: Rate }[] = sortedRates.map(rate => ({
        carrier: rate.carrier,
        rate: rate
    }));

    return (
        <div className="mt-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold text-gray-900">Shipping Rates</h2>
                    <p className="text-gray-600 mt-1">Compare rates from multiple carriers</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Showing {shipment.rates.length} rates</span>
                </div>
            </div>

            {/* Rate Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {ratesByCarrier.map(({ carrier, rate }) => (
                    <RateCard
                        key={rate.id}
                        rate={rate}
                        carrierName={carrier}
                        discountEnabled={discountEnabled}
                        discountValue={discountValue}
                        discountType={discountType}
                        isCheapest={rate.id === cheapestRate.id}
                        shipmentDate={new Date()}
                    />
                ))}
            </div>

            {/* Additional Information */}
            <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <h3 className="font-bold text-gray-900 mb-2">💡 Shipping Tips</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                    <li>• All rates include free tracking and basic carrier liability</li>
                    <li>• Delivery dates are estimates based on carrier service levels</li>
                    <li>• Consider adding insurance for high-value items</li>
                    <li>• Package dimensions and weight affect final pricing</li>
                </ul>
            </div>
        </div>
    );
}
