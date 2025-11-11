'use client';

import { Rate } from '@/types';
import { Truck, Clock, Shield, Tag } from 'lucide-react';
import {useRouter} from "next/navigation";

interface RateCardProps {
    rate: Rate;
    carrierName: string;
    discountEnabled?: boolean;
    discountValue?: string;
    discountType?: 'percentage' | 'fixed';
    isCheapest?: boolean;
    shipmentDate?: Date;
}

export function RateCard({
                             rate,
                             carrierName,
                             discountEnabled = false,
                             discountValue = '',
                             discountType = 'percentage',
                             isCheapest = false,
                             shipmentDate = new Date()
                         }: RateCardProps) {
    const retailRate = parseFloat(rate.retail_rate || rate.rate);
    const baseRate = parseFloat(rate.rate);

    // Calculate discounted rate
    let currentRate = baseRate;
    let discountApplied = 0;
    const discountNum = discountValue ? parseFloat(discountValue) : 0;

    const router = useRouter();

    const handleShipNow = () => {
        // Navigate to create label page with selected rate info
        const params = new URLSearchParams({
            shipmentId: rate.id,
            rateId: rate.id,
            carrier: carrierName,
            service: rate.service || '',
            price: currentRate.toFixed(2)
        });

        router.push(`/ship/create?${params.toString()}`);
    };

    if (discountEnabled && !isNaN(discountNum) && discountNum > 0) {
        if (discountType === 'percentage') {
            discountApplied = (baseRate * discountNum) / 100;
            currentRate = baseRate - discountApplied;
        } else {
            discountApplied = discountNum;
            currentRate = baseRate - discountApplied;
        }
        currentRate = Math.max(currentRate, 0);
    }

    const savings = retailRate - currentRate;
    const savingsPercent = retailRate > 0 ? Math.round((savings / retailRate) * 100) : 0;

    // Calculate estimated delivery date
    const getDeliveryDate = () => {
        if (!rate.delivery_days) return null;
        const deliveryDate = new Date(shipmentDate);
        let daysToAdd = rate.delivery_days;

        // Add business days (skip weekends)
        while (daysToAdd > 0) {
            deliveryDate.setDate(deliveryDate.getDate() + 1);
            if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
                daysToAdd--;
            }
        }

        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const day = dayNames[deliveryDate.getDay()];
        const month = deliveryDate.getMonth() + 1;
        const date = deliveryDate.getDate();

        // Determine delivery time based on service
        let deliveryTime = '11:00 PM';
        if (rate.service?.toLowerCase().includes('express') || rate.service?.toLowerCase().includes('next day')) {
            deliveryTime = '10:30 AM';
        } else if (rate.service?.toLowerCase().includes('2 day') || rate.service?.toLowerCase().includes('2nd day')) {
            deliveryTime = '3:00 PM';
        } else if (rate.service?.toLowerCase().includes('3 day')) {
            deliveryTime = '11:00 PM';
        } else if (rate.service?.toLowerCase().includes('ground')) {
            deliveryTime = '11:00 PM';
        } else {
            deliveryTime = '6:00 PM';
        }

        return `${day} ${month}/${date} by ${deliveryTime}`;
    };

    // Get carrier logo and colors
    const getCarrierBranding = (carrier: string) => {
        const upperCarrier = carrier.toUpperCase();
        switch (upperCarrier) {
            case 'UPS':
                return {
                    logo: '🚛',
                    bgColor: 'bg-yellow-50',
                    accentColor: 'bg-yellow-600',
                    textColor: 'text-yellow-900',
                    badgeColor: 'bg-yellow-600',
                    logoUrl: '/logos.tsx/ups.png' // You'll need to add actual logos.tsx
                };
            case 'USPS':
                return {
                    logo: '📮',
                    bgColor: 'bg-blue-50',
                    accentColor: 'bg-blue-600',
                    textColor: 'text-blue-900',
                    badgeColor: 'bg-blue-600',
                    logoUrl: '/logos.tsx/usps.png'
                };
            case 'FEDEX':
                return {
                    logo: '✈️',
                    bgColor: 'bg-purple-50',
                    accentColor: 'bg-purple-600',
                    textColor: 'text-purple-900',
                    badgeColor: 'bg-purple-600',
                    logoUrl: '/logos.tsx/fedex.png'
                };
            default:
                return {
                    logo: '📦',
                    bgColor: 'bg-gray-50',
                    accentColor: 'bg-gray-600',
                    textColor: 'text-gray-900',
                    badgeColor: 'bg-gray-600',
                    logoUrl: ''
                };
        }
    };

    const branding = getCarrierBranding(carrierName);
    const deliveryDate = getDeliveryDate();

    // Determine carrier liability amount based on service
    const getCarrierLiability = () => {
        const service = rate.service?.toLowerCase() || '';
        if (service.includes('express') || service.includes('priority')) {
            return '$100';
        } else if (service.includes('ground advantage')) {
            return '$100';
        } else if (carrierName.toUpperCase() === 'UPS') {
            return '$100';
        } else {
            return '$20';
        }
    };

    // Get service tagline
    const getServiceTagline = () => {
        const service = rate.service?.toLowerCase() || '';
        if (carrierName.toUpperCase() === 'USPS' && service.includes('ground advantage')) {
            return 'Zone 1, BELOW Commercial Pricing';
        } else {
            return 'Instant Access, Deep Discounts';
        }
    };

    return (
        <div className="border-2 border-gray-200 rounded-lg bg-white hover:shadow-xl transition-all duration-200 overflow-hidden">
            {/* Header Section */}
            <div className="p-5 pb-3">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {/* Carrier Logo */}
                        <div className={`w-10 h-10 rounded flex items-center justify-center ${branding.bgColor}`}>
                            <span className="text-xl">{branding.logo}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="font-bold text-lg text-gray-900">
                                    {carrierName === 'USPS' && rate.service === 'Ground Advantage'
                                        ? 'Ground Advantage'
                                        : `${carrierName}® ${rate.service || ''}`}
                                </h3>
                                {isCheapest && (
                                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">
                                        CHEAPEST
                                    </span>
                                )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{getServiceTagline()}</p>
                        </div>
                    </div>
                </div>

                {/* Estimated Delivery */}
                <div className="mb-3">
                    <p className="text-sm font-semibold text-gray-900">
                        Estimated delivery {deliveryDate} if shipped today
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                        Free Tracking • <span className="text-blue-500 font-semibold">{getCarrierLiability()} carrier liability</span>
                    </p>
                </div>
            </div>

            {/* Savings Section */}
            <div className="bg-green-100 px-5 py-4">
                <div className="flex justify-between items-end">
                    <div>
                        <p className="text-green-700 font-bold text-2xl">Save {savingsPercent}%</p>
                        <p className="text-gray-600 text-sm line-through mt-1">${retailRate.toFixed(2)} retail</p>
                    </div>
                    <div>
                        <p className="text-4xl font-bold text-gray-900">${currentRate.toFixed(2)}</p>
                    </div>
                </div>
            </div>

            {/* Action Section */}
            <div className="p-5 pt-4 flex items-center justify-between">
                <button className="text-blue-500 text-sm font-semibold hover:underline">
                    Learn more & view rates
                </button>
                <button onClick={handleShipNow} className="bg-blue-500 text-white font-bold px-6 py-2.5 rounded-md hover:bg-blue-600 transition-colors">
                    Ship now
                </button>
            </div>
        </div>
    );
}
