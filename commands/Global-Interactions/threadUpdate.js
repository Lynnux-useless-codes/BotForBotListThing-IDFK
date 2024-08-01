module.exports = {
    type: "threadUpdate",
    code: `
    $let[channel;$channelID]

    $onlyIf[$threadIsArchived[$get[channel]]==true;]
    $onlyIf[$getVar[hasThread;$channelID]!=;]
    $deleteThread[$get[channel];Deleted due to inactivity.]

    $log[$log[$get[channel] deleted]]
    `
}