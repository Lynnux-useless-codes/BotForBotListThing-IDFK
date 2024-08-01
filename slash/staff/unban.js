module.exports = {
    code: `
    $c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[user;$option[user]]

    $c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$hasRoles[$guildID;$authorID;$getVar[staffRole;default]]==true;$getVar[errorKickOnly;default]]
    $onlyIf[$getVar[botBanned;$get[user]]==true;$getVar[errorNotBanned;default]]

    $c[-----------------------------------MAIN-----------------------------------]

    $switch[$isBot[$get[user]];

        $case[true;
            $title[Bot unbanned!]
            $thumbnail[$userAvatar[$get[user]]]
            $color[$getVar[color;default]]
            $description[<@$get[user]> has been unbanned by <@$authorID> and can be added again.]

            $sendMessage[$getVar[BotStaffChannel;default];
                $title[Bot unbanned!]
                $thumbnail[$userAvatar[$get[user]]]
                $color[$getVar[color;default]]
                $description[<@$get[user]> has been unbanned by <@$authorID> and can be added again.]
            ]
            $deleteVar[botBanned;$getVar[user]]
        ]

        $case[false;
            $title[User unbanned!]
            $thumbnail[$userAvatar[$get[user]]]
            $color[$getVar[color;default]]
            $description[<@$get[user]> has been unbanned by <@$authorID> and can now add bots again.]

            $sendMessage[$getVar[BotStaffChannel;default];
                $title[User unbanned!]
                $thumbnail[$userAvatar[$get[user]]]
                $color[$getVar[color;default]]
                $description[<@$get[user]> has been unbanned by <@$authorID> and can now add bots again.]
            ]
            $deleteVar[botBanned;$getVar[user]]
        ]

        $case[default;$ephemeral $description[<:Error:1267450232593973338> Something went wrong, try again later. If this error persists please contact @dark-lynn.] $color[#d50056]]

    ]

    $c[----------------------------SLASH-COMPONENTS------------------------------]
    `,
    data: {
        "name": "unban",
        "description": "STAFF ONLY! ~ Unban a user/bot so they can add bots/ be adding.",
        "options": [
            {
                "type": 6,
                "name": "user",
                "description": "Which user? can be both or member.",
                "required": true
            }
        ]
    }
}