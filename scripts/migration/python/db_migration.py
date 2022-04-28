import datetime
import io
import sys
import json
import psycopg2
import uuid

import logging

POSTGRES_SERVER_NAME = 'localhost'
POSTGRES_DB_NAME = 'justt_web'
POSTGRES_PORT = 45432
POSTGRES_USER = 'justt_loader'
POSTGRES_PASSWORD = '123456789'
POSTGRES_CUSTOMER_DATA_SCHEMA = 'customer_data'
CHUNK_SIZE = 100

CUSTOMER_TABLE_NAME="customer"
CUSTOMER_DETAIL_ADDRESS_TABLE_NAME="customer_detail_address"
CUSTOMER_DETAIL_PERSONAL_TABLE_NAME="customer_detail_personal"
TRANSACTION_REGISTER_TABLE_NAME="transaction_register"


def main(data_file_path):
    if data_file_path is None:
        return

    postgres_obj = psycopg2.connect(
        host=POSTGRES_SERVER_NAME,
        dbname=POSTGRES_DB_NAME,
        port=POSTGRES_PORT,
        user=POSTGRES_USER,
        password=POSTGRES_PASSWORD,
        options=f'-c search_path={POSTGRES_CUSTOMER_DATA_SCHEMA}')

    with open(data_file_path, "r", encoding='utf-8') as data_json:

        data = json.load(data_json)

        customer_data = ''
        customer_detail_address_data = ''
        customer_detail_personal_data = ''
        transaction_register_data = ''

        count = 0
        timestamp=str(datetime.datetime.now().isoformat())
        db_cursor = postgres_obj.cursor()

        db_cursor.execute('TRUNCATE table ' + CUSTOMER_TABLE_NAME)
        db_cursor.execute('TRUNCATE table ' + CUSTOMER_DETAIL_ADDRESS_TABLE_NAME)
        db_cursor.execute('TRUNCATE table ' + CUSTOMER_DETAIL_PERSONAL_TABLE_NAME)
        db_cursor.execute('TRUNCATE table ' + TRANSACTION_REGISTER_TABLE_NAME)
        postgres_obj.commit()


        for line in data:
            new_customer_row = ''
            new_customer_detail_personal_row = ''
            new_customer_detail_address_row = ''
            new_transaction_register_row=''

            try:

                customer_id=str(uuid.uuid4())


                new_customer_row = customer_id \
                               + '^' + str(line['customer_id']) \
                               + '^' + str(line['email']) \
                               + '^' + timestamp \
                               + '^' + 'arye' + '^' \
                               + timestamp \
                               + '^' + 'arye' + '\n'

                new_customer_detail_personal_row = str(uuid.uuid4()) + \
                                                  '^' + customer_id + \
                                                  '^' + str(line['last_name'])+ \
                                                  '^' + str(line['first_name']) + \
                                                  '^' + str(line['gender']) + \
                                                   '^{' + str(line['phone']) + \
                                                   '}^' \
                                                  + timestamp \
                                                  + '^' + 'arye' + '^' \
                                                  + timestamp \
                                                  + '^' + 'arye' + '\n'

                new_customer_detail_address_row = str(uuid.uuid4()) + \
                                                 '^' + customer_id + \
                                                 '^' + str(1)+ \
                                                 '^' + str(line['country']) + \
                                                 '^' + str(line['city']) + \
                                                 '^' + str(line['street']) + \
                                                 '^' + str('NULL') + \
                                                 '^' + str('NULL') + \
                                                 '^' + str('NULL') + \
                                                  '^' + timestamp \
                                                 + '^' + 'arye' + '^' \
                                                 + timestamp \
                                                 + '^' + 'arye' + '\n'

                new_transaction_register_row=str(uuid.uuid4()) + \
                                             '^' + customer_id + \
                                             '^' + str(line['currency'])+ \
                                             '^' + str(line['cerdit_card_type']) + \
                                             '^' + str(line['cerdit_card_number']) + \
                                             '^' + str(line['cerdit_card_number'])[ len(str(line['cerdit_card_number']))-4 :len(str(line['cerdit_card_number'])):1] + \
                                             '^' + str(line['total_price']) + \
                                             '^' + str('NULL') + \
                                             '^' + timestamp + \
                                             '^' + timestamp \
                                             + '^' + 'arye' + '^' \
                                             + timestamp \
                                             + '^' + 'arye' + '\n'

                customer_data += new_customer_row
                customer_detail_personal_data+=new_customer_detail_personal_row
                customer_detail_address_data+=new_customer_detail_address_row
                transaction_register_data+=new_transaction_register_row



            except Exception as ex:
                print(ex.args[0])

            count += 1

            if count >= CHUNK_SIZE:
                pg_bulk_insert(CUSTOMER_TABLE_NAME, customer_data, db_cursor, postgres_obj)
                pg_bulk_insert(CUSTOMER_DETAIL_PERSONAL_TABLE_NAME,customer_detail_personal_data, db_cursor, postgres_obj)
                pg_bulk_insert(CUSTOMER_DETAIL_ADDRESS_TABLE_NAME, customer_detail_address_data, db_cursor, postgres_obj)
                pg_bulk_insert(TRANSACTION_REGISTER_TABLE_NAME, transaction_register_data, db_cursor, postgres_obj)



                customer_data = ''
                customer_detail_personal_data=''
                customer_detail_address_data=''
                transaction_register_data=''


        if len(customer_data) > 0:
            pg_bulk_insert(CUSTOMER_TABLE_NAME, customer_data, db_cursor, postgres_obj)
            pg_bulk_insert(CUSTOMER_DETAIL_PERSONAL_TABLE_NAME,customer_detail_personal_data, db_cursor, postgres_obj)
            pg_bulk_insert(CUSTOMER_DETAIL_ADDRESS_TABLE_NAME, customer_detail_address_data, db_cursor, postgres_obj)
            pg_bulk_insert(TRANSACTION_REGISTER_TABLE_NAME, transaction_register_data, db_cursor, postgres_obj)

    postgres_obj.close()


def pg_bulk_insert(table_name, customer_data, db_cursor, postgres_obj):
    try:
        f = io.StringIO(customer_data)
        db_cursor.copy_from(f, table_name, sep='^', null='NULL')
        postgres_obj.commit()
    except Exception as ex:
        print(ex.args[0])


if __name__ == '__main__':
    if not sys.argv[1:]:
        data_file_path = 'D:\\Dev\\Samples\\react\\justt\\justt-web\\scripts\\migration\\data\\data.json'
    else:
    	data_file_path = str(sys.argv[1:])
    	print(data_file_path)

    main(data_file_path)

