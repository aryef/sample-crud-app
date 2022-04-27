import lodash from "lodash";
import { IObjectKeys } from "../interface/IObjectKeys";
import { getKeyValue } from "./get_key_value";

import { isEmpty } from "./string_helper";

export const upsert_array_member: <T extends IObjectKeys>(
    arr: Array<T>,
    key_name: string,
    key_value: string,
    newArrayMember: T,
) => Array<T> = <T  extends IObjectKeys>(
    arr: Array<T>,
    key_name: string,
    key_value: string,
    newArrayMember: T,
) => {
    if (
        arr &&
        !isEmpty(key_name) &&
        !isEmpty(key_value) &&
        !isEmpty(newArrayMember)
    ) {
        const match = lodash.find<T>(arr, function (obj: T) {
            if (obj) {

              const value = getKeyValue(obj,key_name as keyof T);

                return (value === key_value);
            } else {
                return false;
            }
        });

        if (match) {
            lodash.merge(arr, newArrayMember);
        } else {
            arr.push(newArrayMember);
        }
    }
    return arr;
};
