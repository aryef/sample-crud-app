import * as luxon from 'luxon';
import { DateTime } from "luxon";

export const get_time_stamp_str: () => string  = () => {

  const ret = luxon.DateTime.now()
      .toISODate() + ' ' +
      luxon.DateTime.now()
      .toISOTime()
      .replace('+03:00', '')
      .replace('+02:00', '')

    return ret;
};


 export const get_time_stamp: () => DateTime = () => {
  return luxon.DateTime.local() ;
};





