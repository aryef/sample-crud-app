import { Knex } from "knex";

//TODO implement loadEnvConfig from "@next/env"
//import { loadEnvConfig } from "@next/env";
//const dev = process.env.NODE_ENV !== 'production';
//const { PG_URI } = loadEnvConfig('./', dev).combinedEnv

export const pg_config: Knex.Config = {

  client: "pg",
  connection: process.env.PG_URI,
  searchPath: ["public"]

};