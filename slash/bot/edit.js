module.exports = {
    code: `
$c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[bot;$option[bot]]
    $let[libary;$option[libary]]
    $let[prefix;$option[prefix]]
    $let[perm;$option[invite]]
    $let[description;$option[description]]

$c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$getVar[enabled;default]==true;]
    $onlyIf[$isBot[$get[bot]]==true;$getVar[ErrorNoBot;default]]
    $onlyIf[$getVar[botAdded;$get[bot]]!=;$getVar[errorBotNotAdded;default]]
    $onlyIf[$getVar[botDev;$get[bot]]==$authorID;$getVar[errorNotYourBot;default]]
    $onlyIf[$math[$if[$option[libary]!=;1;0]+$if[$option[prefix]!=;1;0]+$if[$option[invite]!=;1;0]+$if[$option[description]!=;1;0]]>0;$getVar[errorAtleastOneOption;default]]

$c[-----------------------------------MAIN-----------------------------------]
    $sendMessage[$getVar[BotStaffChannel;default];
        $description[**Bot <@$get[bot]> Changed by <@$authorID>**]
        $color[$getVar[color;default]]
        $addField[The following info has been changed:;$if[$option[libary]==;;Libary changed from \`$getVar[botLibary;$get[bot]]\` to \`$option[libary]\`]$if[$option[prefix]==;;\nPrefix changed from \`$getVar[botPrefix;$get[bot]]\` to \`$option[prefix]\`]$if[$option[invite]==;;\nInvite changed from \`$getVar[botRecommandedPerms;$get[bot]]\` to \`$option[invite]\`]$if[$option[description]==;;\ndescription changed from \n\`\`\`$getVar[botDescription;$get[bot]]\`\`\`\nto\`\`\`$option[description]\`\`\`]]
        $thumbnail[$userAvatar[$get[bot]]]
    ]

    $ephemeral
    $title[Bot Changed: @$username[$get[bot]]]
    $color[$getVar[color;default]]
    $addField[The following info has been changed:;$if[$option[libary]==;;Libary changed from \`$getVar[botLibary;$get[bot]]\` to \`$option[libary]\`]$if[$option[prefix]==;;\nPrefix changed from \`$getVar[botPrefix;$get[bot]]\` to \`$option[prefix]\`]$if[$option[invite]==;;\nInvite changed from \`$getVar[botRecommandedPerms;$get[bot]]\` to \`$option[invite]\`]$if[$option[description]==;;\ndescription changed from \n\`\`\`$getVar[botDescription;$get[bot]]\`\`\`\nto\`\`\`$option[description]\`\`\`]]
    $thumbnail[$userAvatar[$get[bot]]]
    
    $if[$option[libary]==;;$setVar[botLibary;$get[bot];$option[libary]]]
    $if[$option[prefix]==;;$setVar[botPrefix;$get[bot];$option[prefix]]]
    $if[$option[invite]==;;$setVar[botRecommandedPerms;$get[bot];$option[invite]]]
    $if[$option[description]==;;$setVar[botDescription;$get[bot];$option[description]]]

$c[----------------------------SLASH-COMPONENTS------------------------------]
    `,
    data: {
        "name": "edit",
        "description": "Edit your own bot config",
        "options": [
            {
                "type": 6,
                "name": "bot",
                "description": "What bot do you want to edit?",
                "required": true
            },
            {
                "type": 3,
                "name": "libary",
                "description": "To what do you want to edit the libary?",
                "choices": [
                    {
                        "name": "discord.py",
                        "value": "discordpy"
                    },
                    {
                        "name": "BDFD",
                        "value": "bdfd"
                    },
                    {
                        "name": "ForgeScript",
                        "value": "forgescript"
                    },
                    {
                        "name": "AOI.js",
                        "value": "aoijs"
                    },
                    {
                        "name": "discord.php",
                        "value": "discordphp"
                    },
                    {
                        "name": "DSharpPlus",
                        "value": "dsharpplus"
                    },
                    {
                        "name": "D++",
                        "value": "dplusplus"
                    },
                    {
                        "name": "DiscordGo",
                        "value": "discordgo"
                    },
                    {
                        "name": "JavaCord",
                        "value": "javacord"
                    },
                    {
                        "name": "Discordia",
                        "value": "discordia"
                    },
                    {
                        "name": "discord.js",
                        "value": "discordjs"
                    },
                    {
                        "name": "Nextcord",
                        "value": "nextcord"
                    },
                    {
                        "name": "DiscordRB",
                        "value": "discordrb"
                    },
                    {
                        "name": "Serenity",
                        "value": "serenity"
                    },
                    {
                        "name": "Other",
                        "value": "other"
                    }
                ]
            },
            {
                "type": 3,
                "name": "description",
                "description": "To what do you want to change the description."
            },
            {
                "type": 3,
                "name": "prefix",
                "description": "prefix"
            },
            {
                "type": 4,
                "name": "invite",
                "description": "The recommanded perms for inviting the bot. (number)"
            }
        ]
    }
}