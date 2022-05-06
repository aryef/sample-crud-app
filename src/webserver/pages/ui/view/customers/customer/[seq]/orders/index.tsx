import 'bootstrap/dist/css/bootstrap.min.css';

import dynamic from 'next/dynamic';
import Link from 'next/link';

import { useMemo } from 'react';

import BootstrapTable, {
    ColumnDescription,
    PaginationOptions,
} from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { IOrder } from '../../../../../../../layers/common/interface/data/IOrder';

import ErrorBoundary from '../../../../../../../layers/client/ui/components/common/ErrorBoundary';

import lodash from 'lodash';

const Orders = (props: {
    customer_seq: string;
    orders: IOrder[];
}) => {
    const { customer_seq, orders } = props;

    const columns: ColumnDescription<IOrder, IOrder>[] = useMemo(
        () => [
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
                    const link_as: string = `/ui/view/customers/customer/${customer_seq}/orders/orders/${cell}`;
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

    const options: PaginationOptions = { showTotal: true };

    const content = (
        <>
            <ErrorBoundary>
                <BootstrapTable
                    bordered
                    keyField="customer_id"
                    data={lodash.values(orders)}
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

export default dynamic(() => Promise.resolve(Orders), {
    ssr: false,
});
