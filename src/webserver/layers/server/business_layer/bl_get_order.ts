import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { getOrdersByCustomerSeq } from '../data_layer/queries/order/get_orders_by_customer_seq';

export const blGetOrder: (
    seq: string,
) => Promise<IOrder | null> = async (seq: string) => {
    let orders: IOrder[] | null | void = null;

    try {
        orders = await getOrdersByCustomerSeq(seq);

        if (orders && orders.length > 0) {
            return orders[0];
        }
    } catch (error) {
        log_exception('getOrder', error);
        return null;
    }

    return null;
};
