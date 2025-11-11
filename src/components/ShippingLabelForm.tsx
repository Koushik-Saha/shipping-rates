'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Package, AlertCircle, HelpCircle, ChevronDown } from 'lucide-react';
import Link from 'next/link';

interface ShippingLabelFormProps {
    prefilledShipmentId?: string | null;
    prefilledRateId?: string | null;
    prefilledCarrier?: string | null;
    prefilledService?: string | null;
    prefilledPrice?: string | null;
}

const PACKAGING_TYPES = [
    { id: 'box', label: 'Box or Rigid Packaging', description: 'Any custom box or thick parcel', icon: '📦' },
    { id: 'envelope', label: 'Flat Rate Envelope', description: 'USPS Flat Rate Envelope', icon: '✉️' },
    { id: 'letter', label: 'Letter', description: 'Letter or document mailer', icon: '📄' },
    { id: 'flat_rate_padded', label: 'Flat Rate Padded Envelope', description: 'USPS Padded Flat Rate Envelope', icon: '📨' },
    { id: 'soft_pack', label: 'Soft Pack', description: 'Padded envelope or poly mailer', icon: '📦' },
    { id: 'tube', label: 'Tube', description: 'Tube or poster roll', icon: '🗞️' },
];

const SAVED_FROM_ADDRESSES = [
    {
        id: '1',
        name: 'Koushik Saha',
        street1: '274 S La Fayette Park Pl Apt 323',
        city: 'Los Angeles',
        state: 'CA',
        zip: '90057-1344',
        country: 'US',
        isDefault: true,
    }
];

export function ShippingLabelForm({
                                      prefilledShipmentId,
                                      prefilledRateId,
                                      prefilledCarrier,
                                      prefilledService,
                                      prefilledPrice
                                  }: ShippingLabelFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [selectedPackaging, setSelectedPackaging] = useState('box');
    const [showPackagingDropdown, setShowPackagingDropdown] = useState(false);
    const [selectedFromAddress, setSelectedFromAddress] = useState(SAVED_FROM_ADDRESSES[0]);
    const [showFromDropdown, setShowFromDropdown] = useState(false);

    const { control, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        defaultValues: {
            // Ship To
            toEmail: '',
            toPhone: '',
            toName: '',
            toCompany: '',
            toAddress1: '',
            toAddress2: '',
            toCity: '',
            toState: '',
            toZip: '',
            toCountry: 'United States',

            // Package
            length: '20',
            width: '12',
            height: '12',
            pounds: '20',
            ounces: '0',

            // Options
            insurance: false,
            extraServices: false,
            hazardousMaterials: false,
            customsForm: false,
            savePackage: false,

            // Rubber Stamps
            rubberStamps: false,
        },
    });

    const onSubmit = async (data: any) => {
        setError('');
        setLoading(true);

        try {
            // If we have a pre-selected rate, purchase the label
            if (prefilledShipmentId && prefilledRateId) {
                const response = await fetch('/api/shipment/buy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        shipmentId: prefilledShipmentId,
                        rateId: prefilledRateId,
                        insuranceAmount: data.insurance ? 100 : 0
                    })
                });

                const result = await response.json();

                if (result.success) {
                    // Redirect to success page or show label
                    router.push(`/ship/label/${result.shipment.id}`);
                } else {
                    setError(result.error || 'Failed to purchase label');
                }
            } else {
                // Create new shipment and get rates
                const totalWeight = parseFloat(data.pounds) + parseFloat(data.ounces) / 16;

                const payload = {
                    from_address: {
                        name: selectedFromAddress.name,
                        street1: selectedFromAddress.street1,
                        city: selectedFromAddress.city,
                        state: selectedFromAddress.state,
                        zip: selectedFromAddress.zip,
                        country: selectedFromAddress.country,
                    },
                    to_address: {
                        name: data.toName,
                        company: data.toCompany,
                        street1: data.toAddress1,
                        street2: data.toAddress2,
                        city: data.toCity,
                        state: data.toState,
                        zip: data.toZip,
                        country: 'US',
                        email: data.toEmail,
                        phone: data.toPhone,
                    },
                    parcel: {
                        length: parseInt(data.length),
                        width: parseInt(data.width),
                        height: parseInt(data.height),
                        weight: totalWeight,
                    },
                };

                // Store form data in session storage to persist it
                sessionStorage.setItem('shipmentData', JSON.stringify(payload));

                // Redirect to rates page
                router.push('/rates?fromCreate=true');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Header */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h1 className="text-2xl font-bold text-gray-900">Create a Shipping Label</h1>

                {/* Selected Rate Info (if coming from rates page) */}
                {prefilledCarrier && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                            Selected Rate: <span className="font-bold">{prefilledCarrier} {prefilledService}</span>
                            <span className="ml-2 text-green-600 font-bold">${prefilledPrice}</span>
                        </p>
                    </div>
                )}
            </div>

            {/* Ship To Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-lg font-bold text-gray-900">Ship To</h2>
                    <Link href="#" className="text-blue-500 text-sm hover:underline">Paste Address</Link>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="toEmail"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="email"
                                placeholder="Email (optional)"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    <Controller
                        name="toPhone"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="tel"
                                placeholder="Phone (optional)"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Controller
                        name="toName"
                        control={control}
                        rules={{ required: 'Name is required' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Name"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    <Controller
                        name="toCompany"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Company (optional)"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-4">
                    <Controller
                        name="toAddress1"
                        control={control}
                        rules={{ required: 'Address is required' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Address"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    <Controller
                        name="toAddress2"
                        control={control}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Apt / Unit / Suite / etc. (optional)"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                </div>

                <div className="grid grid-cols-4 gap-4 mt-4">
                    <Controller
                        name="toCity"
                        control={control}
                        rules={{ required: 'City is required' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="City"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    <Controller
                        name="toState"
                        control={control}
                        rules={{ required: 'State is required' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="State"
                                maxLength={2}
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    <Controller
                        name="toZip"
                        control={control}
                        rules={{ required: 'ZIP code is required' }}
                        render={({ field }) => (
                            <input
                                {...field}
                                type="text"
                                placeholder="Zipcode"
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        )}
                    />
                    <Controller
                        name="toCountry"
                        control={control}
                        render={({ field }) => (
                            <select
                                {...field}
                                className="w-full border border-gray-300 rounded-md px-4 py-2.5 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>United States</option>
                                <option>Canada</option>
                                <option>Mexico</option>
                            </select>
                        )}
                    />
                </div>

                {/* Rubber Stamps Option */}
                <div className="mt-4 flex items-center gap-2">
                    <Controller
                        name="rubberStamps"
                        control={control}
                        render={({ field: { value, ...field } }) => (
                            <input
                                {...field}
                                type="checkbox"
                                checked={value}
                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                        )}
                    />
                    <label className="text-sm text-gray-700">
                        Rubber Stamps
                    </label>
                    <span className="text-xs text-gray-500">Print extra information on the label.</span>
                    <Link href="#" className="text-xs text-blue-500 hover:underline">Learn more</Link>
                </div>
            </div>

            {/* Ship From Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Ship From</h2>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowFromDropdown(!showFromDropdown)}
                        className="w-full border border-gray-300 rounded-md p-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                    >
                        <div>
                            <p className="font-semibold text-gray-900">{selectedFromAddress.name}</p>
                            <p className="text-sm text-gray-600">
                                Physical Address: {selectedFromAddress.street1}, {selectedFromAddress.city}, {selectedFromAddress.state} {selectedFromAddress.zip}
                            </p>
                            <p className="text-sm text-gray-600">
                                Return Address: {selectedFromAddress.street1}, {selectedFromAddress.city}, {selectedFromAddress.state} {selectedFromAddress.zip}
                            </p>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showFromDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showFromDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {SAVED_FROM_ADDRESSES.map((address) => (
                                <button
                                    key={address.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedFromAddress(address);
                                        setShowFromDropdown(false);
                                    }}
                                    className="w-full p-4 text-left hover:bg-gray-50 border-b last:border-b-0"
                                >
                                    <p className="font-semibold text-gray-900">{address.name}</p>
                                    <p className="text-sm text-gray-600">
                                        {address.street1}, {address.city}, {address.state} {address.zip}
                                    </p>
                                </button>
                            ))}
                            <button
                                type="button"
                                className="w-full p-4 text-left hover:bg-gray-50 text-blue-500 font-semibold"
                            >
                                + Add New Ship From Address
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Type of Packaging */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Type of Packaging</h2>

                <div className="relative">
                    <button
                        type="button"
                        onClick={() => setShowPackagingDropdown(!showPackagingDropdown)}
                        className="w-full bg-blue-50 border border-blue-200 rounded-md p-4 text-left hover:bg-blue-100 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">📦</span>
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {PACKAGING_TYPES.find(p => p.id === selectedPackaging)?.label}
                                </p>
                                <p className="text-sm text-gray-600">
                                    {PACKAGING_TYPES.find(p => p.id === selectedPackaging)?.description}
                                </p>
                            </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${showPackagingDropdown ? 'rotate-180' : ''}`} />
                    </button>

                    {showPackagingDropdown && (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                            {PACKAGING_TYPES.map((type) => (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => {
                                        setSelectedPackaging(type.id);
                                        setShowPackagingDropdown(false);
                                    }}
                                    className="w-full p-4 text-left hover:bg-gray-50 border-b last:border-b-0 flex items-center gap-3"
                                >
                                    <span className="text-2xl">{type.icon}</span>
                                    <div>
                                        <p className="font-semibold text-gray-900">{type.label}</p>
                                        <p className="text-sm text-gray-600">{type.description}</p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Package Dimensions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Package Dimensions (Inches)</h2>

                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Length</label>
                        <Controller
                            name="length"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Width</label>
                        <Controller
                            name="width"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Height</label>
                        <Controller
                            name="height"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Package Weight */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Package Weight</h2>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Pounds</label>
                        <Controller
                            name="pounds"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                    </div>
                    <div>
                        <label className="text-xs text-gray-500 mb-1 block">Ounces</label>
                        <Controller
                            name="ounces"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    className="w-full border border-gray-300 rounded-md px-4 py-2.5 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            )}
                        />
                    </div>
                </div>
            </div>

            {/* Additional Options */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-bold text-gray-900 mb-4">Additional Options</h2>

                <div className="space-y-3">
                    {/* Insurance */}
                    <div className="flex items-start gap-3">
                        <Controller
                            name="insurance"
                            control={control}
                            render={({ field: { value, ...field } }) => (
                                <input
                                    {...field}
                                    type="checkbox"
                                    checked={value}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                                />
                            )}
                        />
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-gray-900">Insurance</label>
                            <p className="text-xs text-gray-500">Enter the total value of your shipment to add coverage by InsureShield.</p>
                            <Link href="#" className="text-xs text-blue-500 hover:underline">View Pricing, Excluded Items, and Terms</Link>
                        </div>
                    </div>

                    {/* Extra Services */}
                    <div className="flex items-start gap-3">
                        <div className="flex items-center gap-2">
                            <HelpCircle className="w-4 h-4 text-gray-400" />
                            <span className="text-sm font-semibold text-gray-900">Extra Services</span>
                            <span className="text-xs text-gray-500">No extra services activated</span>
                        </div>
                    </div>

                    {/* Hazardous Materials */}
                    <div className="flex items-start gap-3">
                        <Controller
                            name="hazardousMaterials"
                            control={control}
                            render={({ field: { value, ...field } }) => (
                                <input
                                    {...field}
                                    type="checkbox"
                                    checked={value}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                                />
                            )}
                        />
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-gray-900">Hazardous Materials</label>
                            <p className="text-xs text-gray-500">Perfume, nail polish, hair spray, dry ice, lithium batteries, firearms, lighters, fuels, etc.</p>
                            <Link href="#" className="text-xs text-blue-500 hover:underline">Learn how to ship Hazardous Materials</Link>
                        </div>
                    </div>

                    {/* Customs Form */}
                    <div className="flex items-start gap-3">
                        <Controller
                            name="customsForm"
                            control={control}
                            render={({ field: { value, ...field } }) => (
                                <input
                                    {...field}
                                    type="checkbox"
                                    checked={value}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                                />
                            )}
                        />
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-gray-900">Customs Form</label>
                            <p className="text-xs text-gray-500">Required for International, Military APO/FPO, and U.S. Territories</p>
                        </div>
                    </div>

                    {/* Save Package */}
                    <div className="flex items-start gap-3">
                        <Controller
                            name="savePackage"
                            control={control}
                            render={({ field: { value, ...field } }) => (
                                <input
                                    {...field}
                                    type="checkbox"
                                    checked={value}
                                    className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 mt-0.5"
                                />
                            )}
                        />
                        <div className="flex-1">
                            <label className="text-sm font-semibold text-gray-900">Save Package</label>
                            <p className="text-xs text-gray-500">Save your settings for repeated use.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Error Display */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-700 text-sm">{error}</p>
                </div>
            )}

            {/* Submit Button */}
            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 text-lg"
                >
                    {loading ? 'Processing...' : 'Get Rates'}
                </button>
            </div>

            {/* Footer Links */}
            <div className="text-center text-xs text-gray-500 py-4">
                © 2024-2024 · All Rights Reserved <br />
                <Link href="/privacy" className="text-blue-500 hover:underline">Privacy Policy</Link> ·
                <Link href="/terms" className="text-blue-500 hover:underline ml-1">Terms of Use</Link> ·
                <Link href="/cookies" className="text-blue-500 hover:underline ml-1">USA - Cookies Notice</Link>
                <div className="mt-2 text-gray-600">
                    🌐 <Link href="#" className="text-blue-500 hover:underline">Request your Privacy &amp; Data Settings</Link>
                </div>
            </div>
        </form>
    );
}
