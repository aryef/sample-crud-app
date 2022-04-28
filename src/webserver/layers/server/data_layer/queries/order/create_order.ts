import { DateTime } from 'luxon';
import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import { IOrder } from '../../../../common/interface/data/IOrder';
import { log_exception } from '../../../../common/logger/logger';
import { generate_uuid } from '../../../../common/utils';
import getPgDb from '../../data_init/get_pg_db';
import { getOrderBySeq } from './get_order_by_seq';

export const createOrder: (
    order: IOrder,
) => Promise<IOrder | null> = async (order: IOrder) => {
    const seq = generate_uuid();

    const newOrder: IOrder = {
        seq: seq,
        total_price: order.total_price,
        currency: order.currency,
        credit_card_type: order.credit_card_type,
        credit_card_number: order.credit_card_number,
        updated_at: DateTime.local(),
    };

    try {
        await getPgDb<ICustomer>('customer')
            .withSchema(CUSTOMER_DATA_SCHEMA)
            .insert(newOrder)
            .catch(function (err) {
                log_exception('createUser crashed', err);
            });
    } catch (err) {
        log_exception('createCustomer crashed', err);

        return null;
    }

    return await getOrderBySeq(seq);
};
