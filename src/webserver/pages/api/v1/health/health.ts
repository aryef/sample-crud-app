import { HTTP_STATUS_CODES } from '../../../../layers/common/environment/constants';
import * as Server from '../../../../layers/common/infra/http/cors';
import type { NextApiRequest, NextApiResponse } from 'next';

const getHealth: () => Promise<Data> = async () => {
    return { ok: true };
};

type Data = { ok: boolean };

export default async function health(
    _req: NextApiRequest,
    res: NextApiResponse<Data>,
) {
    await Server.cors(_req, res);

    let result: Data = { ok: false };

    await getHealth().then((reslt) => {
        result = reslt;
    });

    res.status(HTTP_STATUS_CODES.SUCCESS.OK).json(result);
}
