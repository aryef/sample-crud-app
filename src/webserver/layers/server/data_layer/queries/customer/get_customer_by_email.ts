import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import {
    log_error,
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const getCustomerByEmail: (
    email: string,
) => Promise<ICustomer | null> = async (email: string) => {
    if (email && !isEmpty(email)) {
        try {
            const ret: void | ICustomer[] = await PG_DATA<ICustomer>(
                'customer',
            )
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('email', email)
                .select()
                .catch((err) => {
                    log_exception('getCustomerByEmail crashed', err);
                });

            if (ret && ret.length === 1) {
                return ret[0];
            } else if (ret && ret.length > 1) {
                log_error(
                    `more than 1 such user with email ${email} in db, check your data`,
                );
                return null;
            }
        } catch (err) {
            log_exception('getCustomerByEmail crashed', err);

            return null;
        }

        return null;
    } else {
        log_warn('db: email was not valid');

        return null;
    }
};
