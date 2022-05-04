import 'bootstrap/dist/css/bootstrap.min.css';
import { IWithPagination } from 'knex-paginate';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { withRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { cblGetCustomers } from '../../../../layers/client/business_layer/customer/cbl_get_customers';

import { useLocalStorage } from '../../../../layers/client/hooks/local_storage_hook';
import ErrorBoundary from '../../../../layers/client/ui/components/common/ErrorBoundary';
import * as Constants from '../../../../layers/common/environment/constants';
import { PAGINATION_CHUNK } from '../../../../layers/common/environment/constants';
import { IHttpResponse } from '../../../../layers/common/infra/http/IHttpResponse';
import { ICustomer } from '../../../../layers/common/interface/data/ICustomer';
import { IPagination } from '../../../../layers/common/interface/IPagination';
import {
    log_debug,
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';
import lodash from 'lodash';

const Customers = () => {
    const [customers_data, setCustomers_data] = useLocalStorage(
        Constants.CUSTOMERS_DATA_KEY,
        {},
    );
    const [currentPage, setCurrentCurrentPage] = useState(1);

    /* const paginationHandler = (pops) => {
        log_debug(pops);
        setCurrentCurrentPage((page) => page + 1);

        log_info(`current page= ${currentPage}`);
        const currentPath = props.router.pathname;
        const currentQuery = props.router.query;
        log_debug(`router.query=${currentQuery}`);

        props.router.push({
            pathname: currentPath,
            query: currentPage,
        });
    }; */

    const columns = useMemo(
        () => [
            {
                text: 'id',
                dataField: 'customer_id',
                width: '150',
            },
            {
                text: 'email',
                dataField: 'email',
                width: '150',
                sort: true,
            },

            {
                text: 'details',
                dataField: 'seq',
                formatter: (cell: string, _row: ICustomer) => {
                    log_debug('cell', cell);
                    log_debug('row', _row);
                    const link_href: string = `/ui/view/customers/customer/[seq]`;
                    const link_as: string = `/ui/view/customers/customer/${cell}`;

                    return (
                        <Link href={link_href} as={link_as}>
                            <a>{cell}</a>
                        </Link>
                    );
                },
            },
        ],
        [],
    );

    useEffect(() => {
        if (!isEmpty(customers_data)) {
            cblGetCustomers(currentPage, PAGINATION_CHUNK).then(
                (response: IHttpResponse) => {
                    if (response.error) {
                        log_error(
                            `api call  failed: error = ${response.error}`,
                        );
                    } else if (response.data) {
                        const customers: IWithPagination<
                            ICustomer,
                            IPagination
                        > = response.data;

                        setCustomers_data(customers.data);
                        setCurrentCurrentPage(
                            customers.pagination.currentPage,
                        );

                        log_info(
                            `get initial customer data, page# ${currentPage}`,
                        );
                    }
                },
            );
        }
    }, [currentPage]);

    const content = (
        <>
            <ErrorBoundary>
                <BootstrapTable
                    bordered
                    keyField="customer_id"
                    data={lodash.values(customers_data)}
                    columns={columns}
                    pagination={paginationFactory()}
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

export default dynamic(() => Promise.resolve(withRouter(Customers)), {
    ssr: false,
});
//export default withRouter(Customers);
