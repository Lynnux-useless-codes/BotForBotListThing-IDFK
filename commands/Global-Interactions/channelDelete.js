module.exports = {
    type: "channelDelete",
    code: `
        $onlyIf[$channelCategoryID==$getVar[BotGetCategory;default];]
        $onlyIf[$getVar[channelLastActive;$channelID]!=;]

        $logger[Info;@$username[$clientID]  | Deleted Variables for #$channelName[$channelID] due to inactivity.]

        $deleteVar[channelLastActive;$channelID]
        $deleteVar[channelDeleteIn;$channelID]

    `
}
