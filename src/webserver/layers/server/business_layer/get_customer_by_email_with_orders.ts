import { ICustomer } from '../../common/interface/data/ICustomer';
import { log_exception } from '../../common/logger/logger';
import { getCustomerByEmail } from '../data_layer/queries/customer/get_customer_by_email';

export const getCustomerByEmailWithOrders: (
    email: string,
) => Promise<ICustomer | null> = async (email: string) => {
    let customer: ICustomer[] | null | void = null;

    try {
        customer = await getCustomerByEmail(email);
        if (customer && customer.length > 0) return customer[0];
    } catch (error) {
        log_exception('getCustomerByEmailWithOrders', error);
        return null;
    }

    return null;
};
