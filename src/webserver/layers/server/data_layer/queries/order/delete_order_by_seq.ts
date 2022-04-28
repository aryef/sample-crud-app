import { ICustomer } from '../../../../common/interface/data/ICustomer';
import {
    log_exception,
    log_warn,
} from '../../../../common/logger/logger';
import { isEmpty } from '../../../../common/utils';
import getPgDb from '../../data_init/get_pg_db';

export const deleteOrderBySeq: (
    seq: string,
) => Promise<boolean> = async (seq: string) => {
    if (seq && !isEmpty(seq)) {
        try {
            await getPgDb<ICustomer>('customer')
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
