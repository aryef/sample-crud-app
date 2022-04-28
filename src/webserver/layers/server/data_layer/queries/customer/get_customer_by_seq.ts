import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';

import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getCustomerBySeq: (
    id: string,
) => Promise<ICustomer[] | null | void> = async (seq: string) => {
    if (seq && !isEmpty(seq)) {
        try {
            return PG_DATA<ICustomer>('customer')
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('seq', seq)
                .select()
                .catch((err) => {
                    log_exception('getCustomerBySeq crashed', err);
                });
        } catch (err) {
            log_exception('getCustomerBySeq crashed', err);

            return null;
        }
    } else {
        log_warn('getCustomerBySeq : customer_id was not valid');

        return null;
    }
};
