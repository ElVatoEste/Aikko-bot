function presence() {
  client.user.setPresence({
    status: "online",
    activity: {
      name: "k!help | EʅVαƚσ#3524",
      type: "PLAYING"
    }
  })
}

module.exports = (bot) => {
  console.log(`Yay, ${bot.user.username} esta lista para la acción :D!`),
  presence;
}
