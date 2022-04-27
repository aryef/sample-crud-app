import { ICustomer } from '../../common/interface/data/ICustomer';
import { log_exception } from '../../common/logger/logger';
import { getCustomerByEmail } from '../data_layer/queries/customer/get_customer_by_email';

export const getCustomerByEmailWithOrders: (
    email: string,
) => Promise<ICustomer | null> = async (email: string) => {
    let customer: ICustomer | null = null;

    try {
        customer = await getCustomerByEmail(email);
    } catch (error) {
        log_exception('sign-in crashed', error);
    }
    return customer;
};
