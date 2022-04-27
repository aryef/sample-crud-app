const { setTypeParser, builtins } = require('pg').types;

export function resetPgDateParsers() {
  for (const pgType of pgTypes) {
    setTypeParser(pgType, (val: any) => String(val)); // like noParse() function underhood pg lib
  }
}

const pgTypes = [
  builtins.DATE,
  builtins.TIME,
  builtins.TIMETZ,
  builtins.TIMESTAMP,
  builtins.TIMESTAMPTZ
];