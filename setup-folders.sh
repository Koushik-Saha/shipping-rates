#!/bin/bash

# Color codes for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Setting up Pirate Ship Rates Project...${NC}\n"

# Create Next.js project
echo -e "${BLUE}1️⃣  Creating Next.js project...${NC}"
npx create-next-app@latest pirate-shipping --typescript --tailwind --eslint --no-git --import-alias="" <<< "y
y
y
y
n
"

cd pirate-shipping

# Install additional dependencies
echo -e "\n${BLUE}2️⃣  Installing dependencies...${NC}"
npm install @easypost/api axios lucide-react react-hook-form zod @hookform/resolvers clsx tailwind-merge

# Create folder structure
echo -e "\n${BLUE}3️⃣  Creating folder structure...${NC}"

# Create directories
mkdir -p src/app/api/rates
mkdir -p src/app/\(dashboard\)/rates
mkdir -p src/components/ui
mkdir -p src/lib
mkdir -p src/types
mkdir -p src/hooks

echo -e "${GREEN}✅ Folders created${NC}"

# Create .env.local
echo -e "\n${BLUE}4️⃣  Creating environment file...${NC}"
cat > .env.local << 'EOF'
NEXT_PUBLIC_EASYPOST_API_KEY=your_easypost_public_key_here
EASYPOST_API_KEY=your_easypost_secret_key_here
EOF
echo -e "${GREEN}✅ .env.local created${NC}"

# Create types/index.ts
echo -e "\n${BLUE}5️⃣  Creating TypeScript types...${NC}"
cat > src/types/index.ts << 'EOF'
export interface ShipFromAddress {
  id: string;
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface RateQuoteRequest {
  from_address: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  to_address: {
    street1?: string;
    street2?: string;
    city?: string;
    state?: string;
    zip: string;
    country: string;
  };
  parcel: {
    length: number;
    width: number;
    height: number;
    weight: number;
  };
}

export interface Rate {
  id: string;
  object: string;
  carrier: string;
  service: string;
  rate: string;
  currency: string;
  retail_rate?: string;
  retail_currency?: string;
  list_rate?: string;
  list_currency?: string;
  delivery_days: number | null;
  delivery_date: string | null;
  est_delivery_days: number | null;
}

export interface Shipment {
  id: string;
  object: string;
  reference?: string;
  status: string;
  mode: string;
  created_at: string;
  updated_at: string;
  from_address: any;
  to_address: any;
  parcel: any;
  rates: Rate[];
  selected_rate?: Rate;
}
EOF
echo -e "${GREEN}✅ Types created${NC}"

# Create lib/constants.ts
echo -e "\n${BLUE}6️⃣  Creating constants...${NC}"
cat > src/lib/constants.ts << 'EOF'
export const PACKAGING_TYPES = [
  { id: 'box', label: 'Box or Rigid Packaging', value: 'Box or Rigid Packaging' },
  { id: 'flat', label: 'Flat Rate Envelope', value: 'Flat Rate Envelope' },
  { id: 'letter', label: 'Letter or Document', value: 'Letter or Document' },
  { id: 'padded', label: 'Padded Flat Rate Envelope', value: 'Padded Flat Rate Envelope' },
  { id: 'tube', label: 'Tube', value: 'Tube' },
];

export const COUNTRIES = [
  { code: 'US', label: 'United States' },
  { code: 'CA', label: 'Canada' },
  { code: 'GB', label: 'United Kingdom' },
  { code: 'AU', label: 'Australia' },
  { code: 'DE', label: 'Germany' },
  { code: 'FR', label: 'France' },
];

export const CARRIERS = [
  { id: 'UPS', name: 'UPS', color: 'bg-yellow-100' },
  { id: 'USPS', name: 'USPS', color: 'bg-blue-100' },
  { id: 'FedEx', name: 'FedEx', color: 'bg-purple-100' },
  { id: 'OnTrac', name: 'OnTrac', color: 'bg-green-100' },
];

export const SAVED_ADDRESSES = [
  {
    id: '1',
    name: 'Koushik Saha',
    street1: '774 S Favorite Park Pl Apt 323',
    city: 'Los Angeles',
    state: 'CA',
    zip: '90017',
    country: 'US',
  },
];
EOF
echo -e "${GREEN}✅ Constants created${NC}"

# Create lib/easypost.ts
echo -e "\n${BLUE}7️⃣  Creating EasyPost client...${NC}"
cat > src/lib/easypost.ts << 'EOF'
import EasyPost from '@easypost/api';

const client = new EasyPost(process.env.EASYPOST_API_KEY);

export async function getRates(shipmentData: any) {
  try {
    const shipment = await client.Shipment.create({
      from_address: shipmentData.from_address,
      to_address: shipmentData.to_address,
      parcel: shipmentData.parcel,
    });

    return shipment.rates;
  } catch (error) {
    console.error('Error fetching rates:', error);
    throw error;
  }
}

export async function validateAddress(address: any) {
  try {
    const validatedAddress = await client.Address.create(address);
    return validatedAddress;
  } catch (error) {
    console.error('Error validating address:', error);
    throw error;
  }
}
EOF
echo -e "${GREEN}✅ EasyPost client created${NC}"

# Create API route
echo -e "\n${BLUE}8️⃣  Creating API route...${NC}"
cat > src/app/api/rates/route.ts << 'EOF'
import { NextRequest, NextResponse } from 'next/server';
import EasyPost from '@easypost/api';

const client = new EasyPost(process.env.EASYPOST_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const shipment = await client.Shipment.create({
      from_address: body.from_address,
      to_address: body.to_address,
      parcel: body.parcel,
    });

    return NextResponse.json({
      success: true,
      shipment_id: shipment.id,
      rates: shipment.rates,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
}
EOF
echo -e "${GREEN}✅ API route created${NC}"

# Create components/Sidebar.tsx
echo -e "\n${BLUE}9️⃣  Creating Sidebar component...${NC}"
cat > src/components/Sidebar.tsx << 'EOF'
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Box, BarChart3, Cog, HelpCircle, LogOut } from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const links = [
    { href: '/ship', icon: Box, label: 'Ship' },
    { href: '/rates', icon: BarChart3, label: 'Rates' },
    { href: '/reports', icon: BarChart3, label: 'Reports' },
    { href: '/settings', icon: Cog, label: 'Settings' },
    { href: '/support', icon: HelpCircle, label: 'Support' },
  ];

  return (
    <div className="w-48 bg-gray-100 min-h-screen p-4 flex flex-col">
      <div className="mb-8 flex justify-center">
        <div className="w-16 h-16 bg-black rounded-lg flex items-center justify-center text-white font-bold text-2xl">
          ☠️
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.includes(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-white text-gray-900 font-semibold'
                  : 'text-gray-600 hover:bg-white hover:text-gray-900'
              }`}
            >
              <Icon size={20} />
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-t pt-4 space-y-2">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-white">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✅ Sidebar created${NC}"

# Create components/RateCard.tsx
echo -e "\n${BLUE}🔟 Creating RateCard component...${NC}"
cat > src/components/RateCard.tsx << 'EOF'
import { Rate } from '@/types';

interface RateCardProps {
  rate: Rate;
  carrierName: string;
}

export function RateCard({ rate, carrierName }: RateCardProps) {
  const retailRate = parseFloat(rate.retail_rate || rate.rate);
  const currentRate = parseFloat(rate.rate);
  const savings = retailRate - currentRate;
  const savingsPercent = ((savings / retailRate) * 100).toFixed(0);

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-bold text-lg">{carrierName}</span>
            {rate.service && (
              <span className="text-sm bg-red-100 text-red-700 px-2 py-1 rounded">
                {rate.service.includes('Express') ? 'FAST' : ''}
              </span>
            )}
          </div>
          <p className="text-gray-600 text-sm">{rate.service}</p>
        </div>
      </div>

      <div className="mb-4 pb-4 border-b">
        {rate.delivery_days && (
          <p className="text-sm text-gray-700">
            <span className="font-semibold">
              Estimated delivery in {rate.delivery_days} business days
            </span>
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">Free Tracking, $100 carrier liability</p>
      </div>

      {savings > 0 && (
        <div className="bg-green-50 p-3 rounded mb-4">
          <p className="text-green-700 font-semibold text-sm">Save {savingsPercent}%</p>
          <p className="text-green-600 text-xs line-through">${retailRate.toFixed(2)} retail</p>
        </div>
      )}

      <div className="mb-4">
        <p className="text-3xl font-bold text-gray-900">${currentRate.toFixed(2)}</p>
      </div>

      <div className="flex gap-3">
        <button className="flex-1 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-colors">
          Ship now
        </button>
        <button className="text-blue-500 text-sm font-semibold hover:underline">
          Learn more
        </button>
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✅ RateCard created${NC}"

# Create components/RatesList.tsx
echo -e "\n${BLUE}1️⃣1️⃣  Creating RatesList component...${NC}"
cat > src/components/RatesList.tsx << 'EOF'
import { Rate, Shipment } from '@/types';
import { RateCard } from './RateCard';

interface RatesListProps {
  shipment: Shipment | null;
  loading: boolean;
}

export function RatesList({ shipment, loading }: RatesListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg p-6 bg-white animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-10 bg-gray-200 rounded"></div>
          </div>
        ))}
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
      <h2 className="text-2xl font-bold mb-6">Available Rates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(ratesByCarrier).map(([carrier, rates]) =>
          rates.map((rate) => (
            <RateCard key={rate.id} rate={rate} carrierName={carrier} />
          ))
        )}
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✅ RatesList created${NC}"

# Create components/RatesForm.tsx
echo -e "\n${BLUE}1️⃣2️⃣  Creating RatesForm component...${NC}"
cat > src/components/RatesForm.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { RateQuoteRequest, Shipment } from '@/types';
import { PACKAGING_TYPES, COUNTRIES, SAVED_ADDRESSES } from '@/lib/constants';

interface RatesFormProps {
  onRatesReceived: (shipment: Shipment) => void;
  onLoadingChange: (loading: boolean) => void;
}

export function RatesForm({ onRatesReceived, onLoadingChange }: RatesFormProps) {
  const { control, handleSubmit, watch } = useForm<any>({
    defaultValues: {
      fromAddress: SAVED_ADDRESSES[0],
      toCountry: 'US',
      toZip: '',
      packaging: PACKAGING_TYPES[0].value,
      length: 15,
      width: 12,
      height: 12,
      pounds: 20,
      ounces: 0,
    },
  });

  const [error, setError] = useState('');

  const onSubmit = async (data: any) => {
    setError('');
    onLoadingChange(true);
    try {
      const fromAddr = typeof data.fromAddress === 'string' ? JSON.parse(data.fromAddress) : data.fromAddress;
      const totalWeight = parseFloat(data.pounds) + parseFloat(data.ounces) / 16;

      const payload: RateQuoteRequest = {
        from_address: {
          street1: fromAddr.street1,
          city: fromAddr.city,
          state: fromAddr.state,
          zip: fromAddr.zip,
          country: 'US',
        },
        to_address: {
          zip: data.toZip,
          country: data.toCountry,
        },
        parcel: {
          length: parseInt(data.length),
          width: parseInt(data.width),
          height: parseInt(data.height),
          weight: totalWeight,
        },
      };

      const response = await fetch('/api/rates', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        onRatesReceived({
          id: result.shipment_id,
          object: 'shipment',
          status: 'created',
          mode: 'test',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          from_address: fromAddr,
          to_address: { ...payload.to_address, id: '' },
          parcel: { id: '', object: 'parcel', ...payload.parcel },
          rates: result.rates,
        });
      } else {
        setError(result.error || 'Failed to fetch rates');
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      onLoadingChange(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-lg p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Quick Rate Quote</h1>
      <p className="text-gray-600 mb-8">Get instant shipping rates from multiple carriers</p>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded text-red-700">
          {error}
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Ship From</label>
        <Controller
          name="fromAddress"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {SAVED_ADDRESSES.map((addr) => (
                <option key={addr.id} value={JSON.stringify(addr)}>
                  {addr.name} - {addr.street1}, {addr.city}, {addr.state} {addr.zip}
                </option>
              ))}
            </select>
          )}
        />
        <button
          type="button"
          className="text-blue-500 text-sm font-semibold mt-2 hover:underline"
        >
          + Create New Ship From Address
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Ship To</label>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="toCountry"
            control={control}
            render={({ field }) => (
              <select
                {...field}
                className="border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
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
                placeholder="ZIP code"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Type of Packaging</label>
        <Controller
          name="packaging"
          control={control}
          render={({ field }) => (
            <select
              {...field}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {PACKAGING_TYPES.map((type) => (
                <option key={type.id} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          )}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Package Dimensions (Inches)</label>
        <div className="grid grid-cols-3 gap-4">
          <Controller
            name="length"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Length"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          <Controller
            name="width"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Width"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          <Controller
            name="height"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Height"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold mb-2">Package Weight</label>
        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="pounds"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Pounds"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
          <Controller
            name="ounces"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                placeholder="Ounces"
                className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-green-500 text-white font-bold py-3 rounded-lg hover:bg-green-600 transition-colors"
      >
        Get Rate Quote
      </button>
    </form>
  );
}
EOF
echo -e "${GREEN}✅ RatesForm created${NC}"

# Create dashboard layout
echo -e "\n${BLUE}1️⃣3️⃣  Creating dashboard layout...${NC}"
cat > src/app/\(dashboard\)/layout.tsx << 'EOF'
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
EOF
echo -e "${GREEN}✅ Dashboard layout created${NC}"

# Create rates page
echo -e "\n${BLUE}1️⃣4️⃣  Creating rates page...${NC}"
cat > src/app/\(dashboard\)/rates/page.tsx << 'EOF'
'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { RatesForm } from '@/components/RatesForm';
import { RatesList } from '@/components/RatesList';
import { Shipment } from '@/types';

export default function RatesPage() {
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [loading, setLoading] = useState(false);

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
          />
          <RatesList shipment={shipment} loading={loading} />
        </div>
      </div>
    </div>
  );
}
EOF
echo -e "${GREEN}✅ Rates page created${NC}"

# Update root layout
echo -e "\n${BLUE}1️⃣5️⃣  Updating root layout...${NC}"
cat > src/app/layout.tsx << 'EOF'
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pirate Ship - Shipping Rates',
  description: 'Compare and get instant shipping rates',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
EOF
echo -e "${GREEN}✅ Root layout updated${NC}"

echo -e "\n${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ PROJECT SETUP COMPLETE!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}\n"

echo -e "${BLUE}📝 Next steps:${NC}"
echo "1. Update .env.local with your EasyPost API keys:"
echo "   - Visit: https://app.easypost.com/account/settings/credentials"
echo ""
echo "2. Start the development server:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "3. Open in browser:"
echo "   ${GREEN}http://localhost:3000/rates${NC}"
echo ""
echo -e "${BLUE}📂 Project structure created in:${NC} $(pwd)"
echo ""
