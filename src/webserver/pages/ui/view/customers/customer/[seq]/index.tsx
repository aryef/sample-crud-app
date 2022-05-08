import dynamic from 'next/dynamic';
import { useRouter, withRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { cblGetCustomerFullData } from '../../../../../../layers/client/business_layer/customer/cbl_get_customers_full_data';
import { useLocalStorage } from '../../../../../../layers/client/hooks/local_storage_hook';

import * as Constants from '../../../../../../layers/common/environment/constants';
import { IHttpResponse } from '../../../../../../layers/common/infra/http/IHttpResponse';
import { ICustomer } from '../../../../../../layers/common/interface/data/ICustomer';

import {
    log_debug,
    log_error,
} from '../../../../../../layers/common/logger/logger';
import { isEmpty } from '../../../../../../layers/common/utils';
import lodash from 'lodash';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Orders from './orders';

const Title = styled.h1`
    color: blueviolet;
    font-size: 25px;
`;

const Customer = () => {
    const router = useRouter();
    const { seq } = router.query;

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

    return (
        <>
            <Title>{customer_full_data?.email}</Title>
            <Tabs
                defaultActiveKey="orders"
                id="customer_tab"
                className="mb-3"
            >
                <Tab eventKey="orders" title="Orders">
                    <Orders></Orders>
                </Tab>
                <Tab eventKey="profile" title="Profile"></Tab>
                <Tab eventKey="contact" title="Contact"></Tab>
            </Tabs>
        </>
    );
};

export default dynamic(() => Promise.resolve(withRouter(Customer)), {
    ssr: false,
});
