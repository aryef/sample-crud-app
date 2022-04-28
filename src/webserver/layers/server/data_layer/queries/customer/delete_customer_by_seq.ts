import { ICustomer } from '../../../../common/interface/data/ICustomer';
import { log_exception } from '../../../../common/logger/logger';
import PG_DATA from '../../data_init/pg_data';

export const deleteCustomerById: (
    customer_id: string,
) => Promise<boolean> = async (customer_id: string) => {
    try {
        await PG_DATA<ICustomer>('customer')
            .withSchema('public')
            .where('id', customer_id)
            .del()
            .catch(function (err) {
                log_exception('deleteCustomerById crashed', err);
            });

        return true;
    } catch (err) {
        log_exception('deleteCustomerById crashed', err);

        return false;
    }
};
