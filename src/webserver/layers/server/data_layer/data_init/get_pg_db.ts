import { Knex } from 'knex';
import { log_error, log_info } from '../../../common/logger/logger';
import { pg_config } from '../db_init/pg_config';
import pg_db from '../db_init/pg_knex_db';

let pg_object: Knex;

const getPgDb: () => Knex = () => {
    if (!pg_object) {
        try {
            pg_object = pg_db(pg_config);
            log_info(`db initiated successfully`);
        } catch (err) {
            log_error(`db init crashed `, err);
            throw err;
        }
    }
    return pg_object;
};

export default getPgDb;
