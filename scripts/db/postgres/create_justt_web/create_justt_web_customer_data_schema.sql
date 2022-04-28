drop schema if exists  customer_data cascade;
create schema customer_data;
alter schema customer_data owner to justt_data_loader;


set search_path = customer_data ,public, pg_catalog;

set default_tablespace = '';
set default_with_oids = false;

--------------------------------------------------------------------------------

create table customer (
	seq UUID NOT NULL DEFAULT gen_random_uuid(),
    customer_id citext NOT null,
    email varchar(50) null,
	data_json jsonb NOT NULL,
	created_at timestamp(3) not null DEFAULT now() ,
	create_user varchar(50) not null DEFAULT current_user,
	updated_at timestamp(3),
	update_user varchar(50)
	
);

ALTER TABLE customer
  OWNER TO justt_data_loader;


ALTER TABLE ONLY customer
    ADD CONSTRAINT customer_pkey PRIMARY KEY (seq);


CREATE unique INDEX customer_isx
    ON customer
        USING btree (customer_id);

CREATE unique INDEX customer_email_isx
    ON customer
        USING btree (logic_helper.to_lower(email));

CREATE TRIGGER trg_customer_on_insert_update
    before INSERT OR UPDATE
    ON customer_data.customer
    FOR EACH ROW
    WHEN (pg_trigger_depth() < 1)
EXECUTE FUNCTION logic_helper.fn_user_data_trg();

-------------------------------------------------------------------

--NOTE - one email and phone
create table customer_detail_personal (
	seq UUID NOT NULL DEFAULT gen_random_uuid(),
    customer_seq UUID,
    last_name varchar(1000) not null,
    first_name varchar(1000) null,
    gender varchar(200) null,
    phone varchar(30)[] null,
	data_json jsonb NOT NULL,
    created_at timestamp(3) not null DEFAULT now() ,
    create_user varchar(50) not null DEFAULT current_user,
    updated_at timestamp(3),
    update_user varchar(50)
) ;

ALTER TABLE customer_detail_personal
  OWNER TO justt_data_loader;

ALTER TABLE ONLY customer_detail_personal
    ADD CONSTRAINT customer_detail_personal_pkey PRIMARY KEY (seq);

CREATE unique INDEX customer_detail_personal_isx
    ON customer_detail_personal
        USING btree (customer_seq);

CREATE TRIGGER trg_customer_detail_personal_on_insert_update
    before INSERT OR UPDATE
    ON customer_data.customer_detail_personal
    FOR EACH ROW
    WHEN (pg_trigger_depth() < 1)
EXECUTE FUNCTION logic_helper.fn_user_data_trg();

--TODO there may be several addresses of the same customer
create table customer_detail_address (
      seq UUID NOT NULL DEFAULT gen_random_uuid(),
      customer_seq UUID,
      is_default_address int DEFAULT 0 CHECK (is_default_address in (0,1)), --TODO implement exclusive logic using trigger
      country varchar(1000) not null, 
      city varchar(1000) null,
      street varchar(200) null,
      geolocation_address_wgs84 geometry null, --TODO implement pyramid presentation logic (if address is not found then show street middle, then city center
      geolocation_street_wgs84 geometry null,
      geolocation_city_wgs84 geometry null,
      data_json jsonb NOT NULL,
      created_at timestamp(3) not null DEFAULT now() ,
      create_user varchar(50) not null DEFAULT current_user,
      updated_at timestamp(3),
      update_user varchar(50)
) ;

ALTER TABLE customer_detail_address
    OWNER TO justt_data_loader;

ALTER TABLE ONLY customer_detail_address
    ADD CONSTRAINT customer_detail_address_pkey PRIMARY KEY (seq);

CREATE unique INDEX customer_detail_address_isx
    ON customer_detail_personal
        USING btree (customer_seq);

CREATE TRIGGER trg_customer_detail_address_on_insert_update
    before INSERT OR UPDATE
    ON customer_data.customer_detail_address
    FOR EACH ROW
    WHEN (pg_trigger_depth() < 1)
EXECUTE FUNCTION logic_helper.fn_user_data_trg();

create table transaction_register (
	seq UUID NOT NULL DEFAULT gen_random_uuid(),
    customer_seq UUID not null, --TODO FK to table customer
	transaction_ccy varchar(3) not null,  --TODO FK to table currency
    credit_card_type varchar(30), --TODO FK to table credit_card
    credit_card_number_encrypted varchar(32), --TODO FK should be always encrypted
    credit_card_last_four_digits varchar(4),
	transaction_amount  numeric(16,4)  not null default 0,
	transaction_amount_in_base_ccy numeric(16,4),  -- base_ccy should be recalculated if changed by system administrator, it IS complicated
	transaction_date date NOT NULL  DEFAULT now()  , -- no initial data is provided, should be managed
	data_json jsonb NOT NULL,
    created_at timestamp(3) not null DEFAULT now() ,
    create_user varchar(50) not null DEFAULT current_user,
    updated_at timestamp(3),
    update_user varchar(50)
) ;

ALTER TABLE transaction_register
  OWNER TO justt_data_loader;

ALTER TABLE ONLY transaction_register 
ADD CONSTRAINT transaction_register_pkey PRIMARY KEY (seq);


CREATE INDEX transaction_register_isx
ON transaction_register 
USING btree (customer_seq);

CREATE TRIGGER trg_transaction_register_on_insert_update
    before INSERT OR UPDATE
    ON customer_data.transaction_register
    FOR EACH ROW
    WHEN (pg_trigger_depth() < 1)
EXECUTE FUNCTION logic_helper.fn_user_data_trg();


