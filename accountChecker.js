const fs = require('fs');
const { Client } = require('discord.js-selfbot-v13');
const path = require('path');

const filePath = './discordaccounts.txt';
let fileContent;

if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

fileContent = fs.readFileSync(filePath, 'utf8');
const accounts = fileContent.split(/\r?\n/).filter(Boolean);

fs.writeFileSync('valid_accounts.txt', '');
fs.writeFileSync('invalid_accounts.txt', '');

const firstLineParts = accounts[0].split(':');
const format = firstLineParts.length === 1 ? 'token-only' : 'full';

async function checkAccounts() {
    const report = [];

    for (const line of accounts) {
        let email = '';
        let password = '';
        let token = '';

        if (format === 'token-only') {
            token = line.trim();
        } else {
            [email, password, token] = line.split(':');
        }

        const client = new Client();

        try {
            await client.login(token);

            const user = client.user;
            const username = user.username;
            const displayName = user.displayName;
            const discriminator = user.discriminator;
            const guildCount = client.guilds.cache.size;

            console.log(`   Account valid: ${email || 'N/A'}`);
            console.log(`   Display Name: ${displayName}`);
            console.log(`   Username: ${username}#${discriminator}`);
            console.log(`   Guilds: ${guildCount}`);

            const guilds = [];
            client.guilds.cache.forEach(guild => {
                guilds.push({
                    id: guild.id,
                    name: guild.name,
                    memberCount: guild.memberCount
                });
            });

            const friendCode = `${username}#${discriminator}`;
            const friendID = user.id;

            report.push({
                email: email || 'N/A',
                username,
                displayName,
                discriminator,
                id: user.id,
                tag: user.tag,
                avatarURL: user.avatarURL(),
                bannerURL: user.bannerURL(),
                createdAt: user.createdAt,
                bot: user.bot,
                publicFlags: user.publicFlags,
                guildCount,
                guilds,
                friendID
            });

            fs.appendFileSync('valid_accounts.txt', line + '\n');

            await client.destroy();
        } catch (error) {
            console.log(`Account invalid: ${email || 'N/A'}`);
            fs.appendFileSync('invalid_accounts.txt', line + '\n');
        }
    }

    fs.writeFileSync('accounts_report.json', JSON.stringify(report, null, 2));
    console.log(`\nFull report saved to accounts_report.json`);
}

checkAccounts();
