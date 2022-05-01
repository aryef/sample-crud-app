import { IWithPagination } from 'knex-paginate';
import dynamic from 'next/dynamic';
import { withRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import ReactPaginate from 'react-paginate';

import { useLocalStorage } from '../../../../layers/client/hooks/local_storage_hook';
import * as Requests from '../../../../layers/client/http/requests_client';
import ErrorBoundary from '../../../../layers/client/ui/components/common/ErrorBoundary';
import Table from '../../../../layers/client/ui/components/common/Table';

import tableStyles from '../../../../layers/client/ui/styles/sass/Home.module.css';
import paginatorStyles from '../../../../layers/client/ui/styles/sass/paginator.module.scss';
import * as Constants from '../../../../layers/common/environment/constants';
import { IHttpResponse } from '../../../../layers/common/infra/http/IHttpResponse';
import { ICustomer } from '../../../../layers/common/interface/data/ICustomer';
import {
    log_error,
    log_info,
} from '../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../layers/common/utils';

const Customers = (props) => {
    const [customers_data, setCustomers_data] = useLocalStorage(
        Constants.CUSTOMERS_DATA_KEY,
        {},
    );
    const [currentPage, setCurrentCurrentPage] = useState(1);

    const paginationHandler = () => {
        setCurrentCurrentPage((page) => page + 1);

        log_info(`current page= ${currentPage}`);
        const currentPath = props.router.pathname;
        const currentQuery = props.router.query;
        currentQuery.page = currentPage + 1;

        props.router.push({
            pathname: currentPath,
            query: currentQuery,
        });
    };

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
            Requests.get(`customers?page=${currentPage}`).then(
                (response: IHttpResponse) => {
                    if (response.error) {
                        log_error(
                            `api call  failed: error = ${response.error}`,
                        );
                    } else if (response.data) {
                        const customers: IWithPagination<
                            ICustomer,
                            { perPage: 10; currentPage: number }
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
            <div className={tableStyles.description}>
                <ErrorBoundary>
                    <Table columns={columns} data={customers_data} />
                </ErrorBoundary>
            </div>
        </>
    );

    return (
        <>
            <div>{content}</div>
            <ReactPaginate
                className={paginatorStyles.pagination}
                previousLabel={'previous'}
                nextLabel={'next'}
                breakLabel={'...'}
                breakClassName={paginatorStyles.pagination}
                activeClassName={paginatorStyles.active}
                containerClassName={paginatorStyles.pagination}
                //subContainerClassName={'pages pagination'}
                initialPage={props.currentPage - 1}
                pageCount={props.pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={paginationHandler}
                onClick={paginationHandler}
            />
        </>
    );
};

export default dynamic(() => Promise.resolve(withRouter(Customers)), {
    ssr: false,
});
//export default withRouter(Customers);
