import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { createOrder } from '../data_layer/queries/order/create_order';

export const blAddOrder: (
    order: IOrder,
) => Promise<IOrder | null> = async (order: IOrder) => {
    let orders: IOrder[] | null | void = null;

    try {
        orders = await createOrder(order);

        if (orders && orders.length > 0) {
            return orders[0];
        }
    } catch (error) {
        log_exception('addOrder', error);
        return null;
    }

    return null;
};
