const { MessageEmbed } = require('discord.js'); // Import the MessageEmbed class
const index = require("../../index");

async function sendQueueEmbedPlaceHolder(bot) {
    let guild = bot.guilds.cache.get(index.config.guild.id)

    if (guild == undefined)
        return { ok: false, message: undefined, error: "Guild not found." };

    let channel = guild.channels.cache.get(index.config.guild.queueEmbed.channelId);

    if (channel == undefined)
        return { ok: false, message: undefined, error: "Channel not found." }

    let finalError = null;

    let message = await channel.send({ content: "Placeholder.." }).catch(async (error) => {
        finalError = error;
    });

    return { ok: true, message: message, error: finalError };
}

exports.run = (bot, interaction, suffix, help) => {
    const utility = require("../../modules/utility.js");

    if (!utility.isOwner(interaction.user.id))
        return utility.errorReply("This command is for the bot owner only.", interaction);

        if (help) {
            var embed = new MessageEmbed();
            embed.setColor("Red");
            embed.setTitle("ככה");
            embed.setDescription("Starting setup. Please edit config when setup is ready!");
        
            interaction
                .reply({ embeds: [embed], ephemeral: false })
                .catch((error) => {
                    console.error(error);
                });
        }
        
        // דוגמא 2: בדיקה עבור interaction
        interaction
            .reply({ content: "Placeholder.." })
            .then((inter_message) => {
                sendQueueEmbedPlaceHolder(bot).then((result) => {
                    var ok = result.ok;
                    var message = result.message;
                    var error = result.error;
        
                    if (error != null) {
                        var embed = new MessageEmbed();
                        embed.addField("Queue ID", `Error: ${error}`, true);
                        return interaction
                            .editReply({ embeds: [embed], ephemeral: false })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
        
                    if (ok != true || message == undefined || message == null) {
                        var embed = new MessageEmbed();
                        embed.addField("Queue ID", "Unknown error", true);
                        return interaction
                            .editReply({ embeds: [embed], ephemeral: false })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
        
                    var embed = new MessageEmbed();
                    embed.addField("Queue ID", `\`${message.id}\``, true);
                    interaction
                        .editReply({ embeds: [embed], ephemeral: false })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            })
            .catch((error) => {
                console.error(error);
            });
};
