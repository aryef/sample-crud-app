import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import { log_exception } from '../../../../common/logger/logger';
import PG_DATA from '../../data_init/pg_data';

export const deleteCustomerBySeq: (
    seq: string,
) => Promise<boolean> = async (seq: string) => {
    try {
        await PG_DATA<ICustomer>('customer')
            .withSchema(CUSTOMER_DATA_SCHEMA)
            .where('seq', seq)
            .del()
            .catch(function (err) {
                log_exception('deleteCustomerBySeq crashed', err);
            });

        return true;
    } catch (err) {
        log_exception('deleteCustomerBySeq crashed', err);

        return false;
    }
};
