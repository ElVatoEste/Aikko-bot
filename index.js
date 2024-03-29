const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config.json");
const prefix = config.prefix;
const bot = new Discord.Client({
  disableMentions: "everyone",
  partials: ["REACTION"],
});

'use strict';

const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS] });
client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');
  if (!channel) return;
  channel.send(`Bienvenido ${member}, sos todo un capo 🎉`);
});


const mongoose = require("mongoose");
bot.prefix = prefix;
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.snipes = new Discord.Collection();
bot.events = new Discord.Collection();
bot.categories = fs.readdirSync("./commands/");
const token = require(`./token.json`);
const message = require("./events/guild/message");

mongoose.connect(token.Mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
["command", "server"].forEach((handler) => {
  require(`./handlers/${handler}`)(bot);
});
bot.on("ready", () => {
  require("./events/client/ready")(bot);
});
bot.on("message", async (message) => {
  message.member; //-- GuildMember based
  message.author; //-- User based
  require("./events/guild/message")(bot, message);
});
bot.on("messageUpdate", async (oldMessage, newMessage) => {
  require("./events/guild/messageUpdate")(oldMessage, newMessage);
});
bot.on("messageDelete", async (message) => {
  require("./events/guild/messageDelete")(message);
});
bot.on("messageReactionAdd", (reaction, user) => {
  require("./events/guild/messageReactionAdd")(reaction, user);
});
bot.on("messageReactionRemove", (reaction, user) => {
  require("./events/guild/messageReactionRemove")(reaction, user);
});
bot.login(token.Token);
