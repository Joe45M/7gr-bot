const axios = require('axios');
const _ = require('lodash');

async function getProfile(id, msg) {
    let name = id.replace('_', ' ');
    let res;

    try {
        res = await axios.get(process.env.ENDPOINT +'/api/profile/' + name);
        const embed = {
            color: 0x0099ff,
            title: res.data.name,
            url: `https://7gr.app/profile/${res.data.id}`,
            description: 'Profile information.',
            fields: [
                {
                    name: 'Name',
                    value: res.data.name,
                    inline: true,
                },
                {
                    name: 'Podiums',
                    value: res.data.podiumCount.toString(),
                    inline: false,
                },
                {
                    name: 'Poles',
                    value: res.data.poleCount.toString(),
                    inline: false,
                },
                {
                    name: 'Points',
                    value: res.data.points,
                    inline: true,
                },
            ],
            timestamp: new Date(),
            footer: {
                text: 'Information retrieved from the 7GR website just now.',
            },
        };

        msg.channel.send({ embeds: [embed] });

    } catch (err) {
        console.log(err);

        if (err.response.status === 404) {
            msg.reply('Profile does not exist.');
        }
    }

    return true;
}

module.exports.getProfile = getProfile;
