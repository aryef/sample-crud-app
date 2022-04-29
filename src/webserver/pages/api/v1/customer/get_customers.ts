import { IWithPagination } from 'knex-paginate';
import { isArray } from 'lodash';
import type { NextApiRequest, NextApiResponse } from 'next';
import * as Server from '../../../../layers/common/infra/http/cors';
import { ICustomer } from '../../../../layers/common/interface/data/ICustomer';
import {
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';
import { isString } from '../../../../layers/common/utils/string_helper';

import { blGetCustomers } from '../../../../layers/server/business_layer/bl_get_customers';

const getCustomers: (
    page: number,
) => Promise<IWithPagination<
    ICustomer,
    { perPage: 10; currentPage: number }
> | null> = async (page: number) => {
    return await blGetCustomers(page);
};

export default async function get_customers(
    req: NextApiRequest,
    res: NextApiResponse<ICustomer[] | { error: string }>,
) {
    if (req.method === 'GET') {
        await Server.cors(req, res);

        const page: string | string[] = req.query['page'];

        let result: ICustomer[];

        if (!isEmpty(page) && !isArray(page) && isString(page)) {
            const pag: number = parseInt(page as string);

            await getCustomers(pag)
                .then((customers) => {
                    if (customers && customers !== null) {
                        log_info(`data returned`, customers);
                        return res.status(200).json(customers.data);
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
            return res.status(501).send({ error: `page invalid` });
        }
    } else {
        return res
            .status(405)
            .send({ error: `"Method not implemented"` });
    }
}
