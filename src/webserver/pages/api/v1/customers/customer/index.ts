import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as Server from '../../../../../layers/common/infra/http/cors';
import { ICustomer } from '../../../../../layers/common/interface/data/ICustomer';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { blGetCustomerByEmailWithOrders } from '../../../../../layers/server/business_layer/bl_get_customer_by_email_with_orders';

const getCustomer: (
    email: string,
) => Promise<ICustomer | null> = async (email) => {
    return await blGetCustomerByEmailWithOrders(email);
};

export default async function get_customer(
    req: NextApiRequest,
    res: NextApiResponse<ICustomer | { error: string }>,
) {
    if (req.method === 'GET') {
        await Server.cors(req, res);

        let result: ICustomer;

        //const email = getKeyValue(_req.query, 'email');
        const email: string | string[] = req.query['email'];

        if (!isEmpty(email) && !isArray(email)) {
            await getCustomer(email as string)
                .then((customer) => {
                    if (customer && customer !== null) {
                        result = customer;

                        log_info(`data returned`, customer);
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
                        .send({ error: `no customer found ${err}` });
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
