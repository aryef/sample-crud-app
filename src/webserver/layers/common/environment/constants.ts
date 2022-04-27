// NOTE(jim): You should change these values to match your service.
export const SESSION_KEY = 'FINBOO_SESSION_KEY';
export const SESSION_KEY_REGEX =
    /(?:(?:^|.*;\s*)FINBOO_SESSION_KEY\s*\=\s*([^;]*).*$)|^.*$/;
export const GOOGLE_AUTH_KEY = 'GOOGLE_AUTH_KEY';

export const LOG_LEVELS = {
    EXCEPTION: 5,
    ERROR: 10,
    WARNING: 20,
    INFO: 30,
    HEARTBEAT: 40,
    DEBUG: 50,
    TRACE: 60,
};

const MESSAGES_DATA = 'messages' as const;
const MESSAGES_REFRESH = 'messages:refresh' as const;
const MESSAGE_ADD = 'message:add' as const;
const MESSAGE_REMOVE = 'message:remove' as const;

const USERS_DATA = 'users' as const;
const USERS_REFRESH = 'users:refresh' as const;
const USER_ADD = 'user:add' as const;
const USER_LEAVE = 'user:leave' as const;
const CONNECTION = 'connection' as const;

export const IO_ACTION = {
    CONNECTION,
    MESSAGES_DATA,
    MESSAGES_REFRESH,
    MESSAGE_ADD,
    MESSAGE_REMOVE,
    USERS_DATA,
    USERS_REFRESH,
    USER_ADD,
    USER_LEAVES_CHANNEL: USER_LEAVE,
};

export const CUSTOMER_DATA_SCHEMA: string = 'customer_data';
