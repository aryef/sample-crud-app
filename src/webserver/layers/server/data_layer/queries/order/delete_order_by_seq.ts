import { ICustomer } from '../../../../common/interface/data/ICustomer';
import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import PG_DATA from '../../data_init/pg_data';

export const deleteOrderBySeq: (
    seq: string,
) => Promise<boolean> = async (seq: string) => {
    if (seq && !isEmpty(seq)) {
        try {
            await PG_DATA<ICustomer>('customer')
                .withSchema('public')
                .where('seq', seq)
                .del()
                .catch(function (err) {
                    log_exception('deleteCustomerById crashed', err);
                });

            return true;
        } catch (err) {
            log_exception('deleteOrderBySeq crashed', err);

            return false;
        }
    } else {
        log_warn('db: order seq was not valid');

        return false;
    }
};
