'use client';

import { Rate } from '@/types';

interface RateCardProps {
    rate: Rate;
    carrierName: string;
    discountEnabled?: boolean;
    discountValue?: string | number;
    discountType?: 'percentage' | 'fixed';
}

export function RateCard({ rate, carrierName, discountEnabled = false, discountValue = '', discountType = 'percentage' }: RateCardProps) {
    const retailRate = parseFloat(rate.retail_rate || rate.rate);
    const baseRate = parseFloat(rate.rate);

    // Calculate discounted rate
    let currentRate = baseRate;
    let discountApplied = 0;
    const discountNum = typeof discountValue === 'string' ? parseFloat(discountValue) : discountValue;

    if (discountEnabled && !isNaN(discountNum) && discountNum > 0) {
        if (discountType === 'percentage') {
            discountApplied = (baseRate * discountNum) / 100;
            currentRate = baseRate - discountApplied;
        } else {
            discountApplied = discountNum;
            currentRate = baseRate - discountApplied;
        }
        // Ensure rate doesn't go below 0
        currentRate = Math.max(currentRate, 0);
    }

    const savings = retailRate - currentRate;
    const savingsPercent = retailRate > 0 ? ((savings / retailRate) * 100).toFixed(0) : '0';

    // Carrier colors
    const getCarrierColor = (carrier: string) => {
        switch (carrier.toUpperCase()) {
            case 'UPS':
                return { bg: 'bg-yellow-100', text: 'text-yellow-800', badge: 'bg-red-100 text-red-700' };
            case 'USPS':
                return { bg: 'bg-blue-100', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700' };
            case 'FEDEX':
                return { bg: 'bg-purple-100', text: 'text-purple-800', badge: 'bg-purple-100 text-purple-700' };
            case 'ONTRAC':
                return { bg: 'bg-green-100', text: 'text-green-800', badge: 'bg-green-100 text-green-700' };
            default:
                return { bg: 'bg-gray-100', text: 'text-gray-800', badge: 'bg-gray-100 text-gray-700' };
        }
    };

    const colors = getCarrierColor(carrierName);

    return (
        <div className={`border-2 border-gray-200 rounded-lg p-6 ${colors.bg} hover:shadow-lg transition-shadow`}>
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className={`font-bold text-lg ${colors.text}`}>{carrierName}</span>
                        {rate.service && rate.service.toLowerCase().includes('express') && (
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${colors.badge}`}>
                FAST
              </span>
                        )}
                    </div>
                    <p className="text-gray-700 text-sm font-semibold">{rate.service}</p>
                </div>
            </div>

            {/* Delivery Info */}
            <div className="mb-4 pb-4 border-b-2 border-gray-300">
                {rate.delivery_days && (
                    <p className="text-sm text-gray-900 font-semibold">
                        Estimated delivery in {rate.delivery_days} business days
                    </p>
                )}
                <p className="text-xs text-gray-600 mt-1">Free Tracking, $100 carrier liability</p>
            </div>

            {/* Savings Info */}
            {savings > 0 && (
                <div className="bg-green-100 border-2 border-green-300 p-3 rounded mb-4">
                    <p className="text-green-700 font-bold text-sm">
                        Save {savingsPercent}%
                    </p>
                    <p className="text-green-600 text-xs line-through">
                        ${retailRate.toFixed(2)} retail
                    </p>
                </div>
            )}

            {/* Discount Info */}
            {discountEnabled && discountValue > 0 && (
                <div className="bg-blue-100 border-2 border-blue-300 p-3 rounded mb-4">
                    <p className="text-blue-700 font-bold text-sm">
                        Additional Discount: {discountType === 'percentage' ? `${discountValue}%` : `${discountValue.toFixed(2)}`}
                    </p>
                    <p className="text-blue-600 text-xs">
                        Original: ${baseRate.toFixed(2)} → Discounted: ${currentRate.toFixed(2)}
                    </p>
                </div>
            )}

            {/* Price */}
            <div className="mb-4">
                <p className="text-4xl font-bold text-gray-900">${currentRate.toFixed(2)}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 items-center">
                <button className="flex-1 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 transition-colors cursor-pointer">
                    Ship now
                </button>
                <button className="text-blue-600 text-sm font-bold hover:underline cursor-pointer">
                    Learn more
                </button>
            </div>
        </div>
    );
}
