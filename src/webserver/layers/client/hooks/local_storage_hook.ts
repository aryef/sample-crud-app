import { useState, useEffect } from 'react';
import * as CheckRuntime from '../../common/utils/check_runtime_environment'

import { log_exception, log_warn } from "../../common/logger/logger";

export function getItem(key: string ): string | null
{
  if (CheckRuntime.isBrowser()) {

    const item: string | null  =  window.localStorage.getItem(key) || null;

    let ret :string | null = null;

    try {
      ret = item ? JSON.parse(item) : null;
    }
    catch (error:any) {

      log_exception(`getItem JSON.parse from Local Storage crashed \n original item= ${item}`, error);
      ret = null;
    }

    return ret;
  }
  else
  {
    log_warn(' get item failed. there is no local storage in server environment');
    return null;
  }
}

export function removeItem(key: string):void
{
  if (CheckRuntime.isBrowser()) {
    window.localStorage.removeItem(key);
  }
  else
  {
    log_warn(' remove item failed. there is no local storage in server environment');

  }
}
export function setItem(key: string, item:any ): void
{
  if (CheckRuntime.isBrowser()) {
   window.localStorage.setItem(key,  JSON.stringify(item));
  }
  else
  {
    log_warn(' set item failed. there is no local storage in server environment');

  }

}

export const useLocalStorage: any = (
    key: string,
    initialValue: string | null,
) => {


    const [value, setValue] = useState<string | null>(() => {

      let ret: string | null = null;

      if (CheckRuntime.isBrowser()) {

        const item = getItem(key);

        ret = item ? item :initialValue;

      }
      else
      {
        log_warn(' useLocalStorage get item failed. there is no local storage in server environment');


      };

        return ret;
    });

    useEffect(() => {

      if (CheckRuntime.isBrowser()) {


        setItem(key, value);
      }
      else
      {
        log_exception('save failed. there is no local storage in server environment','');
      }
    }, [key, value]);

    return [value, setValue];
};
