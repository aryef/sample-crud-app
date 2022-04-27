import { DateTime } from "luxon";


export function get_iso_date_str(date: DateTime):string {
    return date
        .toISOTime()
        .replace('+03:00', '')
        .replace('+02:00', '');
}

export  function get_iso_date(date: DateTime):DateTime {



   if(!date)
   {
     date =  DateTime.local();
   };


   const ret = date.toString()
     .replace('+03:00', '')
     .replace('+02:00', '');


  const r2 = DateTime.fromISO(ret);

  return r2 ;
}

export const to_iso_date_str:(data:string) => string = (data:string) => {
  const date = new Date(data);
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export const to_full_date_str = (data: string): string => {
  const date = new Date(data);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour12: true,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
};
