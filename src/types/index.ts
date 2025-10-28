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
