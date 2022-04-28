import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';

import {
    log_exception,
    log_info,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

import { getOrderBySeq } from './get_order_by_seq';

export const updateOrder: (
    order: IOrder,
) => Promise<IOrder[] | null | void> = async (order: IOrder) => {
    if (order && !isEmpty(order.seq)) {
        try {
            const ret: void | number = await PG_DATA<IOrder>(
                'transaction_register',
            )
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('seq', order.seq)
                .update(order)
                .catch((err) => {
                    log_exception('updateOrder crashed', err);
                });

            log_info(
                `${ret} rows were updated for order ${order.seq}`,
            );
        } catch (err) {
            log_exception('updateOrder crashed', err);
            return null;
        }

        return await getOrderBySeq(order.seq || '');
    } else {
        log_warn('updateOrder: order seq was not valid');

        return null;
    }
};
