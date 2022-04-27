import { DateTime } from 'luxon';

export interface ICustomerDetailAddress {
    seq: string;
    is_default_address: number;
    country: string;
    city: string;
    street: string;
    geolocation: [
        {
            level: string;
            wgs84: {
                lon: number;
                lat: number;
            };
        },
    ];
    updated_at?: DateTime;
    created_at?: DateTime;
}
