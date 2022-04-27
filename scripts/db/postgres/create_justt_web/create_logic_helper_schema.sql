DROP SCHEMA IF EXISTS logic_helper cascade;

create schema logic_helper; 
alter schema logic_helper owner to justt_data_loader;

set search_path = logic_helper, justt, public, pg_catalog;

set default_tablespace = '';
set default_with_oids = false;

/*
select  logic_helper.fn_unicode_sequence_to_varchar('1042,1089,1077,32,1088,1099,1085,1082,1080');
select  logic_helper.fn_unicode_sequence_to_varchar('');
select  logic_helper.fn_unicode_sequence_to_varchar(NULL);
set client_min_messages = 'log';
*/
-------------------------------------------------------------------------------------------------
CREATE or replace function logic_helper.fn_unicode_sequence_to_varchar (unicode_sequence character varying)
returns character varying as 
$BODY$
declare 
	numArr int[] ;
	v_strArr character varying = '';	
BEGIN
	
	IF unicode_sequence IS NULL OR unicode_sequence='' THEN
	
		RETURN unicode_sequence;
	END IF;

	numArr = string_to_array(unicode_sequence, ',');	
	
	for i in array_lower(numArr,1).. array_upper(numArr,1) loop	
		--raise notice '%', chr(numArr[i]::int);
		v_strArr := v_strArr || chr(numArr[i])::character varying;		
	end loop;
	--raise notice '%' , strArr;
	
	return v_strArr;
	
end
$BODY$
language plpgsql volatile 
cost 100;

alter function logic_helper.fn_unicode_sequence_to_varchar(character varying) owner to justt_data_loader;

-----------------------------------------------------------------------------------------------------------------
-- select * from logic_helper.fn_convert_from_str_to_unicode('אריה')
-- select ascii(SUBSTRING('kaka', 5, 1))
-- select length('kaka')

CREATE   or replace function logic_helper.fn_convert_from_str_to_unicode (p_string character varying)
RETURNS character varying 
as
$BODY$
declare 
	v_position int = 1;
	v_res character varying = '';
BEGIN

	IF p_string IS NULL OR p_string = '' THEN	
			RETURN p_string;
	END IF;	
	
	WHILE v_position <= length(p_string)::integer loop	   
		 v_res = v_res || ascii(SUBSTRING(p_string, v_position, 1))::character varying || ',';
		raise notice '%' , v_res;
		 v_position = v_position + 1;
	 end loop;
	
	 v_res = substring(v_res, 1, length(v_res) - 1);
		
	return v_res;
END 
$BODY$
language plpgsql volatile 
cost 100;

alter function logic_helper.fn_convert_from_str_to_unicode(character varying) owner to justt_data_loader;


---------------------------------------------------------------------------------------------------------
CREATE 	OR replace FUNCTION logic_helper.isnumeric (TEXT CHARACTER VARYING)
RETURNS boolean AS 
$BODY$
DECLARE x INTEGER;
	BEGIN
		x = trim(TEXT, ' ')::INTEGER;
		RETURN true;
		exception when others then
		RETURN false;
	END;
$BODY$
LANGUAGE plpgsql immutable security definer 
COST 100;

ALTER FUNCTION logic_helper.isnumeric (CHARACTER VARYING) OWNER TO justt_data_loader;
-------------------------------------------------------------------------------------------------------------
CREATE 	OR replace FUNCTION logic_helper.innull (var CHARACTER VARYING)
RETURNS boolean as
$BODY$
DECLARE x CHARACTER VARYING;
BEGIN
	x = trim(coalesce(var, ''), ' ')::CHARACTER VARYING;

	IF x = '' then
		RETURN true;
	ELSE
		RETURN false;
	end IF ;
	exception 
	when others then
	RETURN false;
END;
$BODY$
LANGUAGE plpgsql 
immutable 
security definer 
COST 100;

ALTER FUNCTION logic_helper.innull (CHARACTER VARYING) OWNER TO justt_data_loader;

----------------------------------------------------------------------------------------------

-- Function: logic_helper.fn_set_schema(character varying)

-- DROP FUNCTION logic_helper.fn_set_schema(character varying);

CREATE OR REPLACE FUNCTION logic_helper.fn_set_schema(
			data_schema_name character varying 
			DEFAULT 'published'::character VARYING
	)
  RETURNS TABLE(ret character varying) AS
$BODY$
 declare my_schema character varying (100)='';
begin
			
		if data_schema_name = 'published' 
		then
			my_schema =  'user_data'	;
		    --my_schema = 'user_data'	;	
		else
	           my_schema =  data_schema_name	;		
		end if;

	perform set_config('search_path', my_schema || ', public, logic_helper', false);
	
	
	raise notice '%' , my_schema;
	return query select my_schema::character varying;
	
end;
$BODY$
  LANGUAGE plpgsql VOLATILE
  COST 100;
ALTER FUNCTION logic_helper.fn_set_schema(character varying)
  OWNER TO justt_data_loader;

GRANT EXECUTE ON FUNCTION logic_helper.fn_set_schema(character varying) TO public;
GRANT EXECUTE ON FUNCTION logic_helper.fn_set_schema(character varying) TO justtuser;
