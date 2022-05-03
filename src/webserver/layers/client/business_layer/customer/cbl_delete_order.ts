// @ts-ignore
import React from 'react';
import { IHttpResponse } from '../../../common/infra/http/IHttpResponse';

import { log_error, log_info } from '../../../common/logger/logger';
import { isEmpty } from '../../../common/utils/string_helper';
import * as Requests from '../../http/requests_client';

export const cblDeleteOrder: (
    seq: string,
) => Promise<IHttpResponse> = async (seq: string) => {
    let resp: IHttpResponse = {
        error: 'something went wrong',
        token: null,
        data: null,
        success: false,
    };

    await Requests.del(`orders/order`, seq).then(
        (response: IHttpResponse) => {
            if (response.success && isEmpty(response.error)) {
                log_info(`user deleted successfully`, response.token);

                resp = {
                    token: null,
                    error: null,
                    data: null,
                    success: true,
                };

                return resp;
            } else {
                log_error(`user deleting failed - ${response.error}`);

                resp = {
                    token: null,
                    error: ` delete user failed - ${response.error}`,
                    data: null,
                    success: false,
                };

                return resp;
            }
        },
    );

    return resp;
};
