import { IWithPagination } from 'knex-paginate';
import { ICustomer } from '../../common/interface/data/ICustomer';
import { log_exception } from '../../common/logger/logger';

import { getCustomers } from '../data_layer/queries/customer/get_customers';

export const blGetCustomers: (
    page: number,
) => Promise<IWithPagination<
    ICustomer,
    { perPage: 10; currentPage: number }
> | null> = async (page: number) => {
    let customers: IWithPagination<
        ICustomer,
        { perPage: 10; currentPage: number }
    > | null = null;

    try {
        customers = await getCustomers(page);

        return customers;
    } catch (error) {
        log_exception('blGetCustomers', error);
        return null;
    }

    return null;
};
