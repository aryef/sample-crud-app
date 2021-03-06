import { addAuthorizationToHeaders } from '../../common/infra/http/addAuthorizationToHeaders';
import getCustomAxios, {
    API_BASE_URL,
} from '../../common/infra/http/customAxios';
import { IHttpResponse } from '../../common/infra/http/IHttpResponse';
import { REQUEST_HEADERS } from '../../common/infra/http/REQUEST_HEADERS';
import {
    log_debug,
    log_error,
    log_exception,
} from '../../common/logger/logger';
import { isEmpty } from '../../common/utils';

const baseUrl: string = `${
    process.env.NEXT_PUBLIC_NET_PROTOCOL?.toLowerCase() === 'https'
        ? process.env.NEXT_PUBLIC_WEBSITE_URL_SSL
        : process.env.NEXT_PUBLIC_WEBSITE_URL
}${API_BASE_URL}`;

export async function get(route: string): Promise<IHttpResponse> {
    let data: {} | null = null;
    let error: string | null = null;
    let token: string | null = addAuthorizationToHeaders();
    let success: boolean = false;

    const errDesc: string = 'GET crashed';

    log_debug(`route=${baseUrl}/${route}`);

    if (!isEmpty(route)) {
        try {
            const axiosClient = getCustomAxios();

            await axiosClient
                .get(`/${route}`, {
                    url: API_BASE_URL,
                    headers: {
                        authorization: token,
                        ...REQUEST_HEADERS,
                    },
                })
                .then((res) => {
                    data = res.data;

                    error = res.data.error;

                    if (isEmpty(error)) {
                        success = true;
                    }

                    log_debug(`get route ${baseUrl}/${route} `, data);
                })
                .catch((err: any) => {
                    error = `${errDesc} while fetching ${baseUrl}/${
                        route || 'unknown'
                    } `;

                    log_exception(error, err);
                });
            return {
                data: data,
                token: token,
                error: error,
                success: success,
            };
        } catch (err: any) {
            error = `${errDesc} axiosClient was not initialized.. ${baseUrl}/${route}`;

            log_exception(error, err);
        }
    } else {
        error = errDesc + ' route was empty';
    }

    return {
        data: data,
        token: token,
        error: error,
        success: success,
    };
}

export async function post(
    route: string,
    payload: any = {},
): Promise<IHttpResponse> {
    let data: {} | null = null;
    let error: string | null = null;
    let token: string | null = addAuthorizationToHeaders();
    let success: boolean = false;

    const errDesc: string = 'POST CRASH';

    if (!isEmpty(route)) {
        log_debug(`post route= ${baseUrl}/${route}`);

        //TODO remove token from payload
        payload.token = token;

        try {
            const axiosClient = getCustomAxios();

            axiosClient.defaults.baseURL = baseUrl;

            await axiosClient
                .post(`/${route}`, payload, {
                    url: API_BASE_URL,
                    headers: {
                        authorization: token,
                        ...REQUEST_HEADERS,
                    },
                })
                .then((res) => {
                    data = res.data;
                    token = res.data.token;

                    error = res.data.error;

                    if (isEmpty(error)) {
                        success = true;
                    }
                    log_debug(
                        ` pots route = ${baseUrl}/${route} `,
                        data,
                    );
                })
                .catch((err: any) => {
                    error = `${errDesc} while fetching ${baseUrl}/${
                        route || 'unknown'
                    } `;

                    log_error(error, err);
                });

            return {
                data: data,
                token: token,
                error: error,
                success: success,
            };
        } catch (err: any) {
            error = `${errDesc} axios client was not initialized.. ${baseUrl}/${route}`;

            log_exception(error, err);
        }
    } else {
        error = errDesc + ' route was empty';
    }

    return {
        data: data,
        token: token,
        error: error,
        success: success,
    };
}

export async function del(
    route: string,
    seq: string,
): Promise<IHttpResponse> {
    let data: {} | null = null;
    let error: string | null = null;
    let token: string | null = addAuthorizationToHeaders();
    let success: boolean = false;

    const errDesc: string = 'DELETE crashed';

    if (!isEmpty(route)) {
        try {
            const axiosClient = getCustomAxios();

            axiosClient.defaults.baseURL = baseUrl;

            await axiosClient
                .delete(`${API_BASE_URL}/${route}/seq=${seq}`, {
                    url: API_BASE_URL,
                    headers: {
                        authorization: token,
                        ...REQUEST_HEADERS,
                    },
                })
                .then((res) => {
                    data = res.data;
                    error = res.data.error;
                    token = res.data.token;

                    if (isEmpty(error)) {
                        success = true;
                    }
                    log_debug(
                        `delete route = ${baseUrl}/${route} `,
                        data,
                    );
                })
                .catch((err) => {
                    error = `${errDesc} while deleting ${baseUrl}/${
                        route || 'unknown'
                    } `;

                    log_exception(error, err);
                });

            return {
                data: data,
                token: token,
                error: error,
                success: success,
            };
        } catch (err: any) {
            error = `${errDesc} axios client was not initialized..${baseUrl}/${route} - ${err.response?.statusText}; `;

            log_exception(error, err);
        }
    } else {
        error = errDesc + ' route was empty';
    }

    return {
        data: data,
        token: token,
        error: error,
        success: success,
    };
}
