import environmentChecker from './environment';
import databaseLoader from './database';
import discordLoader from './discord';
export default async () => {
    await environmentChecker();
    await databaseLoader();
    await discordLoader();
};