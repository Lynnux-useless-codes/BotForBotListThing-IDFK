module.exports = {
    code: `
    $c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[user;$option[user]]
    $let[reason;$option[reason]]

    $c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$hasRoles[$guildID;$authorID;$getVar[staffRole;default]]==true;$getVar[errorKickOnly;default]]

    $c[-----------------------------------MAIN-----------------------------------]

    $switch[$isBot[$get[user]];

        $case[true;
            $title[Bot banned!]
            $thumbnail[$userAvatar[$get[user]]]
            $color[$getVar[color;default]]
            $description[<@$get[user]> has been banned from being added by <@$authorID>.\nReason:\`\`\`\n$get[reason]\n\`\`\`]

            $sendMessage[$getVar[BotStaffChannel;default];
                $title[Bot banned!]
                $thumbnail[$userAvatar[$get[user]]]
                $color[$getVar[color;default]]
                $description[<@$get[user]> has been banned from being added by <@$authorID>.\nReason:\`\`\`\n$get[reason]\n\`\`\`]
            ]

            $setVar[botBanned;$getVar[user];true]
        ]

        $case[false;
            $title[User banned!]
            $thumbnail[$userAvatar[$get[user]]]
            $color[$getVar[color;default]]
            $description[<@$get[user]> has been banned from adding bots by <@$authorID>.\nReason:\`\`\`\n$get[reason]\n\`\`\`]

            $sendMessage[$getVar[BotStaffChannel;default];
                $title[User banned!]
                $thumbnail[$userAvatar[$get[user]]]
                $color[$getVar[color;default]]
                $description[<@$get[user]> has been banned from adding bots by <@$authorID>.\nReason:\`\`\`\n$get[reason]\n\`\`\`]
            ]
            
            $setVar[botBanned;$getVar[user];true]
        ]

        $case[default;$ephemeral $description[<:Error:1267450232593973338> Something went wrong, try again later. If this error persists please contact @dark-lynn.] $color[#d50056]]
    
    ]

    $c[----------------------------SLASH-COMPONENTS------------------------------]
    `,

    data: {
        "name": "ban",
        "description": "STAFF ONLY! ~Ban a user/bot from ever being added/adding.",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "Which user? can be both or member.",
                "required": true
            },
            {
                "type": 3,
                "name": "reason",
                "description": "OPTIONAL: Reason why the ban."
            }
        ]
    }
}