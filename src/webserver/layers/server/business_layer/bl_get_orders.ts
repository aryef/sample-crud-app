import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { getOrdersByCustomerSeq } from '../data_layer/queries/order/get_orders_by_customer_seq';

export const blGetOrders: (
    customer_seq: string,
) => Promise<IOrder[] | null | void> = async (
    customer_seq: string,
) => {
    let orders: IOrder[] | null | void = null;

    try {
        orders = await getOrdersByCustomerSeq(customer_seq);
        return orders;
    } catch (error) {
        log_exception('getCustomerByEmailWithOrders', error);
        return null;
    }
};
