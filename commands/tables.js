const axios = require('axios');
const _ = require('lodash');

async function getTables(msg) {
    let res;

    try {
        res = await axios.get(process.env.ENDPOINT +'/api/table');
        const embed = {
            color: 0x0099ff,
            title: '7GR Tables',
            url: `https://7gr.app/`,
            description: '7GR Table information. Use the championship ID to query a table.',
            fields: [
            ],
            timestamp: new Date(),
            footer: {
                text: 'Information retrieved from the 7GR website just now.',
            },
        };

        res.data.forEach(el => {
            console.log(el)
            embed.fields.push({
                name: 'Name',
                value: el.name,
                inline: true,
            });

            embed.fields.push({
                name: 'ID',
                value: el.id.toString(),
                inline: true,
            });

            embed.fields.push({
                name: '\u200b',
                value: '\u200b',
            });
        })

        msg.channel.send({ embeds: [embed] });

    } catch (err) {
        console.log(err);

        if (err.response.status === 404) {
            msg.reply('Endpoint does not exist..');
        }
    }

    return true;
}

module.exports.getTables = getTables;
