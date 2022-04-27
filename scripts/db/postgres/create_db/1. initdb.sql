create extension btree_gist;
create extension postgis;
create extension postgis_topology;
create extension dblink;

create extension pg_stat_statements;
create extension postgres_fdw;

CREATE EXTENSION citext;
 

CREATE ROLE justtuser
   VALID UNTIL 'infinity';

CREATE ROLE justt_data_loader
   VALID UNTIL 'infinity'; 


GRANT ALL ON DATABASE justt_web TO GROUP justt_data_loader WITH GRANT OPTION;
