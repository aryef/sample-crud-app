import { IWithPagination } from 'knex-paginate';
import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
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
                        return res.status(200).json(customers);
                    } else {
                        log_info(`no data returned`);
                        return res.status(405).json(result);
                    }
                })
                .catch((err) => {
                    log_error(`data crashed`, err);
                    return res
                        .status(501)
                        .send({ error: `no customers found ${err}` });
                });
        } else {
            return res.status(501).send({ error: `page invalid` });
        }
    } else {
        return res
            .status(405)
            .send({ error: `"Method not implemented"` });
    }
}
