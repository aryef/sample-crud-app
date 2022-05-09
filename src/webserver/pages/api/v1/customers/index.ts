import { IWithPagination } from 'knex-paginate';
import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import { HTTP_STATUS_CODES } from '../../../../layers/common/environment/constants';
import * as Server from '../../../../layers/common/infra/http/cors';
import { ICustomer } from '../../../../layers/common/interface/data/ICustomer';
import {
    IPagination,
    IPaginationChunk,
} from '../../../../layers/common/interface/IPagination';
import {
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';
import { isString } from '../../../../layers/common/utils/string_helper';

import { blGetCustomers } from '../../../../layers/server/business_layer/bl_get_customers';

const getCustomers: (
    page: number,
    chunk: IPaginationChunk,
) => Promise<IWithPagination<ICustomer, IPagination> | null> = async (
    page: number,
    chunk: IPaginationChunk,
) => {
    return await blGetCustomers(page, chunk);
};

export default async function get_customers(
    req: NextApiRequest,
    res: NextApiResponse<
        IWithPagination<ICustomer, IPagination> | { error: string }
    >,
) {
    if (req.method === 'GET') {
        await Server.cors(req, res);

        const page: string | string[] = req.query['page'];
        const chunk: string | string[] = req.query['chunk'];

        let result: IWithPagination<ICustomer, IPagination>;

        if (!isEmpty(page) && !isArray(page) && isString(page)) {
            const pag: number = parseInt(page as string);
            const chnk: IPaginationChunk = parseInt(
                chunk as string,
            ) as IPaginationChunk;

            await getCustomers(pag, chnk)
                .then((customers) => {
                    if (customers && customers !== null) {
                        log_info(`data returned`, customers);
                        return res
                            .status(HTTP_STATUS_CODES.SUCCESS.OK)
                            .json(customers);
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
                            error: `customers service crashed with error ${err}`,
                        });
                });
        } else {
            return res
                .status(
                    HTTP_STATUS_CODES.CLIENT_ERROR.EXPECTATION_FAILED,
                )
                .send({ error: `page supplied was invalid` });
        }
    } else {
        return res
            .status(HTTP_STATUS_CODES.SERVER_ERROR.NOT_IMPLEMENTED)
            .send({ error: `${req.method} "  not implemented"` });
    }
}
