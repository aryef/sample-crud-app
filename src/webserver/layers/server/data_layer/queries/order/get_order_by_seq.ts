import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';

import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getOrderBySeq: (
    seq: string,
) => Promise<IOrder[] | null | void> = async (seq: string) => {
    if (seq && !isEmpty(seq)) {
        try {
            return await PG_DATA<IOrder>('transaction_register')
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('seq', seq)
                .select()
                .catch((err) => {
                    log_exception('getOrderBySeq crashed', err);
                });
        } catch (err) {
            log_exception('getOrderBySeq crashed', err);

            return null;
        }
    } else {
        log_warn('db: seq was not valid');

        return null;
    }
};
