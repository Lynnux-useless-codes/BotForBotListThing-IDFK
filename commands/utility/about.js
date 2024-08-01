module.exports = ({
    name: "about",
    aliases: ["info", "information"],
    type: "messageCreate",
    code: `
    $c[-----------------------------------MAIN-----------------------------------]
        $reply[$channelID;$messageID]
        $if[$guildID!=;$let[DefaultMessage;$messageID];$let[DefaultMessage;NaN]]
        $thumbnail[$userAvatar[$botID;2048;webp]]
        $color[$getVar[color;default]]
        $title[❯ $username[$clientID] information:]
        $addField[❯ Build;'V1.0.0';true]
        $addField[❯ Developer;@dark-lynn;true]
        $addField[❯ Dev Website;[[Click Me\\](https://lynnux.xyz/)\\];true]
        $description[This bot is made for XelaRelam Community by [Lynnux\\](https://discord.com/users/705306248538488947).]
    `})