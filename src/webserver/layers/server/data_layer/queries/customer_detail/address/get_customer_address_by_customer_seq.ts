import { CUSTOMER_DATA_SCHEMA } from "../../../../../common/environment/constants";
import { ICustomerDetailAddress } from "../../../../../common/interface/data/ICustomerDetailAddress";
import { log_exception, log_warn } from "../../../../../common/logger/logger";
import { isEmpty } from "../../../../../common/utils";
import PG_DATA from "../../../data_init/pg_data";


export const getCustomerAddressByCustomerSeq: (
  customer_seq: string,
) => Promise<ICustomerDetailAddress[] | null | void> = async (customer_seq: string) => {
    if (customer_seq && !isEmpty(customer_seq)) {
        try {
            return PG_DATA<ICustomerDetailAddress>('customer_detail_address')
                .withSchema(CUSTOMER_DATA_SCHEMA)
                .where('customer_seq', customer_seq)
                .select()
                .catch((err) => {
                    log_exception('getCustomerAddressByCustomerSeq crashed', err);
                });
        } catch (err) {
            log_exception('getCustomerAddressByCustomerSeq crashed', err);

            return null;
        }
    } else {
        log_warn('getCustomerAddressByCustomerSeq : customer_id was not valid');

        return null;
    }
};
