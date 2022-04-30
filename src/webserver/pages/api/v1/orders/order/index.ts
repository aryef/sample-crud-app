import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as Server from '../../../../../layers/common/infra/http/cors';
import { IOrder } from '../../../../../layers/common/interface/data/IOrder';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { isString } from '../../../../../layers/common/utils/string_helper';
import { blAddOrder } from '../../../../../layers/server/business_layer/bl_add_order';
import { blDeleteOrder } from '../../../../../layers/server/business_layer/bl_delete_order';
import { blGetOrder } from '../../../../../layers/server/business_layer/bl_get_order';
import { blUpdateOrder } from '../../../../../layers/server/business_layer/bl_update_order';

const getOrder: (seq: string) => Promise<IOrder | null> = async (
    seq,
) => {
    return await blGetOrder(seq);
};

const deleteOrder: (seq: string) => Promise<boolean | null> = async (
    seq,
) => {
    return await blDeleteOrder(seq);
};

const addOrder: (order: IOrder) => Promise<IOrder | null> = async (
    order: IOrder,
) => {
    return await blAddOrder(order);
};

const modifyOrder: (order: IOrder) => Promise<IOrder | null> = async (
    order,
) => {
    return await blUpdateOrder(order);
};

async function order_get(
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

async function order_delete(
    req: NextApiRequest,
    res: NextApiResponse,
): Promise<void> {
    let result: boolean;

    const order_seq: string | string[] = req.query['seq'];

    if (
        !isEmpty(order_seq) &&
        !isArray(order_seq) &&
        isString(order_seq)
    ) {
        await deleteOrder(order_seq as string)
            .then((order_deletion_confirmation) => {
                if (
                    order_deletion_confirmation &&
                    order_deletion_confirmation !== null
                ) {
                    result = order_deletion_confirmation;

                    log_info(
                        `data returned`,
                        order_deletion_confirmation,
                    );
                    return res.status(200).json(result);
                } else {
                    log_info(`no deletion confirmation returned`);
                    return res.status(405).json(result);
                }
            })
            .catch((err) => {
                log_error(`data crashed`, err);
                return res
                    .status(501)
                    .send({ error: `no order deleted ${err}` });
            });
    } else {
        return res.status(501).send({ error: `input invalid` });
    }
}

async function order_add(
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

async function order_modify(
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
            .status(405)
            .send({ error: `"Method not implemented!"` });
    }
}
