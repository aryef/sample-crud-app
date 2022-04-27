import * as _ from "lodash";

export const isEmptyObject : (obj: any) => boolean = (obj: any):boolean => {
  return _.isEmpty(obj);
};

export const isEmptyValue : (value: any) => boolean = (value: any):boolean => {
  return  value === undefined
    || value === null
    || value === NaN
    || (typeof value === 'object'
      && Object.keys(value).length === 0 )
    || (typeof value === 'string' && value.trim().length === 0);
}



