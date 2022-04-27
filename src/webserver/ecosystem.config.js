module.exports = {
    apps: [
        {
            name: 'justt-web',
            script: 'node_modules/next/dist/bin/next',
            args: 'start',
            cwd: './',
            exec_mode: 'cluster',
            instances: 2,
            autorestart: false,
            watch: false,
            max_memory_restart: '1G',
            kill_timeout: 5000,
            env: {
                NODE_ENV: 'development',
                WEBSITE_PORT: 50080,
            },
            env_production: {
                NODE_ENV: 'production',
            },
            log_date_format: 'YYYY-MM-DD HH:mm Z',
            combine_logs: true,
        },
        // optionally a second project
    ],
};
