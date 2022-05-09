import { isArray } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_STATUS_CODES } from '../../../../../layers/common/environment/constants';
import { IOrder } from '../../../../../layers/common/interface/data/IOrder';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { isString } from '../../../../../layers/common/utils/string_helper';
import { blGetOrder } from '../../../../../layers/server/business_layer/bl_get_order';

const getOrder: (seq: string) => Promise<IOrder | null> = async (
    seq,
) => {
    return await blGetOrder(seq);
};

export async function order_get(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    let result: IOrder;

    //const email = getKeyValue(_req.query, 'email');
    const order_seq: string | string[] = req.query['seq'];

    if (
        !isEmpty(order_seq) &&
        !isArray(order_seq) &&
        isString(order_seq)
    ) {
        await getOrder(order_seq as string)
            .then((order) => {
                if (order && order !== null) {
                    result = order;

                    log_info(`data returned`, order);
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
            .send({ error: `order_seq input invalid` });
    }
}
