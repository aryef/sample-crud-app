import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as Server from '../../../../layers/common/infra/http/cors';
import { IOrder } from '../../../../layers/common/interface/data/IOrder';
import {
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';
import { isString } from '../../../../layers/common/utils/string_helper';
import { blGetOrder } from '../../../../layers/server/business_layer/bl_get_order';

const getOrder: (seq: string) => Promise<IOrder | null> = async (
    seq,
) => {
    return await blGetOrder(seq);
};

export default async function get_order(
    req: NextApiRequest,
    res: NextApiResponse<IOrder | { error: string }>,
) {
    if (req.method === 'GET') {
        await Server.cors(req, res);

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
                        .send({ error: `no user found ${err}` });
                });
        } else {
            return res.status(501).send({ error: `input invalid` });
        }
    } else {
        return res
            .status(405)
            .send({ error: `"Method not implemented"` });
    }
}
