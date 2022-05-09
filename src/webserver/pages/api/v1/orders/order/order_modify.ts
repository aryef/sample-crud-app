import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_STATUS_CODES } from '../../../../../layers/common/environment/constants';
import { IOrder } from '../../../../../layers/common/interface/data/IOrder';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { blUpdateOrder } from '../../../../../layers/server/business_layer/bl_update_order';

const modifyOrder: (order: IOrder) => Promise<IOrder | null> = async (
    order,
) => {
    return await blUpdateOrder(order);
};

export async function order_modify(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    let result: IOrder;

    //const email = getKeyValue(_req.query, 'email');
    const order: IOrder = req.body['order'];

    if (!isEmpty(order)) {
        await modifyOrder(order)
            .then((order_modified) => {
                if (order_modified && order_modified !== null) {
                    result = order_modified;

                    log_info(`data returned`, order_modified);
                    return res
                        .status(HTTP_STATUS_CODES.SUCCESS.OK)
                        .json(result);
                } else {
                    log_info(`no data returned`);
                    return res
                        .status(HTTP_STATUS_CODES.SUCCESS.NO_CONTENT)
                        .json(result);
                }
            })
            .catch((err) => {
                log_error(`data crashed`, err);
                return res
                    .status(
                        HTTP_STATUS_CODES.SERVER_ERROR
                            .SERVICE_UNAVAILABLE,
                    )
                    .send({
                        error: `order service crashed with error ${err}`,
                    });
            });
    } else {
        return res
            .status(HTTP_STATUS_CODES.CLIENT_ERROR.EXPECTATION_FAILED)
            .send({ error: `order input invalid` });
    }
}
