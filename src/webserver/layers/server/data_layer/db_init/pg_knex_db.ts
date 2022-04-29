import knex, { Knex } from 'knex';
import { attachPaginate } from 'knex-paginate';
import { resetPgDateParsers } from '../helpers/reset_pg_date_parsers';

const pg_db: (config: string | Knex.Config<any>) => Knex = (
    config,
) => {
    resetPgDateParsers();
    attachPaginate();
    return knex(config);
};

export default pg_db;
