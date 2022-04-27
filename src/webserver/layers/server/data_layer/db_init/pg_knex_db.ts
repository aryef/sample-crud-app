import { resetPgDateParsers } from "../helpers/reset_pg_date_parsers";
import knex, { Knex } from "knex";


//TODO use loadEnvConfig from @next/env everywhere


const pg_db: (config: string | Knex.Config<any>) =>  Knex
  = (config) =>
  {
    resetPgDateParsers();
    return knex(config);
  };

export default pg_db;


