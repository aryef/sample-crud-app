import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { updateOrder } from '../data_layer/queries/order/update_order';

export const blUpdateOrder: (
    order: IOrder,
) => Promise<IOrder | null> = async (order: IOrder) => {
    let orders: IOrder[] | null | void = null;

    try {
        orders = await updateOrder(order);

        if (orders && orders.length > 0) {
            return orders[0];
        }
    } catch (error) {
        log_exception('addOrder', error);
        return null;
    }

    return null;
};
