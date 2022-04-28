import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';

import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getAllCustomerOrders: (
    customer_seq: string,
) => Promise<IOrder[] | null | void> = async (
    customer_seq: string,
) => {
    if (customer_seq && !isEmpty(customer_seq)) {
        try {
            return await PG_DATA<IOrder>('transaction_register')
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('customer_seq', customer_seq)
                .select()
                .catch((err) => {
                    log_exception(
                        'getAllCustomerOrders crashed',
                        err,
                    );
                });
        } catch (err) {
            log_exception('getAllCustomerOrders crashed', err);

            return null;
        }
    } else {
        log_warn('db: customer seq was not valid');

        return null;
    }
};
