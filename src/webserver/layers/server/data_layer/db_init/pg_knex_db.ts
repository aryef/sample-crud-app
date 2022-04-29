import knex, { Knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import { log_exception } from '../../../common/logger/logger';
import { resetPgDateParsers } from '../helpers/reset_pg_date_parsers';

let pgdb: Knex;

const pg_db: (config: string | Knex.Config<any>) => Knex = (
    config,
) => {
    if (!pgdb) {
        resetPgDateParsers();
        try {
            attachPaginate();
        } catch (err) {
            log_exception(`attach paginate crashed`, err);
        }

        pgdb = knex(config);
    }

    return pgdb;
};

export default pg_db;
