export { isBrowser, isNode } from './check_runtime_environment';
export { generate_uuid } from './generate_uuid';
export {
    get_iso_date,
    get_iso_date_str,
    to_iso_date_str,
    to_full_date_str,
} from './get_iso_date';
export { get_time_stamp, get_time_stamp_str } from './get_time';

export { upsert_array_member } from './upsert_array_member';

export {
    isEmpty,
    pluralize,
    capitalizeFirstLetter,
    elide,
    elide_lines,
    replaceAt,
} from './string_helper';

export { isEmptyObject, isEmptyValue } from './is_empty_object';

export { getKeyValue } from './get_key_value';
