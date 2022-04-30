import { DateTime } from 'luxon';

//TODO
export interface IOrder {
    seq?: string;
    customer_seq: string;
    transaction_amount: number;
    transaction_ccy: string;
    credit_card_type?: string;
    credit_card_number_encrypted: string;
    credit_card_last_four_digits: string;
    updated_at?: DateTime;
    created_at?: DateTime;
}
