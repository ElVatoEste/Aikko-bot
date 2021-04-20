const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "kick",
  category: "moderation",
  description: "kick a user of your choice!",
  usage: "<User mention>",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("MANAGE_MESSAGES"))
    return message.channel.send(`No.`);
    let User = message.mentions.users.first() || null;

    const user = message.mentions.users.first();
    if (user) {
        const member = message.guild.members.resolve(user);
        if (member) {
            member.kick('Optional reason that will display in the audit logs')
            .then(() => {
              
              message.channel.send(`Successfully kicked ${user.tag}`);
            })
            .catch(err => {
              message.channel.send('I was unable to kick the member')
              console.error(err);
            });
        } else {
          message.channel.send("That user isn't in this guild!");
        }
      } else {
        message.channel.send("You didn't mention the user to kick!");
      }
    }
};