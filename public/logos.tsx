// Enhanced getCarrierBranding function with better visual representation
const getCarrierBranding = (carrier: string, service: string = '') => {
    const upperCarrier = carrier.toUpperCase();
    const serviceLower = service.toLowerCase();

    switch (upperCarrier) {
        case 'UPS':
            return {
                icon: (
                    <div className="w-10 h-10 bg-amber-800 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UPS</span>
                        </div>
                ),
                bgColor: 'bg-amber-50',
                savingsBg: 'bg-green-100',
                textColor: 'text-amber-900'
            };
        case 'USPS':
            return {
                icon: (
                    <div className="w-10 h-10 bg-blue-700 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">USPS</span>
                        </div>
                ),
                bgColor: 'bg-blue-50',
                savingsBg: 'bg-green-100',
                textColor: 'text-blue-900'
            };
        case 'FEDEX':
            return {
                icon: (
                    <div className="w-10 h-10 bg-purple-700 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">FedEx</span>
                        </div>
                ),
                bgColor: 'bg-purple-50',
                savingsBg: 'bg-green-100',
                textColor: 'text-purple-900'
            };
        default:
            return {
                icon: (
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{upperCarrier.slice(0, 3)}</span>
                        </div>
                ),
                bgColor: 'bg-gray-50',
                savingsBg: 'bg-green-100',
                textColor: 'text-gray-900'
            };
    }
};
