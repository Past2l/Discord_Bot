import environmentChecker from './environment';
import databaseLoader from './database';
import discordLoader from './discord';
export default async () => {
    await environmentChecker();
    if(process.env.BOT_LOG==='true') await databaseLoader();
    await discordLoader();
};