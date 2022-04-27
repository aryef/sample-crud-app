import { elide_lines, isEmpty } from "../utils/string_helper";

export function stringifyError(err: any): string {
  const ret: string = `${
    err instanceof Error
      ? stringifyErrorValue(err)
      : err.toString()
  }`;

  return ret;
}

function stringifyErrorValue(err: Error | "") {
  if (isEmpty(err)) {
    return "";
  } else {
    const name = `   #Name: ${(<Error>err).name} \n`;
    const message = `    #Message ${(<Error>err).message} \n` || "";
    const stack =
      `    #Stack Trace: ${elide_lines(
        (<Error>err).stack ||
        "(no stack trace information)" ||
        "",
        parseInt(process.env.NEXT_PUBLIC_PRINT_MAX_LINES || "5"),
        "..."
      )} #` || "";

    return name + message + stack;
  }
}