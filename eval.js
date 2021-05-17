const command = require('./command')
const ownerId = '597435632486449163' // my discord user ID
const channelId = '795321233658871838' // private channel ID

module.exports = (client) => {
  command(client, 'eval', (message) => {
    const { member, channel, content } = message

    if (member.id === ownerId && channel.id === channelId) {
      const result = eval(content.replace('!eval ', ''))
      channel.send(result)
    }
  })
}