import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as Server from '../../../../layers/common/infra/http/cors';
import { ICustomer } from '../../../../layers/common/interface/data/ICustomer';
import {
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';
import { getCustomerByEmailWithOrders } from '../../../../layers/server/business_layer/get_customer_by_email_with_orders';

const getCustomer: (
    email: string,
) => Promise<ICustomer | null> = async (email) => {
    return await getCustomerByEmailWithOrders(email);
};

export default async function get_customer(
    _req: NextApiRequest,
    res: NextApiResponse<ICustomer | { error: string }>,
) {
    await Server.cors(_req, res);

    let result: ICustomer;

    //const email = getKeyValue(_req.query, 'email');
    const email: string | string[] = _req.query['email'];

    if (!isEmpty(email) && !isArray(email)) {
        await getCustomer(email)
            .then((reslt) => {
                if (reslt && reslt !== null) {
                    result = reslt;

                    log_info(`data retruned`, reslt);
                    return res.status(200).json(result);
                } else {
                    log_info(`no data returned`);
                    return res.status(402).json(result);
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
}
