import { DateTime } from 'luxon';

export interface ICustomerDetailPersonal {
    first_name: string;
    last_name: string;
    gender: string;
    phone: string;
    updated_at?: DateTime;
    created_at?: DateTime;
}
