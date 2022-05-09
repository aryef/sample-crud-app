import type { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_STATUS_CODES } from '../../../../../layers/common/environment/constants';
import * as Server from '../../../../../layers/common/infra/http/cors';
import { IOrder } from '../../../../../layers/common/interface/data/IOrder';
import { order_add } from './order_add';
import { order_delete } from './order_delete';
import { order_get } from './order_get';
import { order_modify } from './order_modify';

export default async function api_order(
    req: NextApiRequest,
    res: NextApiResponse<IOrder | { error: string }>,
) {
    await Server.cors(req, res);

    if (req.method === 'GET') {
        return await order_get(req, res);
    } else if (req.method === 'DELETE') {
        return await order_delete(req, res);
    } else if (req.method === 'POST') {
        return await order_add(req, res);
    } else if (req.method === 'PUT') {
        return await order_modify(req, res);
    } else {
        return res
            .status(HTTP_STATUS_CODES.SERVER_ERROR.NOT_IMPLEMENTED)
            .send({ error: `${req.method} "  not implemented"` });
    }
}
