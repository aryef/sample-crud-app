import { DateTime } from 'luxon';
import { ICustomerDetailAddress } from './ICustomerDetailAddress';
import { ICustomerDetailPersonal } from './ICustomerDetailPersonal';
import { IOrder } from './IOrder';

//TODO
export interface ICustomer {
    seq: string;
    customer_id: string;
    email: string;
    customer_detail?: {
        address?: ICustomerDetailAddress[];
        personal?: ICustomerDetailPersonal;
    };

    orders?: IOrder[];
    updated_at?: DateTime;
    created_at?: DateTime;
}
