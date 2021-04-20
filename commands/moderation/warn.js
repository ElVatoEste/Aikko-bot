const warns = require("../../models/warns");
module.exports = {
  name: "warn",
  description: "Warn a user",
  category: "moderation",
  usage: "<User mention> <Reason>",
  run: async (bot, message, args) => {
    let user = message.mentions.users.first();
    if (!user) return message.channel.send(`Usuario no valido! verifique nuevamente`);
    if (!args.slice(1).join(" "))
      return message.channel.send(`No has especificado la razon de la advertencia!`);
    warns.findOne(
      { Guild: message.guild.id, User: user.id },
      async (err, data) => {
        if (err) console.log(err);
        if (!data) {
          let newWarns = new warns({
            User: user.id,
            Guild: message.guild.id,
            Warns: [
              {
                Moderator: message.author.id,
                Reason: args.slice(1).join(" "),
              },
            ],
          });
          newWarns.save();
          message.channel.send(
            `${user.tag} ha sido advertido, razon: ${args
              .slice(1)
              .join(" ")}. Tiene 1 advertencia.`
          );
        } else {
          data.Warns.unshift({
            Moderator: message.author.id,
            Reason: args.slice(1).join(" "),
          });
          data.save();
          message.channel.send(
            `${user.tag} ha sido advertido, razon: ${args
              .slice(1)
              .join(" ")}. El tiene ${data.Warns.length} advertencias.`
          );
        }
      }
    );
  },
};
