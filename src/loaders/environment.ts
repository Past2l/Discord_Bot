const format = function (name: string) {
    return `Environment '${name}' is empty`;
};

export const ENVIRONMENT_NAMES = [
    'DB_HOST',
    'DB_PORT',
    'DB_USERNAME',
    'DB_PASSWORD',
    'DB_NAME',
    'BOT_NAME',
    'BOT_ID',
    'BOT_TOKEN',
    'BOT_OWNER',
    'BOT_PREFIX',
    'BOT_ACTIVITY'
];

export default async () => {
    for (const env_name of ENVIRONMENT_NAMES) {
        if (!process.env[env_name]) throw new Error(format(env_name));
    }
};
