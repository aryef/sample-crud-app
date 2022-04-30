import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { getOrderBySeq } from '../data_layer/queries/order/get_order_by_seq';

export const blGetOrder: (
    seq: string,
) => Promise<IOrder | null> = async (seq: string) => {
    let orders: IOrder[] | null | void = null;

    try {
        orders = await getOrderBySeq(seq);

        if (orders && orders.length > 0) {
            return orders[0];
        }
    } catch (error) {
        log_exception('getOrder', error);
        return null;
    }

    return null;
};
