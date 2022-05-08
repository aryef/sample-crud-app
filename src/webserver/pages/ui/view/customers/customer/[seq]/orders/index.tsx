import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter, withRouter } from 'next/router';

import { useEffect, useState } from 'react';

import BootstrapTable, {
    PaginationOptions,
} from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import styled from 'styled-components';
import { cblGetCustomerFullData } from '../../../../../../../layers/client/business_layer/customer/cbl_get_customers_full_data';

import { useLocalStorage } from '../../../../../../../layers/client/hooks/local_storage_hook';
import * as Constants from '../../../../../../../layers/common/environment/constants';
import { IHttpResponse } from '../../../../../../../layers/common/infra/http/IHttpResponse';
import { ICustomer } from '../../../../../../../layers/common/interface/data/ICustomer';

import { IOrder } from '../../../../../../../layers/common/interface/data/IOrder';

import ErrorBoundary from '../../../../../../../layers/client/ui/components/common/ErrorBoundary';

import lodash from 'lodash';
import {
    log_debug,
    log_error,
} from '../../../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../../../layers/common/utils';

const Title = styled.h1`
    color: blueviolet;
    font-size: 25px;
`;

const Orders = () => {
    const router = useRouter();
    const { seq } = router.query;

    log_debug(`seq`, seq);

    const [customers_data] = useLocalStorage(
        Constants.CUSTOMERS_DATA_KEY,
        {},
    );

    const [customer, setCustomer] = useState<ICustomer | null>(null);
    const [customer_full_data, setCustomerFullData] =
        useState<ICustomer | null>(null);

    useEffect(() => {
        if (!isEmpty(customers_data)) {
            const cstmr: ICustomer = lodash.find<ICustomer>(
                customers_data,
                function (obj: ICustomer) {
                    if (obj.seq === seq) {
                        return true;
                    } else {
                        return false;
                    }
                },
            );
            setCustomer(cstmr);
        }
    }, [customers_data]);

    useEffect(() => {
        if (!isEmpty(customer)) {
            cblGetCustomerFullData(customer?.email || '').then(
                (response: IHttpResponse) => {
                    if (response.error) {
                        log_error(
                            `api call  failed: error = ${response.error}`,
                        );
                    } else if (response.data) {
                        const cust: ICustomer = response.data;

                        setCustomerFullData(cust);

                        log_debug(
                            `get initial customer data, email# ${customer?.email}`,
                            cust,
                        );
                    }
                },
            );
        }
    }, [customer]);

    const [columns, setColumns] = useState<any>([
        {
            text: 'transaction_amount',
            dataField: 'transaction_amount',
            width: 150,
            sort: false,
            formatter: undefined,
        },
        {
            text: 'transaction_ccy',
            dataField: 'transaction_ccy',
            width: 150,
            sort: true,
            formatter: undefined,
        },
        {
            text: 'credit_card_type',
            dataField: 'credit_card_type',
            width: 150,
            sort: true,
            formatter: undefined,
        },
        {
            text: 'created_at',
            dataField: 'created_at',
            width: 150,
            sort: true,
            formatter: undefined,
        },

        {
            text: 'details',
            dataField: 'seq',
            width: 150,
            sort: false,
            formatter: (cell: string, _row: IOrder) => {
                const link_href: string = `/ui/view/customers/customer/[seq]/orders/order/[id]`;
                const link_as: string = `/ui/view/customers/customer/${seq}/orders/order/${cell}`;

                log_debug(`link_as000=${link_as}`);

                return (
                    <Link href={link_href} as={link_as}>
                        <a>{cell}</a>
                    </Link>
                );
            },
        },
    ]);

    useEffect(() => {
        setColumns([
            {
                text: 'transaction_amount',
                dataField: 'transaction_amount',
                width: 150,
                sort: false,
                formatter: undefined,
            },
            {
                text: 'transaction_ccy',
                dataField: 'transaction_ccy',
                width: 150,
                sort: true,
                formatter: undefined,
            },
            {
                text: 'credit_card_type',
                dataField: 'credit_card_type',
                width: 150,
                sort: true,
                formatter: undefined,
            },
            {
                text: 'created_at',
                dataField: 'created_at',
                width: 150,
                sort: true,
                formatter: undefined,
            },

            {
                text: 'details',
                dataField: 'seq',
                width: 150,
                sort: false,
                formatter: (cell: string, _row: IOrder) => {
                    const link_href: string = `/ui/view/customers/customer/[seq]/orders/order/[id]`;
                    const link_as: string = `/ui/view/customers/customer/${seq}/orders/order/${cell}`;

                    log_debug(`link_as111=${link_as}`);

                    return (
                        <Link href={link_href} as={link_as}>
                            <a>{cell}</a>
                        </Link>
                    );
                },
            },
        ]);
    }, [customer]);

    const options: PaginationOptions = { showTotal: true };

    const content = (
        <>
            <ErrorBoundary>
                <Title>{seq}</Title>
                <BootstrapTable
                    bordered
                    keyField="seq"
                    data={lodash.values(customer_full_data?.orders)}
                    columns={columns}
                    pagination={paginationFactory(options)}
                />
            </ErrorBoundary>
        </>
    );

    return (
        <>
            <div>{content}</div>
        </>
    );
};

export default dynamic(() => Promise.resolve(withRouter(Orders)), {
    ssr: false,
});
