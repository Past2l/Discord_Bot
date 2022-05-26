import { EmbedDefault } from '../modules/embed';
import { Command } from '../types/command';

export default new Command({
    name: 'ping',
    description: 'replies with pong',
    run: async ({ interaction }) => {
        await interaction.reply({
            embeds: [
                EmbedDefault({
                    color: '#00ff00',
                    title: 'Ping!',
                    desc: '```Pong!```',
                }),
            ],
            ephemeral: true,
        });
    },
});
