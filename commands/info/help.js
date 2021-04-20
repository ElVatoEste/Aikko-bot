const { formatDate } = require("../../functions");
const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "help",
  category: "info",
  description: "Los comandos de la guild",
  run: async (bot, message, args) => {
    
const Embed = new MessageEmbed()
      .setTitle(`Los comandos en el servidor ${message.guild.name} son:`)
      .setColor(`RANDOM`)
      .setFooter(`Date format: MM/DD/YYYY`)
      .setDescription("Prefix    8ball\nAd         Announce\nAvatar  Giveaway\nMeme  Poll\nReddit  Say\nOldest  Youngest\nReport  Warn\nWarns  Emoji\nRole      Slowmode\nTimer")
    message.channel.send(Embed);
  },
};