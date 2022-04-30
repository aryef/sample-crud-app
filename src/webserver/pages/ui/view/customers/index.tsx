import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../../../../layers/client/hooks/local_storage_hook';
import * as Requests from '../../../../layers/client/http/requests_client';
import * as Constants from '../../../../layers/common/environment/constants';
import { IHttpResponse } from '../../../../layers/common/infra/http/IHttpResponse';
import { ICustomer } from '../../../../layers/common/interface/data/ICustomer';
import {
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';

const Title = styled.h1`
    color: blue;
    font-size: 25px;
    align-items: center;
`;

export default function Customers() {
    const [customers_data, setCustomers_data] = useLocalStorage(
        Constants.CUSTOMERS_DATA_KEY,
        {},
    );

    const [page, setPage] = useState(1);

    const columns = useMemo(
        () => [
            {
                // first group - TV Show
                Header: 'customer identity',
                // First group columns
                columns: [
                    {
                        Header: 'id',
                        accessor: 'show.customer_id',
                    },
                    {
                        Header: 'email',
                        accessor: 'show.email',
                    },
                ],
            },
        ],
        [],
    );

    useEffect(() => {
        if (!isEmpty(customers_data)) {
            Requests.get(`customers?page=${page}`).then(
                (response: IHttpResponse) => {
                    if (response.error) {
                        log_error(
                            `api call  failed: error = ${response.error}`,
                        );
                    } else if (response.data) {
                        const customers: ICustomer[] = response.data;

                        setCustomers_data(customers);
                        setPage(1);

                        log_info(`get initial customer data`);
                    }
                },
            );
        }
    }, []);
    return (
        <>
            <Title>Customers</Title>
            <ul>
                {customers_data.map((item: ICustomer) => (
                    <li key={item.customer_id}>
                        <div>{item.customer_id}</div>
                        <div>{item.email}</div>
                        <div>
                            <Link href="/ui/view/customers/customer?">
                                <a>customers</a>
                            </Link>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    );
}
