import { Event } from '../types/event';
import { client } from '../loaders/discord';

export default new Event("ready",() => {
    console.log(`Logged in as \x1b[33m${client.user.tag}\x1b[37m!`);
});