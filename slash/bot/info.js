module.exports = {
    code: `
$c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[bot;$option[bot]]

$c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$getVar[enabled;default]==true;]
    $onlyIf[$isBot[$get[bot]]==true;$getVar[ErrorNoBot;default]]
    $onlyIf[$getVar[botAdded;$get[bot]]!=;$getVar[errorBotNotAdded;default]]

$c[-----------------------------------MAIN-----------------------------------]
    $ephemeral
    $title[BotInfo: @$username[$get[bot]]]
    $color[$getVar[color;default]]
    $if[$getVar[botDescription;$get[bot]]==N/A;;$description[$getVar[botDescription;$get[bot]]]]
    $thumbnail[$userAvatar[$get[bot]]]
    $addField[Bot Info:;**Prefix:** \`$getVar[botPrefix;$get[bot]]\`\n**Deloped by:** <@$getVar[botDev;$get[bot]]>\n**Libary:** \`$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$replace[$getVar[botLibary;$get[bot]];bdfd;BDFD;1];forgescript;ForgeScript;1];discordpy;Discord.py;1];aoijs;AOI.js;1];discordphp;Discord.php;1];dsharpplus;DSharpPlus;1];dplusplus;D++;1];discordgo;DiscordGo;1];javacord;JavaCord;1];discordia;Discordia;1];discordjs;Discord.JS;1];nextcord;NextCord;1];discordrb;DiscordRB;1];serenity;Serenity;1];other;Other;1]\`\n**Invite Link:** \n[[No-Perms\\](https://discord.com/api/oauth2/authorize?client_id=$get[bot]&permissions=0&scope=bot)\\]$if[$getVar[botRecommandedPerms;$get[bot]]!=0; | [[$if[$getVar[botRecommandedPerms;$get[bot]]!=8;Recommanded;Admin]\\](https://discord.com/api/oauth2/authorize?client_id=$get[bot]&permissions=$getVar[botRecommandedPerms;$get[bot]]&scope=bot)\\];];true]
    $addField[** **;**Added on:** <t:$round[$math[$getVar[botAddedDate;$get[bot]]/1000]]:D>.\n**Approved By:** <@$getVar[botAddedBy;$get[bot]]>.;true]

$c[-----------------------------------CODE-----------------------------------]

$c[----------------------------SLASH-COMPONENTS------------------------------]
    `,
    data: {
        "name": "info",
        "description": "Check the info on a bot.",
        "options": [
            {
                "type": 6,
                "name": "bot",
                "description": "What bot do you want to see info on?",
                "required": true
            }
        ]
    }
      
}