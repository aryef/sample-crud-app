import { isNode } from '../utils/check_runtime_environment';
import fs from 'fs';
import Console from 'console';

let backend_logger: Console;

const getBackendLogger = async () => {
    if (isNode()) {
        if (!backend_logger) {
            try {
                backend_logger = new Console.Console({
                    stdout: fs.createWriteStream(
                        '../../logs/appNormalStdout.txt',
                    ),
                    stderr: fs.createWriteStream(
                        '../../logs/appErrStdErr.txt',
                    ),
                });

                console.log('custom logger initialized');
            } catch (err) {
                console.warn('customLogger init failed');
            }
        }
    }

    return backend_logger;
};

export default getBackendLogger;
