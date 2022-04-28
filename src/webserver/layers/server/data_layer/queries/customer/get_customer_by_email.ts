import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getCustomerByEmail: (
    email: string,
) => Promise<ICustomer[] | null | void> = async (email: string) => {
    if (email && !isEmpty(email)) {
        try {
            return PG_DATA<ICustomer>('customer')
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('email', email)
                .select()
                .catch((err) => {
                    log_exception('getCustomerByEmail crashed', err);
                });
        } catch (err) {
            log_exception('getCustomerByEmail crashed', err);

            return null;
        }
    } else {
        log_warn('getCustomerByEmail : email was not valid');

        return null;
    }
};
