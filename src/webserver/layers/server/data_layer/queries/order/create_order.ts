import { DateTime } from 'luxon';
import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';
import { log_exception } from '../../../../common/logger/logger';
import { generate_uuid } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

import { getOrderBySeq } from './get_order_by_seq';

export const createOrder: (
    order: IOrder,
) => Promise<IOrder[] | null | void> = async (order: IOrder) => {
    const seq = generate_uuid();

    const newOrder: IOrder = {
        seq: seq,
        customer_seq: order.customer_seq,
        transaction_ccy: order.transaction_ccy,
        transaction_amount: order.transaction_amount,
        credit_card_type: order.credit_card_type,
        credit_card_number_encrypted:
            order.credit_card_number_encrypted,
        credit_card_last_four_digits:
            order.credit_card_last_four_digits,
        updated_at: DateTime.local(),
    };

    try {
        await PG_DATA<IOrder>('transaction_register')
            .withSchema(CUSTOMER_DATA_SCHEMA)
            .insert(newOrder)
            .catch(function (err) {
                log_exception('createOrder crashed', err);
            });
    } catch (err) {
        log_exception('createOrder crashed', err);

        return null;
    }

    return await getOrderBySeq(seq);
};
