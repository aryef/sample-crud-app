import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { deleteOrderBySeq } from '../data_layer/queries/order/delete_order_by_seq';

export const blDeleteOrder: (
    order: IOrder,
) => Promise<boolean | null> = async (order: IOrder) => {
    try {
        return await deleteOrderBySeq(order.seq || '');
    } catch (error) {
        log_exception('blDeleteOrder', error);
        return null;
    }

    return null;
};
