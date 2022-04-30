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

import { blGetOrders } from '../../../../layers/server/business_layer/bl_get_orders';

const getOrdersByCustomer: (
    customer_seq: string,
) => Promise<IOrder[] | null | void> = async (customer_seq) => {
    return await blGetOrders(customer_seq);
};

export default async function get_orders(
    req: NextApiRequest,
    res: NextApiResponse<IOrder[] | { error: string }>,
) {
    if (req.method === 'GET') {
        await Server.cors(req, res);

        let result: IOrder[];

        const customer_seq: string | string[] =
            req.query['customer_seq'];

        if (
            !isEmpty(customer_seq) &&
            !isArray(customer_seq) &&
            isString(customer_seq)
        ) {
            await getOrdersByCustomer(customer_seq as string)
                .then((orders) => {
                    if (orders && orders !== null) {
                        result = orders;

                        log_info(`data returned`, orders);
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
                        .send({ error: `no orders found ${err}` });
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
