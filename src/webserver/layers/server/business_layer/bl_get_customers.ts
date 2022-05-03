import { IWithPagination } from 'knex-paginate';
import { ICustomer } from '../../common/interface/data/ICustomer';
import {
    IPagination,
    IPaginationChunk,
} from '../../common/interface/IPagination';
import { log_exception } from '../../common/logger/logger';

import { getCustomers } from '../data_layer/queries/customer/get_customers';

export const blGetCustomers: (
    page: number,
    chunk: IPaginationChunk,
) => Promise<IWithPagination<ICustomer, IPagination> | null> = async (
    page: number,
    chunk: IPaginationChunk,
) => {
    let customers: IWithPagination<ICustomer, IPagination> | null =
        null;

    try {
        customers = await getCustomers(page, chunk);

        return customers;
    } catch (error) {
        log_exception('blGetCustomers', error);
        return null;
    }

    return null;
};
