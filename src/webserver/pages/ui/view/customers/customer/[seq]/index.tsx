import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocalStorage } from '../../../../../../layers/client/hooks/local_storage_hook';
import * as Constants from '../../../../../../layers/common/environment/constants';
import { ICustomer } from '../../../../../../layers/common/interface/data/ICustomer';
import { isEmpty } from '../../../../../../layers/common/utils';
import lodash from 'lodash';

const Title = styled.h1`
    color: blueviolet;
    font-size: 50px;
`;

export default function Index() {
    const router = useRouter();
    const { seq } = router.query;

    const [customers_data] = useLocalStorage(
        Constants.CUSTOMERS_DATA_KEY,
        {},
    );

    const [customer, setCustomer] = useState<ICustomer | null>(null);

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

    return <Title>{JSON.stringify(customer)}</Title>;
}
