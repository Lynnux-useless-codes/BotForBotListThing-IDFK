module.exports = {
    code: `
$c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[role;$option[staff-role]]
    $let[publiclog;$option[public-log]]
    $let[stafflog;$option[staff-log]]
    $let[commandlog;$option[command-log]]
    $let[enabled;$option[system-enabled]]

$c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$hasPerms[$guildID;$authorID;Administrator];$getVar[errorAdminOnly;default]]
    $onlyIf[$math[$if[$option[staff-role]!=;1;0]+$if[$option[public-log]!=;1;0]+$if[$option[staff-log]!=;1;0]+$if[$option[system-enabled]!=;1;0]]>0;$getVar[errorAtleastOneOption;default]]

$c[-----------------------------------MAIN-----------------------------------]
    $ephemeral
    $color[$getVar[color;default]]
    $title[Settings Changed:]
    $thumbnail[$serverIcon[$guildID]]
    $addField[The following settings has been changed:;$if[$get[commandlog]==;;CommandLog changed from \`$getVar[BotGetChannel;default]\` to \`$get[commandlog]\`.]\n$if[$get[role]==;;StaffRole changed from \`$getVar[staffRole;default]\` to \`$get[role]\`.]\n$if[$get[publiclog]==;;PublicLog changed from \`$getVar[BotLogChannel;default]\` to \`$get[publiclog]\`.]\n$if[$get[stafflog]==;;StaffLog changed from \`$getVar[BotStaffChannel;default]\` to \`$get[stafflog]\`.]\n$if[$get[enabled]==;;SystemEnabled changed from \`$getVar[enabled;default]\` to \`$get[enabled]\`.]]

    $if[$option[staff-role]==;;$setVar[staffRole;default;$option[staff-role]]]
    $if[$option[public-log]==;;$setVar[BotLogChannel;default;$option[public-log]]]
    $if[$option[staff-log]==;;$setVar[BotStaffChannel;default;$option[staff-log]]]
    $if[$option[command-log]==;;$setVar[BotGetChannel;default;$option[command-log]]]
    $if[$option[system-enabled]==;;$setVar[enabled;default;$option[system-enabled]]]

$c[----------------------------SLASH-COMPONENTS------------------------------]
    `,
    data: {
        "name": "config",
        "description": "STAFF ONLY! ~ Change the bot settings.",
        "options": [
            {
                "type": 8,
                "name": "staff-role",
                "description": "The role that can review bots."
            },
            {
                "type": 7,
                "name": "public-log",
                "description": "The log that everyone can see."
            },
            {
                "type": 7,
                "name": "staff-log",
                "description": "The log that only staff can see to review."
            },
            {
                "type": 7,
                "name": "command-log",
                "description": "The log that is used for commands only. (channels will be put under this channel.)"
            },
            {
                "type": 5,
                "name": "system-enabled",
                "description": "To enable or disable the bot system. (true = enable | false = disable)"
            }
        ]
    }
}