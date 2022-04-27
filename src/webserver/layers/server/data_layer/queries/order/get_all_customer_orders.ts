import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';

import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getAllCustomerOrders: (
    seq: string,
) => Promise<IOrder[] | null> = async (seq: string) => {
    if (seq && !isEmpty(seq)) {
        try {
            const ret: void | IOrder[] = await PG_DATA<IOrder>(
                'transaction_register',
            )
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('customer_seq', seq)
                .select()
                .catch((err) => {
                    log_exception(
                        'getAllCustomerOrders crashed',
                        err,
                    );
                });

            if (ret && ret.length > 0) {
                return ret;
            }
        } catch (err) {
            log_exception('getAllCustomerOrders crashed', err);

            return null;
        }

        return null;
    } else {
        log_warn('db: customer seq was not valid');

        return null;
    }
};
