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
