const Discord = require('discord.js')
const client = new Discord.Client()

const config = require('./config.json')
const mongo = require('./mongo')
mongo().then(mongoose => {
  try {
    console.log('conectecd to mongo')
  } catch (error) {
    console.error(error)
  }
  finally {
    mongoose.connection.close()
  }
})


const command = require('./command')
const firstMessage = require('./first-message')
const privateMessage = require('./private-massage')
const roleClaim = require('./role-claim')
const role = require('./role')
const rules = require('./rules')
const welcome = require('./welcome')
const membercount = require('./membercount')
const messagecounter = require('./messagecounter')
const messageCountSchema = require('./schemas/message-count-schema')
const welcomeSchema = require('./schemas/welcome-schema')
const mute = require('./mute')

client.on('ready', async () => {
  
  welcomeSchema(client)
  messageCountSchema(client)
  messagecounter(client)
  membercount(client)
  roleClaim(client)
  role(client)
  rules(client)
  welcome(client)

  command(client, ['ping', 'test'],(message) => {
    message.channel.send('Pong!')
  })

  command(client, 'servers', (message) => {
    client.guilds.cache.forEach((guild) => {
      message.channel.send(
        `${guild.name} has a total of ${guild.memberCount} members`
      )
    })
  })

  command(client, ['cc', 'clearchannel'], (message) => {
    if (message.member.hasPermission('ADMINISTRATOR')) {
      message.channel.messages.fetch().then((results) => {
        message.channel.bulkDelete(results)
      })
    }
  })

  command(client, 'status', (message) => {
    const content = message.content.replace('!status ', '')
    // "!status hello world" -> "hello world"

    client.user.setPresence({
      activity: {
        name: content,
        type: 0,
      },
    })
  })
  console.log('The client is ready!')
})

client.login(config.token)