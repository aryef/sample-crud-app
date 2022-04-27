import { DateTime } from 'luxon';

//TODO
export interface IOrder {
    seq?: string;
    total_price?: number;
    currency?: string;
    credit_card_type?: string;
    credit_card_number?: string;
    updated_at?: DateTime;
    created_at?: DateTime;
}
