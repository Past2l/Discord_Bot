import { Event } from '../types/event';
import { client } from '../loaders/discord';

const formatEval = function (str: string): string  {
    return str.replace(/{(.*?)}/g,(match,index)=>{
        try {
            let value = eval(index);
            return typeof value == 'undefined' ? match : value;
        } catch(e) {
            return '';
        }
    });
}

export default new Event("ready",() => {
    console.log(`Discord Log System \x1b[33m${process.env.BOT_LOG==='true'?'Enabled':'Disabled'}\x1b[37m!`);
    console.log(`Logged in as \x1b[33m${client.user!.tag}\x1b[37m!`);
    let count=0,activity=JSON.parse(process.env.BOT_ACTIVITY!);
    if(activity.length>0) setInterval(()=>{
        client.user!.setActivity(formatEval(activity[count]));
        count = count<activity.length-1 ? count+1 : 0;
    },10000);
});