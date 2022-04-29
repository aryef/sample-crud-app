import { IWithPagination } from 'knex-paginate';
import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import { log_exception } from '../../../../common/logger/logger';

import PG_DATA from '../../data_init/pg_data';
//TODO full pagination implementation

export const getCustomers: (
    page: number,
) => Promise<IWithPagination<
    ICustomer,
    { perPage: 10; currentPage: number }
> | null> = async (page: number) => {
    try {
        let ret: IWithPagination<
            ICustomer,
            { perPage: 10; currentPage: number }
        > | null = null;

        await PG_DATA<ICustomer>('customer')
            .withSchema(CUSTOMER_DATA_SCHEMA)
            .select()
            .paginate({ perPage: 10, currentPage: page })
            .then((results) => {
                ret = results;
            })
            .catch((err) => {
                log_exception('getCustomers crashed', err);
            });
        return ret;
    } catch (err) {
        log_exception('getCustomers crashed', err);

        return null;
    }
};
