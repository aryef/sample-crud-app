import { CUSTOMER_DATA_SCHEMA } from '../../../../../common/environment/constants';
import { ICustomerDetailPersonal } from '../../../../../common/interface/data/ICustomerDetailPersonal';
import {
    log_exception,
    log_warn,
} from '../../../../../common/logger/logger';
import { isEmpty } from '../../../../../common/utils';
import PG_DATA from '../../../data_init/pg_data';

export const getCustomerPersonalByCustomerSeq: (
    customer_seq: string,
) => Promise<ICustomerDetailPersonal[] | null | void> = async (
    customer_seq: string,
) => {
    if (customer_seq && !isEmpty(customer_seq)) {
        try {
            return PG_DATA<ICustomerDetailPersonal>(
                'customer_detail_personal',
            )
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('customer_seq', customer_seq)
                .select()
                .catch((err) => {
                    log_exception(
                        'getCustomerPersonalByCustomerSeq crashed',
                        err,
                    );
                });
        } catch (err) {
            log_exception(
                'getCustomerPersonalByCustomerSeq crashed',
                err,
            );

            return null;
        }
    } else {
        log_warn(
            'getCustomerPersonalByCustomerSeq : customer_id was not valid',
        );

        return null;
    }
};
