import { ICustomer } from '../../common/interface/data/ICustomer';
import { ICustomerDetailAddress } from '../../common/interface/data/ICustomerDetailAddress';
import { ICustomerDetailPersonal } from '../../common/interface/data/ICustomerDetailPersonal';
import { IOrder } from '../../common/interface/data/IOrder';
import { log_exception } from '../../common/logger/logger';
import { getCustomerByEmail } from '../data_layer/queries/customer/get_customer_by_email';
import { getCustomerAddressByCustomerSeq } from '../data_layer/queries/customer_detail/address/get_customer_address_by_customer_seq';
import { getCustomerPersonalByCustomerSeq } from '../data_layer/queries/customer_detail/personal/get_customer_personal_by_customer_seq';
import { getOrdersByCustomerSeq } from '../data_layer/queries/order/get_orders_by_customer_seq';

export const getCustomerByEmailWithOrders: (
    email: string,
) => Promise<ICustomer | null> = async (email: string) => {
    let customers: ICustomer[] | null | void = null;
    let orders: IOrder[] | null | void = null;
    let address: ICustomerDetailAddress[] | null | void = null;
    let personal: ICustomerDetailPersonal[] | null | void = null;

    try {
        customers = await getCustomerByEmail(email);

        if (customers && customers.length > 0) {
            const customer: ICustomer = customers[0];

            orders = await getOrdersByCustomerSeq(customer.seq);

            if (orders && orders.length > 0) {
                customer.orders = orders;
            }

            address = await getCustomerAddressByCustomerSeq(
                customer.seq,
            );

            if (address && address.length > 0) {
                customer.customer_detail = {};
                customer.customer_detail.address = address;
            }

            personal = await getCustomerPersonalByCustomerSeq(
                customer.seq,
            );

            if (personal && personal.length > 0) {
                if (!customer.customer_detail) {
                    customer.customer_detail = {};
                }
                customer.customer_detail.personal = personal[0];
            }

            return customer;
        }
    } catch (error) {
        log_exception('getCustomerByEmailWithOrders', error);
        return null;
    }

    return null;
};
