import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { IOrder } from '../../../../common/interface/data/IOrder';
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
            await PG_DATA<IOrder>('transaction_register')
                .withSchema(CUSTOMER_DATA_SCHEMA)
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
        log_warn('deleteOrderBySeq: order seq was not valid');

        return false;
    }
};
