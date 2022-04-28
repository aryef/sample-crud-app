import { ICustomer } from '../../common/interface/data/ICustomer';
import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { getCustomerByEmail } from '../data_layer/queries/customer/get_customer_by_email';
import { getOrdersByCustomerSeq } from '../data_layer/queries/order/get_orders_by_customer_seq';

export const getCustomerByEmailWithOrders: (
    email: string,
) => Promise<ICustomer | null> = async (email: string) => {
    let customers: ICustomer[] | null | void = null;

    let orders: IOrder[] | null | void = null;

    try {
        customers = await getCustomerByEmail(email);

        if (customers && customers.length > 0) {
            const customer: ICustomer = customers[0];

            orders = await getOrdersByCustomerSeq(customer.seq);

            if (orders && orders.length > 0) {
                customer.orders = orders;
            }

            return customer;
        }
    } catch (error) {
        log_exception('getCustomerByEmailWithOrders', error);
        return null;
    }

    return null;
};
