import { get_time_stamp_str } from "../utils/get_time";
import colors from "colors";
import { isEmpty } from "../utils";
import { isBrowser } from "../utils";
import { LOG_LEVELS } from "../environment/constants";
import { stringifyError } from "./stringifyError";



//import getCustomLogger from "./customLogger";

export const LOG_BLACK_CSS = 'color: black';
export const LOG_ERROR_CSS = 'color: orange';
export const LOG_EXCEPTION_CSS = 'color: red';
export const LOG_INFO_CSS = 'color: green';
export const LOG_WARNING_CSS = 'color: yellow';
export const LOG_DEBUG_CSS = 'color: blue';
export const LOG_HEARTBEAT_CSS = 'color: gray';

export const log_info: (message: string, data?: any) => void = (
  message: string,
  data: any = null,
) => {
  const appName ='['+ process.env.APPLICATION_NAME +']';

  const level = 'INFO';
  if (parseInt(process.env.LOG_LEVEL||'60') >= LOG_LEVELS.INFO) {

    if(isBrowser())
    {
      console.groupCollapsed(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message} `, LOG_INFO_CSS);
      console.warn(
        `${level}: ${get_time_stamp_str()}# ${message}`,
        !isEmpty(data)? `\n` + `#data: ${JSON.stringify(data)}` : ''
      );

      console.groupEnd();
    }
    else
    {

      const trace :string[]  = new Error().stack?.split('\n') || ['',''];

      console.info(
        colors.green.bold(`${appName}:${level}: ${get_time_stamp_str()}# `) +  `${message}`,
        (!isEmpty(data)? `\n` + `#data:  ${data ? JSON.stringify(data) : ''}` : '' ),
        `\n` + colors.gray('-->'
          + trace[2].
          replace('webpack-internal:///','  ').
          replace(' at eval (','') + '...').
        replace('(api)/','').
        replace(')...','...')
          .replace('(./', './')
          .replace('at Namespace.', '')
          .replace('.<anonymous>', '')

      );
    }

  }
};


export const log_heartbeat: (message: string, data?: any) => void = (
    message: string,
    data: any = null,
) => {
  const appName ='['+ process.env.APPLICATION_NAME +']';

  const level = 'HEARTBEAT';
  if (parseInt(process.env.LOG_LEVEL||'60') >= LOG_LEVELS.HEARTBEAT) {

    if(isBrowser())
    {
      console.groupCollapsed(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message} `, LOG_HEARTBEAT_CSS);
      console.warn(
        `${level}: ${get_time_stamp_str()}# ${message}`,
        !isEmpty(data)? `\n` + `#data: ${JSON.stringify(data)}` : ''
      );

      console.groupEnd();
    }
    else
    {

      const trace :string[]  = new Error().stack?.split('\n') || ['',''];

      console.info(
        colors.gray.bold(`${appName}:${level}: ${get_time_stamp_str()}# `) +  `${message}`,
          (!isEmpty(data)? `\n` + `#data:  ${data ? JSON.stringify(data) : ''}` : '' ),
           `\n` + colors.gray('-->'
          + trace[2].
          replace('webpack-internal:///','  ').
          replace(' at eval (','') + '...').
          replace('(api)/','').
          replace(')...','...')
          .replace('(./', './')
          .replace('at Namespace.', '')
          .replace('.<anonymous>', '')

      );
    }

  }
};

export const log_debug: (message: string, data?: any) => void = (
    message: string,
    data: any = null,
) => {
  const level = 'DEBUG';
  const appName = '[' + process.env.APPLICATION_NAME + ']';

  if (parseInt(process.env.LOG_LEVEL || '60') >= LOG_LEVELS.DEBUG) {

    if (isBrowser()) {
      console.groupCollapsed(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message} `, LOG_DEBUG_CSS);
      console.warn(
        `${level}: ${get_time_stamp_str()}# ${message} ${
          data ? JSON.stringify(data) : ''
        }`
      );
      console.groupEnd();
    } else {

      const trace: string[] = new Error().stack?.split('\n') || ['', ''];
      console.warn(
        colors.blue.bold(`${appName}:${level}: ${get_time_stamp_str()}# `) + `${message}`
        + (!isEmpty(data) ? `\n` + `#data:   ${data ? JSON.stringify(data) : ''}` : '') + `\n` +
        colors.gray('-->' + trace[2].replace('webpack-internal:///', '  ').replace(' at eval (', '').replace('(api)/', '') + '...').replace(')...', '...').replace('(./', './').replace('at Namespace.', '')
          .replace('.<anonymous>', '')
      );

/*      getCustomLogger().then((logger) => {

        if(logger)
          logger.warn(
          `${appName}:${level}: ${getTimeStamp()}# ` + `${message}`
          + (!isEmpty(data) ? `\n` + `#data:   ${data ? JSON.stringify(data) : ''}` : '') + `\n` +
          ('-->' + trace[2].replace('webpack-internal:///', '  ').replace(' at eval (', '').replace('(api)/', '') + '...').replace(')...', '...').replace('(./', './').replace('at Namespace.', '')
            .replace('.<anonymous>', '')
        );
      });*/
    }
  }
}


export const log_warn:(message: string, data?: any) => void = (
  message: string,
  data: any = null,
) => {
  const appName ='['+ process.env.APPLICATION_NAME +']';
  const level = 'WARN';
    if (parseInt(process.env.LOG_LEVEL||'60') >= LOG_LEVELS.WARNING) {
      if(isBrowser()) {
        console.warn(
          `${appName}:${level}: ${get_time_stamp_str()}# ${message} ${
            data ? JSON.stringify(data) : ''
          }`
        );
      }
      else
      {
        const trace :string[]  = new Error().stack?.split('\n') || ['',''];
        console.warn(
          colors.yellow.bold(`${appName}:${level}: ${get_time_stamp_str()}# `) +  `${message}`
          + (!isEmpty(data)? `\n` + `#data:   ${data ? JSON.stringify(data) : ''}` : '' )+ `\n` +
          colors.gray('-->' + trace[2].
          replace('webpack-internal:///','  ').
          replace(' at eval (','').
          replace('(api)/','') + '...').
          replace(')...','...').
          replace('(./', './').
          replace('at Namespace.', '')
          .replace('.<anonymous>', '')
        ) ;

      }
    }
};


export const log_error:(message: string, error?: any) => void = (
  message: string,
  error: any = null,
) => {
  const appName ='['+ process.env.APPLICATION_NAME +']';
  const level = 'ERROR';
  if (parseInt(process.env.LOG_LEVEL||'60') >= LOG_LEVELS.ERROR) {

    if(isBrowser()) {

      console.groupCollapsed(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message} `, LOG_ERROR_CSS);
      console.warn(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message}`, LOG_BLACK_CSS,
        (!isEmpty(error) ? `\n` +  `${stringifyError(error)} ` : ''));
      console.groupEnd();
    }
    else
    {
      const trace :string[]  = new Error().stack?.split('\n') || ['',''];

      console.warn(colors.red.bold(`${appName}:${level}: ${get_time_stamp_str()}: `) + `${message} ` +
        (!isEmpty(error) ? `\n` +  `${stringifyError(error)} ` : '') + `\n` +
        colors.gray('-->' + trace[2].
        replace('webpack-internal:///','  ').
        replace(' at eval (','') + '...').
        replace('(api)/','').
        replace(')...','...').
        replace('(./', './')
        .replace('at Namespace.', '')
        .replace('.<anonymous>', '')
      );


    }
  }
};

export const log_exception: (message: string, error: any ) => void = (
    message: string,
    error: any,
) => {
  const appName ='['+ process.env.APPLICATION_NAME +']';
  const level = 'EXCEPTION';
    if (parseInt(process.env.LOG_LEVEL||'60') >= LOG_LEVELS.EXCEPTION) {

      if(isBrowser()) {

        console.groupCollapsed(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message} `, LOG_EXCEPTION_CSS);
        console.warn(`%c ${appName}:${level}: ${get_time_stamp_str()}: ${message}`, LOG_BLACK_CSS,
          (!isEmpty(error) ? `\n` +  `${stringifyError(error)} ` : ''));
        console.groupEnd();


      }
      else
      {
        console.warn(colors.red(`${appName}:${level}: ${get_time_stamp_str()}: `) + `${message} \n`,
          `${stringifyError(error)}`);
      }
    }
};


export default {log_debug, log_info, log_error, log_warn, log_exception, log_heartbeat};