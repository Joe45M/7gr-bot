const axios = require('axios');
const _ = require('lodash');

async function getTable(id, msg) {
    const res = await axios.get(process.env.ENDPOINT +'/api/table/' + id);
    const iteratees = obj => obj.sum;

    const sorted = _.sortBy(res.data, iteratees).reverse();

    let reply = 'Table is';

    let embed = {
        color: 0x0099ff,
        title: 'Table - click to view.',
        url: `https://7gr.app/champ/${id}`,
        description: 'Table information. Click the above link to view the full table.',
        fields: [
        ],
        timestamp: new Date(),
        footer: {
            text: 'Information retrieved from the 7GR website just now.',
        },
    };

    let i = 1;
    sorted.forEach(el => {
        console.log(el)
        embed.fields.push({
            name: 'Place',
            value: i.toString(),
            inline: true,
        });

        embed.fields.push({
            name: 'Name',
            value: el.user.name,
            inline: true,
        });

        embed.fields.push({
            name: 'points',
            value: el.sum.toString(),
            inline: true,
        });

        i++;
    })

    msg.channel.send({ embeds: [embed] });
}

module.exports.getTable = getTable;
