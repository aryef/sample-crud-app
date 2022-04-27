DROP SCHEMA IF EXISTS forex_money_market_data CASCADE;

create schema forex_money_market_data; 
alter schema forex_money_market_data owner to justt_data_loader;


SET search_path = forex_money_market_data,public,pg_catalog;

SET default_tablespace = '';
SET default_with_oIds = false;

CREATE SEQUENCE forex_money_market_data_id_seq
START WITH 1
INCREMENT BY 1
NO MINVALUE
NO MAXVALUE
cache 1;

ALTER TABLE forex_money_market_data_id_seq owner TO justt_data_loader;


create table currency_rate_usd (
	id bigint not NULL DEFAULT nextval ('forex_money_market_data_id_seq'::regclass),
	trade_date timestamp(3) NOT NULL  DEFAULT now(),
	ccy integer not null,
	ccy_name varchar(3) not null default 'XXX',
	basis integer NOT null,
	sterling integer NOT null,
	iron integer NOT null,
	exotic integer  NOT null,
	spot_bid numeric(15,6) null,
	spot_ask numeric(15,6) null,
	on_bid numeric(15,6) null,
	on_ask numeric(15,6) null,
	tn_bid numeric(15,6) null,
	tn_ask numeric(15,6) null,
	interest_1d_bid numeric(6,2) null,
	interest_1d_ask numeric(6,2) null,
	interest_7d_bid numeric(6,2) null,
	interest_7d_ask numeric(6,2) null,
	interest_1m_bid numeric(6,2) null,
	interest_1m_ask numeric(6,2) null,
	interest_2m_bid numeric(6,2) null,
	interest_2m_ask numeric(6,2) null,
	interest_3m_bid numeric(6,2) null,
	interest_3m_ask numeric(6,2) null,
	interest_6m_bid numeric(6,2) null,
	interest_6m_ask numeric(6,2) null,
	interest_9m_bid numeric(6,2) null,
	interest_9m_ask numeric(6,2) null,
	interest_1y_bid numeric(6,2) null,
	interest_1y_ask numeric(6,2) null,
	interest_2y_bid numeric(6,2) null,
	interest_2y_ask numeric(6,2) null,	
    insert_time timestamp(3) NOT NULL  DEFAULT now() ,
    calc_time timestamp(3)  DEFAULT now() ,  
    row_status character (1) DEFAULT '0'   
) ;

ALTER TABLE currency_rate_usd
  OWNER TO justt_data_loader;

ALTER TABLE ONLY currency_rate_usd 
ADD CONSTRAINT currency_rate_usd_pkey PRIMARY KEY (id, trade_date, row_status);


create table ccy_m (
	id bigint not null DEFAULT nextval ('forex_money_market_data_id_seq'::regclass),
	ccy1 integer null,
	ccy1_name CHARACTER varying(10) not null default 'XXX',
	usd integer null,
	eur integer null,
	jpy integer null,
	gbp integer null,
	chf integer null,
	aud integer null,
	nzd integer null,
	xau integer null,
	xag integer null,
	nok integer null,
	sek integer null,
	ats integer null,
	bef integer null,
	cad integer null,
	dem integer null,
	dkk integer null,
	esp integer null,
	fim integer null,
	frf integer null,
	grd integer null,
	hkd integer null,
	idr integer null,
	iep integer null,
	ils integer null,
	inr integer null,
	itl integer null,
	krw integer null,
	myr integer null,
	nlg integer null,
	php integer null,
	pte integer null,
	sgd integer null,
	thb integer null,
	trl integer null,
	twd integer null,
	xpt integer null,
	zar integer null,
	rub integer null,
	huf integer null,
	mxn integer null,
	brl integer null,
	sal integer null,
	pln integer null,
	aed integer null,
	czk integer null,
	kwd integer null,
	cny integer null,
	pkr integer null,
	ars integer null,
	skk integer null,
	xpd integer null,
	insert_time timestamp(3) NOT NULL  DEFAULT now() ,
   calc_time timestamp(3)  DEFAULT now() ,  
   row_status character (1) DEFAULT '0'   
);

ALTER TABLE ccy_m
  OWNER TO justt_data_loader;

ALTER TABLE ONLY ccy_m 
ADD CONSTRAINT ccy_m_pkey PRIMARY KEY (id, row_status);


create table ccy_major (
	id int not null DEFAULT nextval ('forex_money_market_data_id_seq'::regclass),
	ccy1 int null,
	ccy1_name varchar(10) not null default 'XXX',
	usd integer null,
	eur integer null,
	jpy integer null,
	gbp integer null,
	chf integer null,
	aud integer null,
	nzd integer null,
	xau integer null,
	xag integer null,
	nok integer null,
	sek integer null,
	cad integer null,
	dkk integer null,
	hkd integer null,
	idr integer null,
	ils integer null,
	inr integer null,
	krw integer null,
	myr integer null,
	php integer null,
	sgd integer null,
	thb integer null,
	trl integer null,
	twd integer null,
	xpt integer null,
	zar integer null,
	rub integer null,
	huf integer null,
	mxn integer null,
	brl integer null,
	sal integer null,
	pln integer null,
	aed integer null,
	czk integer null,
	kwd integer null,
	cny integer null,
	pkr integer null,
	ars integer null,
	skk integer null,
	xpd integer null,
	insert_time timestamp(3) NOT NULL  DEFAULT now() ,
   calc_time timestamp(3)  DEFAULT now() ,  
   row_status character (1) DEFAULT '0'   
);

ALTER TABLE ccy_major
  OWNER TO justt_data_loader;

ALTER TABLE ONLY ccy_major 
ADD CONSTRAINT ccy_major_pkey PRIMARY KEY (id, row_status);



----------------------------------------------------------------------------
create table currency (
                          id bigint not null DEFAULT nextval ('forex_money_market_data_id_seq'::regclass),
                          code varchar(3) not null,
                          short_name varchar(2) null,
                          full_name varchar(30) null,
                          country varchar(20) null,
                          active integer null,
                          full_name_11 varchar(100) null,
                          full_name_15 varchar(100) null,
                          full_name_27 varchar(100) null,
                          data_json jsonb,
                          insert_time timestamp(3) NOT NULL  DEFAULT now() ,
                          calc_time timestamp(3)  DEFAULT now() ,
                          row_version character (1) DEFAULT '0'
);

ALTER TABLE currency
    OWNER TO justt_data_loader;

ALTER TABLE ONLY currency
    ADD CONSTRAINT currency_pkey PRIMARY KEY (id, row_version);
ALTER TABLE currency
    ADD CONSTRAINT currency_code_unq UNIQUE (code);

create materialized view mv_currency
as
select a.* ,
       jsonb_build_object('translation',
                          ARRAY[jsonb_build_object('column_name', 'full_name' , 'column_value',
                                                   jsonb_build_object(
                                                           'eng', a.full_name_11,
                                                           'heb', a.full_name_15,
                                                           'rus', a.full_name_27)
                              )]
           )
from currency a;

ALTER TABLE mv_currency
    OWNER TO justt_data_loader;
----------------------------------------------------------------------------




