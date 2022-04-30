import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../../../../layers/client/hooks/local_storage_hook';
import * as Requests from '../../../../layers/client/http/requests_client';
import Table from '../../../../layers/client/ui/components/common/Table';

import styles from '../../../../layers/client/ui/styles/sass/Home.module.css';
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
                        accessor: 'customer_id',
                    },
                    {
                        Header: 'email',
                        accessor: 'email',
                    },
                ],
            },
            {
                // first group - TV Show
                Header: 'customer details',
                // First group columns
                columns: [
                    {
                        Header: '...',
                        accessor: 'seq',
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
            <div className={styles.description}>
                <Title>Customers Data</Title>
                <Table columns={columns} data={customers_data} />
            </div>
        </>
    );
}
