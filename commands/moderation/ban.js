const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "ban",
  category: "moderation",
  description: "Ban a user of your choice!",
  usage: "<User mention>",
  run: async (bot, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(`No.`);
    let User = message.mentions.users.first() || null;

    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.members.resolve(user)
      if (member) {
            member.ban({
            reason: 'They were bad!',
          })
          .then(() => {
            message.channel.send(`Successfully banned ${user.tag}`);
          })
          .catch(err => {
            message.channel.send('I was unable to ban the member');
            console.error(err);
          });
      } else {
        message.channel.send("That user isn't in this guild!");
      }
    } else {
      message.channel.send("You didn't mention the user to ban!");
    }
  }
};