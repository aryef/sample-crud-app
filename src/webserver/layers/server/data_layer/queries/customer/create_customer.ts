import { DateTime } from 'luxon';
import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import { log_exception } from '../../../../common/logger/logger';
import { generate_uuid } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';
import { getCustomerByEmail } from './get_customer_by_email';

export const createCustomer: (
    customer_id: string,
    email: string,
) => Promise<ICustomer | null> = async (
    customer_id: string,
    email: string,
) => {
    const customer: ICustomer = {
        seq: generate_uuid(),
        customer_id: customer_id,
        email: email,
        updated_at: DateTime.local(),
    };

    try {
        await PG_DATA<ICustomer>('customer')
            .withSchema(CUSTOMER_DATA_SCHEMA)
            .insert(customer)
            .catch(function (err) {
                log_exception('createUser crashed', err);
            });
    } catch (err) {
        log_exception('createCustomer crashed', err);

        return null;
    }

    return await getCustomerByEmail(email);
};
