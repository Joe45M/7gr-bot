const axios = require('axios');
const _ = require('lodash');

async function getProfile(id, msg) {
    let name = id.replaceAll('_', ' ');
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
                    inline: true,
                },
                {
                    name: 'Poles',
                    value: res.data.poleCount.toString(),
                    inline: true,
                },
                {
                    name: 'Points',
                    value: res.data.points.toString(),
                    inline: true,
                },
                {
                    name: 'Races',
                    value: res.data.raceCount.toString(),
                    inline: true,
                },
                {
                    name: 'Wins',
                    value: res.data.winCount.toString(),
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
