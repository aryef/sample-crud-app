import { isArray } from 'lodash';
import { NextApiRequest, NextApiResponse } from 'next';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { isString } from '../../../../../layers/common/utils/string_helper';
import { blDeleteOrder } from '../../../../../layers/server/business_layer/bl_delete_order';

const deleteOrder: (seq: string) => Promise<boolean | null> = async (
    seq,
) => {
    return await blDeleteOrder(seq);
};

export async function order_delete(
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
