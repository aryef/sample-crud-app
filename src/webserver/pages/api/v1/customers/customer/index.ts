import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_STATUS_CODES } from '../../../../../layers/common/environment/constants';
import * as Server from '../../../../../layers/common/infra/http/cors';
import { ICustomer } from '../../../../../layers/common/interface/data/ICustomer';
import {
    log_error,
    log_info,
} from '../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../layers/common/utils';
import { isString } from '../../../../../layers/common/utils/string_helper';
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

        const email: string | string[] = req.query['email'];

        if (!isEmpty(email) && !isArray(email) && isString(email)) {
            await getCustomer(email as string)
                .then((customer) => {
                    if (customer && customer !== null) {
                        result = customer;

                        log_info(`data returned`, customer);
                        return res
                            .status(HTTP_STATUS_CODES.SUCCESS.OK)
                            .json(result);
                    } else {
                        log_info(`no data returned`);
                        return res
                            .status(
                                HTTP_STATUS_CODES.SUCCESS.NO_CONTENT,
                            )
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
                            error: `customer api thrown error  ${err}`,
                        });
                });
        } else {
            return res
                .status(
                    HTTP_STATUS_CODES.CLIENT_ERROR.EXPECTATION_FAILED,
                )
                .send({ error: `email input invalid` });
        }
    } else {
        return res
            .status(HTTP_STATUS_CODES.SERVER_ERROR.NOT_IMPLEMENTED)
            .send({ error: `${req.method} "  not implemented"` });
    }
}
