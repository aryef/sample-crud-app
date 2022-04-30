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

export async function getCustomers(
    page: number,
): Promise<IHttpResponse> {
    let resp: IHttpResponse = {
        error: 'something went wrong',
        token: null,
        data: null,
        success: false,
    };

    if (!page || page < 0) {
        return {
            error: 'page',
            token: null,
            data: null,
            success: false,
        };
    }

    await Requests.get(`customers?page=${page}`).then(
        (response: IHttpResponse) => {
            if (response.success && isEmpty(response.error)) {
                if (!isEmpty(response.data)) {
                    try {
                        LocalStorage.setItem(
                            Constants.CUSTOMERS_DATA_KEY,
                            response.data || '',
                        );
                        log_info(
                            `customer list was set`,
                            response.token,
                        );
                    } catch (err: any) {
                        log_exception(
                            `customer lis was NOT set`,
                            err,
                        );
                    }

                    resp = {
                        token: response.token,
                        error: null,
                        data: null,
                        success: true,
                    };

                    return resp;
                } else {
                    log_info('customer list get failed');

                    resp = {
                        error: 'customer list get failed',
                        token: null,
                        data: null,
                        success: false,
                    };

                    return resp;
                }
            } else {
                log_error(
                    `customer list get failed ${response.error}`,
                );
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
