const firstMessage = require('./first-message')

module.exports = (client) => {
  const channelId = '784120691171393596'

  const getEmoji = (emojiName) =>
    client.emojis.cache.find((emoji) => emoji.name === emojiName)

  const emojis = {
    spelers: 'spelers',
  }

  const reactions = []

  let emojiText = ''
  for (const key in emojis) {
    const emoji = getEmoji(key)
    reactions.push(emoji)

    const role = emojis[key]
    emojiText += 'server rules \n\n 1 don\'t be rude \n 2 keep everything in its channel \n 3 cursing is fine just don\'t overdo it and no slurs\n 4 no gore \n 5 do not send tracking links  you will be banned and reported and the link will be deleted \n 6 do not spam \n 7 respect discord TOS \n 8 have fun and invite your friends if you want \n 9 no pinging, unless there is an emergency-- then feel free to ping mods, admins or the onwer \n 10 no advertising (including, but not limited to- servers, products, companies and bots) even if it is not your server, product, bot etc. do not advertise it. \n 11 if your suggestion is not approved, or is dismissed, or just hasn\'t been addressed yet, be patient. we have limited staff.'
  }

  firstMessage(client, channelId, emojiText, reactions)

  const handleReaction = (reaction, user, add) => {
    if (user.id === '723819104045105172') {
      return
    }

    const emoji = reaction._emoji.name

    const { guild } = reaction.message

    const roleName = emojis[emoji]
    if (!roleName) {
      return
    }

    const role = guild.roles.cache.find((role) => role.name === roleName)
    const member = guild.members.cache.find((member) => member.id === user.id)

    if (add) {
      member.roles.add(role)
    } else {
      member.roles.remove(role)
    }
  }

  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}