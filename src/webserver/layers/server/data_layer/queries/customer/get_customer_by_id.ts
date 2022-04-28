import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';

import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getCustomerById: (
    id: string,
) => Promise<ICustomer[] | null | void> = async (
    customer_id: string,
) => {
    if (customer_id && !isEmpty(customer_id)) {
        try {
            return PG_DATA<ICustomer>('customer')
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('customer_id', customer_id)
                .select()
                .catch((err) => {
                    log_exception('getCustomerById crashed', err);
                });
        } catch (err) {
            log_exception('getCustomerById crashed', err);

            return null;
        }
    } else {
        log_warn('getCustomerById : customer_id was not valid');

        return null;
    }
};
