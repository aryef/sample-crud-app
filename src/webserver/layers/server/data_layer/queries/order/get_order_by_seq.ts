import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';

import {
    log_error,
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import getPgDb from '../../data_init/get_pg_db';

export const getOrderBySeq: (
    seq: string,
) => Promise<IOrder | null> = async (seq: string) => {
    if (seq && !isEmpty(seq)) {
        try {
            const ret: void | IOrder[] = await getPgDb<IOrder>(
                'customer',
            )
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('seq', seq)
                .select()
                .catch((err) => {
                    log_exception('getOrderBySeq crashed', err);
                });

            if (ret && ret.length === 1) {
                return ret[0];
            } else if (ret && ret.length > 1) {
                log_error(
                    `more than 1 such order with seq "${seq}" in db, check your data`,
                );
                return null;
            }
        } catch (err) {
            log_exception('getOrderBySeq crashed', err);

            return null;
        }

        return null;
    } else {
        log_warn('db: seq was not valid');

        return null;
    }
};
