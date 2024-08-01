module.exports = {
    code: `
$c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[bot;$option[bot-id]]
    $let[prefix;$option[prefix]]
    $let[description;$if[$option[description]==;N/A;$option[description]]]
    $let[codev;$if[$option[co-dev]==;N/A;$option[co-dev]]]
    $let[libary;$if[$option[libary]==;N/A;$option[libary]]]

$c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$getVar[enabled;default]==true;]
    $onlyIf[$userExists[$get[bot]]==true;$GetVar[UserDoesntExist;default]]
    $onlyIf[$isBot[$get[bot]]==true;$getVar[ErrorNoBot;default]]
    $onlyIf[$getVar[botAdded;$get[bot]]!=true;$getVar[ErrorBotAlreadyAdded;default]]
    $onlyIf[$getVar[botBanned;$get[bot]]!=true;$getVar[ErrorBotBanned;default]]
    $onlyIf[$getVar[botBanned;$get[author]]!=true;$getVar[ErrorUserBanned;default]]
    $onlyIf[$getVar[botAwaiting;$get[bot]]!=true;$getVar[ErrorBotAlreadyAwaiting;default]]
    $onlyIf[$getVar[botAwaiting;$get[author]]==;$getVar[ErrorUserAlreadyAwaiting;default]]

$c[-----------------------------------MAIN-----------------------------------]

    $sendMessage[$getVar[BotLogChannel;default];
        $title[New bot request!]
        $description[<@$get[author]>'s bot @$username[$get[bot]] is awaiting approval.]
        $color[$getVar[color;default]]
    ]
    
    $sendMessage[$getVar[BotStaffChannel;default];
        $title[New bot request!]
        $thumbnail[$userAvatar[$get[bot]]]
        $if[$get[description]!=;$description[$get[description]];]
        $addField[Bot Info:;<@$get[bot]> ~ $get[bot]\n**Invite:** [Click\\](https://discord.com/api/oauth2/authorize?client_id=$get[bot]&permissions=0&scope=bot)\n**Prefix:** \`$get[prefix]\`$if[$get[libary]!=;\n**Libary:** \`$get[libary]\`;];true]
        $addField[Dev's:;<@$get[author]>$if[$get[codev]!=N/A;, <@$get[codev]>;];true]
        $color[$getVar[color;default]]
        $addActionRow
        $addButton[approve-=!=~$get[bot]-=!=~$get[author]-=!=~$get[codev];Approve;Success]
        $addButton[decline-=!=~$get[bot]-=!=~$get[author]-=!=~$get[codev];Decline;Danger]
    ]

    $ephemeral 
    $title[Awaiting approval]
    $description[<:Check:1267447929015373914> **@$username[$get[author]]**, Your bot <@$get[bot]> is waiting approval from the staff team.]
    $color[$getVar[color;default]]

    $setVar[botAwaiting;$get[bot];true]
    $setVar[botAwaiting;$get[author];$get[bot]]
    $setVar[botPrefix;$get[bot];$get[prefix]]
    $setVar[botDescription;$get[bot];$get[description]]
    $setVar[botLibary;$get[bot];$get[libary]]
    $setVar[botDev;$get[bot];$get[author]]
    
$c[-----------------------------------CODE-----------------------------------]
$c[author = \`$get[author]\`\nbotID = \`$get[bot]\`\nPrefix = \`$get[prefix]\`\nDescription = \`$get[description]\`\nCo-Dev = \`$get[codev]\`\nLibary = \`$get[libary]\`]

$c[----------------------------SLASH-COMPONENTS------------------------------]
    `,
    data: {
        "name": "add",
        "description": "Request to add your bot to the server",
        "options": [
            {
                "type": 3,
                "name": "bot-id",
                "description": "Please Provide the ID of your bot.",
                "required": true
            },
            {
                "type": 3,
                "name": "prefix",
                "description": "The prefix your bot uses (if its slash commands use \"/\" ).",
                "required": true
            },
            {
                "type": 3,
                "name": "description",
                "description": "A short description about what your bot does."
            },
            {
                "type": 3,
                "name": "libary",
                "description": "What Libary/Package does this bot use?",
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
                        "name": "discord.js ",
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
            }
        ]
    }
      
}