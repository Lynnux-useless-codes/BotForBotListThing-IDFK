module.exports = [{
    module: "Global-Interaction",
    type: "interactionCreate",
    code: `
    $textSplit[$customID;-=!=~]
    $c[
        $splitText[0] == decline / approve
        $splitText[1] == botID
        $splitText[2] == authorID
        $splitText[3] == codevID
        $splitText[4] == prefix
        $splitText[5] == libary
        $splitText[6] == description
    ]

    $let[bot;$splitText[1]]
    $let[author;$splitText[2]]
    $let[codev;$splitText[3]]
    $let[prefix;$splitText[4]]
    $let[libary;$splitText[5]]
    $let[description;$splitText[6]]

    $onlyIf[$hasRoles[$guildID;$authorID;$getVar[staffRole;default]]==true;$ephemeral \n<:Error:1267450232593973338> You cannot use this command!]

    $switch[$splitText[0];
        $case[approve;
            $interactionUpdate[
                $color[#34FF6F]
                $title[Bot Approved.]
                $thumbnail[$userAvatar[$get[bot]]]
                $description[**Approved by** <@$authorID> <t:$round[$math[$getTimestamp/1000]]:R>.]
                $addField[Bot Info:;<@$get[bot]> ~ $get[bot]\n**Invite:** [Click\\](https://discord.com/api/oauth2/authorize?client_id=$get[bot]&permissions=0&scope=bot);true]
                $addField[Dev's:;<@$get[author]>$if[$get[codev]!=N/A;, <@$get[codev]>;];true]
            ]
            $sendDM[$get[author];$color[#34FF6F] $title[Bot Approved!] $description[Your bot <@$get[bot]> has been approved by <@$authorID>.] $footer[This message has been send from $serverName[$guildID]]]
            $deleteVar[botAwaiting;$get[bot]]
            $deleteVar[botAwaiting;$get[author]]
            $setVar[botAdded;$get[bot];true]
            $setVar[botAddedDate;$get[bot];$getTimestamp]
            $setVar[botAddedBy;$get[bot];$authorID]
            $setVar[botRecommandedPerms;$get[bot];0]

            $setVar[userBots;$get[author];$if[$getVar[userBots;$get[author]]==;$get[bot];, $get[bot]]]

            $sendMessage[$getVar[BotLogChannel;default];
                \n<@$get[author]>
                $title[Bot Approved!]
                $description[<@$get[author]>'s bot @$username[$get[bot]] has been approved by <@$authorID>.]
                $color[#34FF6F]
            ]
        ]

        $case[decline;
            $interactionUpdate[
                $color[#d50056]
                $title[Bot Decline.]
                $thumbnail[$userAvatar[$get[bot]]]
                $description[**Declined by** <@$authorID> <t:$round[$math[$getTimestamp/1000]]:R>.]
                $addField[Bot Info:;<@$get[bot]> ~ $get[bot]\n**Invite:** [Click\\](https://discord.com/api/oauth2/authorize?client_id=$get[bot]&permissions=0&scope=bot);true]
                $addField[Dev's:;<@$get[author]>$if[$get[codev]!=N/A;, <@$get[codev]>;];true]
            ]
            $sendDM[$get[author];$color[#d50056] $title[Bot Declined!] $description[Your bot <@$get[bot]> has been declined by <@$authorID>.] $footer[This message has been send from $serverName[$guildID]]]
            $deleteVar[botAwaiting;$get[bot]]
            $deleteVar[botAwaiting;$get[author]]
            $deleteVar[botPrefix;$get[bot]]
            $deleteVar[botDescription;$get[bot]]


            $sendMessage[$getVar[BotLogChannel;default];
                \n<@$get[author]>
                $title[Bot Declined!]
                $description[<@$get[author]>'s bot @$username[$get[bot]] has been Declined by <@$authorID>.]
                $color[#d50056]
            ]
        ]
    ]
`}]