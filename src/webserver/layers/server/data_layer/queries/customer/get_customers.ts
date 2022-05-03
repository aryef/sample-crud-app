import { IWithPagination } from 'knex-paginate';
import { CUSTOMER_DATA_SCHEMA } from '../../../../common/environment/constants';
import { ICustomer } from '../../../../common/interface/data/ICustomer';
import {
    IPagination,
    IPaginationChunk,
} from '../../../../common/interface/IPagination';
import { log_exception } from '../../../../common/logger/logger';

import PG_DATA from '../../data_init/pg_data';
//TODO full pagination implementation

export const getCustomers: (
    page: number,
    chunk: IPaginationChunk,
) => Promise<IWithPagination<ICustomer, IPagination> | null> = async (
    page: number,
    chunk: number,
) => {
    try {
        let ret: IWithPagination<ICustomer, IPagination> | null =
            null;

        await PG_DATA<ICustomer>('customer')
            .withSchema(CUSTOMER_DATA_SCHEMA)
            .select()
            .paginate({ perPage: chunk, currentPage: page })
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
