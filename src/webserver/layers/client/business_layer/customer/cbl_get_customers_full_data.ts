import * as Constants from '../../../common/environment/constants';
import { IHttpResponse } from '../../../common/infra/http/IHttpResponse';

import {
    log_error,
    log_exception,
    log_info,
} from '../../../common/logger/logger';
import { isEmpty } from '../../../common/utils';
import * as LocalStorage from '../../hooks/local_storage_hook';
import * as Requests from '../../http/requests_client';

export async function cblGetCustomerFullData(
    email: string,
): Promise<IHttpResponse> {
    let resp: IHttpResponse = {
        error: 'something went wrong',
        token: null,
        data: null,
        success: false,
    };

    if (!email || isEmpty(email)) {
        return {
            error: 'customer cannot be found by empty email',
            token: null,
            data: null,
            success: false,
        };
    }

    await Requests.get(`customers/customer?email=${email}`).then(
        (response: IHttpResponse) => {
            if (response.success && isEmpty(response.error)) {
                if (!isEmpty(response.data)) {
                    try {
                        LocalStorage.setItem(
                            Constants.CUSTOMER_DATA_KEY,
                            response.data || '',
                        );
                        log_info(`customer was set`, response.token);
                    } catch (err: any) {
                        log_exception(`customer was NOT set`, err);
                    }

                    resp = {
                        token: response.token,
                        error: null,
                        data: response.data,
                        success: true,
                    };

                    return resp;
                } else {
                    log_info('customer get failed');

                    resp = {
                        error: 'customer get failed',
                        token: null,
                        data: null,
                        success: false,
                    };

                    return resp;
                }
            } else {
                log_error(`customer get failed ${response.error}`);
                return <IHttpResponse>{
                    error: response.error,
                    token: null,
                    data: null,
                    success: false,
                };
            }
        },
    );

    return resp;
}
