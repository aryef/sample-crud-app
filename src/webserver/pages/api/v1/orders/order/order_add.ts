import { NextApiRequest, NextApiResponse } from 'next';
import { IOrder } from '../../../../../layers/common/interface/data/IOrder';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { blAddOrder } from '../../../../../layers/server/business_layer/bl_add_order';

const addOrder: (order: IOrder) => Promise<IOrder | null> = async (
    order: IOrder,
) => {
    return await blAddOrder(order);
};

export async function order_add(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    let result: IOrder;

    //const email = getKeyValue(_req.que
    // ry, 'email');
    const order: IOrder = req.body;

    if (!isEmpty(order)) {
        await addOrder(order)
            .then((order_added) => {
                if (order_added && order_added !== null) {
                    result = order_added;

                    log_info(`data returned`, order_added);
                    return res.status(200).json(result);
                } else {
                    log_info(`no data returned`);
                    return res.status(405).json(result);
                }
            })
            .catch((err) => {
                log_error(`data crashed`, err);
                return res
                    .status(501)
                    .send({ error: `no order found ${err}` });
            });
    } else {
        return res.status(501).send({ error: `input invalid` });
    }
}
