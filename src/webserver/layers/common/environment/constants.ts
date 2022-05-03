// NOTE(jim): You should change these values to match your service.
import { IPaginationChunk } from '../interface/IPagination';

export const SESSION_KEY = 'JUSTT_SESSION_KEY';

export const CUSTOMERS_DATA_KEY = 'CUSTOMERS';

export const LOG_LEVELS = {
    EXCEPTION: 5,
    ERROR: 10,
    WARNING: 20,
    INFO: 30,
    HEARTBEAT: 40,
    DEBUG: 50,
    TRACE: 60,
};

export const CUSTOMER_DATA_SCHEMA: string = 'customer_data';
export const PAGINATION_CHUNK: IPaginationChunk = 50;
