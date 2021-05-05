const express = require("express");///////////NoOne ©
const app = express();///////////NoOne ©

app.listen(() => console.log('NoOne Bot Ready !'));

app.use('/ping', (req, res) => {
  res.send(new Date)
});

const Discord = require("discord.js");
const fs = require("fs");

const client = new Discord.Client();
const config = require("./config.js");
client.config = config;
client.queue = new Map()

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);///////////NoOne ©
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});///////////NoOne ©

client.commands = new Discord.Collection()

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);///////////NoOne ©
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];///////////NoOne ©
    console.log(`${commandName} Is Ready Now..`);
    client.commands.set(commandName, props);
  });///////////NoOne ©
});


client.login(config.token);