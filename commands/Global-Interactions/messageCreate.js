module.exports = {
    type: "messageCreate",
    code: `
        $onlyIf[$channelCategoryID==$getVar[BotGetCategory;default];]
        $onlyIf[$getVar[channelLastActive;$channelID]!=;]

        $c[$sendMessage[$channelID;<t:$math[$round[$math[$getTimestamp/1000]]+86400]:R>]]

        $setVar[channelLastActive;$channelID;$round[$math[$getTimestamp/1000]]]
        $setVar[channelDeleteIn;$channelID;$math[$round[$math[$getTimestamp/1000]]+86400]]
    `
}