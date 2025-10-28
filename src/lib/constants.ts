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
