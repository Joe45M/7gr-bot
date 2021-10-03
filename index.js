require('dotenv').config(); //initialize dotenv
const { Client, Intents } = require('discord.js');
const axios = require('axios');
const _ = require('lodash');
const { getTable } = require('./commands/table');
const { getTables } = require('./commands/tables');
const { getProfile } = require('./commands/profile');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] }); //create new client
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async msg => {
    if (!msg.content.startsWith('!7gr')) {
        return false;
    }

    let str = msg.content.split(' ');

    if (str.length < 3) {
        msg.reply('Incorrect command usage. Expected 3 operands, received ' + str.length);
    }


    let command = {
        cmd: str[1],
        param: str[2],
    };


    switch (command.cmd) {
        case 'table':
            getTable(command.param, msg);
            break;
        case 'profile':
            getProfile(command.param, msg);
            break;
        case 'tables':
            getTables(msg);
            break;
    }
});


//make sure this line is the last line
client.login(process.env.CLIENT_TOKEN); //login bot using token

