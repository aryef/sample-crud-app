import { pg_config } from "../db_init/pg_config";
import pg_db from "../db_init/pg_knex_db";

const PG_DATA = pg_db(pg_config);
export default PG_DATA;