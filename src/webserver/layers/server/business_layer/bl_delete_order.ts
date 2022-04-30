import { log_exception } from '../../common/logger/logger';
import { deleteOrderBySeq } from '../data_layer/queries/order/delete_order_by_seq';

export const blDeleteOrder: (
    order_seq: string,
) => Promise<boolean | null> = async (order_seq: string) => {
    try {
        return await deleteOrderBySeq(order_seq);
    } catch (error) {
        log_exception('blDeleteOrder', error);
        return null;
    }

    return null;
};
