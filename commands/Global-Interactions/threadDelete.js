module.exports = {
    type: "threadDelete",
    code: `
    $let[channel;$channelID]
    $let[bot;$getVar[hasThread;$channelID]]
    $let[author;$getVar[botDev;$getVar[hasThread;$channelID]]]

    $onlyIf[$getVar[hasThread;$channelID]!=;]
    $!sendMessage[$getVar[BotStaffChannel;default];$color[$getVar[color;default]] $title[Thread closed] $description[**User:** <@$get[author]>\n**Bot:** <@$get[bot]>\n**Channel:** #$channelName[$get[channel]]] $addTimestamp]

    $deleteVar[hasThread;$get[bot]]
    $deleteVar[hasThread;$get[channel]]


    $c[$log[deleted $get[channel] from $username[$get[bot]]]]
    `
}