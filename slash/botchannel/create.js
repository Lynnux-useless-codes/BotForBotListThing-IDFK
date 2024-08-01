module.exports = {
  code: `
  $c[------------------------------------LET-----------------------------------]
    $let[author;$authorID]
    $let[bot;$option[bot]]
    $let[currentTime;$if[$djsEval[ctx.channel.defaultAutoArchiveDuration]==undefined;4320;$djsEval[ctx.channel.defaultAutoArchiveDuration]]]
    $let[category;$getVar[BotGetCategory;default]]
    
  $c[----------------------------------ONLY-IF---------------------------------]
    $onlyIf[$getVar[enabled;default]==true;]
    $onlyIf[$channelID==$getVar[BotGetChannel;default];$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> This command has to be run in the <#$getVar[BotGetChannel;default]>.]]
    $onlyIf[$userExists[$get[bot]]==true;$GetVar[UserDoesntExist;default]]
    $onlyIf[$getVar[botDev;$get[bot]]==$authorID;$getVar[errorNotYourBot;default]]
    $onlyIf[$getVar[botBanned;$get[bot]]!=true;$getVar[ErrorBotBanned;default]]
    $onlyIf[$getVar[botBanned;$get[author]]!=true;$getVar[ErrorUserBanned;default]]
    $onlyIf[$isBot[$get[bot]]==true;$getVar[ErrorNoBot;default]]
    $onlyIf[$getVar[botAdded;$get[bot]]==true;$getVar[ErrorBotNotAdded;default]]
    $onlyIf[$getVar[hasThread;$get[bot]]==;$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> Your bot already has a dedicated channel <#$getVar[hasThread;$get[bot]]>.]]
    
  $c[-----------------------------------MAIN-----------------------------------]
    $if[$get[currentTime]==1440;;$!setChannelArchiveDuration[$channelID;OneDay;Changed Default archive time to 1 day]]

    $let[message;$sendMessage[$channelID;$color[$getVar[color;default]]$description[<@$get[author]> created a thread for <@$get[bot]>.]$footer[These threads close after 24h of inactivity.]]]
    $let[channel;$createThread[$channelID;$username ~ $username[$get[bot]];$get[message];true;Created by @$username for their bot @$username[$get[bot]].]]

$c[REMOVE THIS C TO USE Channels;
    $let[channel;$createChannel[$guildID;$username[$get[author]] ~ $userName[$get[bot]];GuildText;Private space for @$username to play around with @$userName[$get[bot]];$get[category]]]
    <@$get[author]>'s channel for <@$get[bot]> has been made. "<#$get[channel]>"

    $!modifyChannelPerms[$get[channel];$get[bot];+ViewChannel]
    $!modifyChannelPerms[$get[channel];$getVar[staffRole;default];+ViewChannel]
    $!modifyChannelPerms[$get[channel];$get[author];+ViewChannel]
    $!modifyChannelPerms[$get[channel];$guildID;-ViewChannel;+AddReactions;+SendMessages;+SendTTSMessages;+ManageMessages;+EmbedLinks;+AttachFiles;+ReadMessageHistory;+UseExternalEmojis;+UseApplicationCommands;+UseExternalStickers;+SendPolls]
]
    $let[ping;$sendMessage[$get[channel];<@$get[author]>, <@$get[bot]> \nThis channel will be deleted after 24h of inactivity.;true]]
    $!sendMessage[$getVar[BotStaffChannel;default];$color[$getVar[color;default]] $title[New Thread Started] $description[**User:** <@$get[author]>\n**Bot:** <@$get[bot]>\n**Channel:** <#$get[channel]>] $timestamp]
    $ephemeral
    \nYour channel for <@$get[bot]> has been made. "<#$get[channel]>"
    $setVar[hasThread;$get[bot];$get[channel]]
    $setVar[hasThread;$get[channel];$get[bot]]

    $setVar[channelLastActive;$get[channel];$round[$math[$getTimestamp/1000]]]
    $setVar[channelDeleteIn;$get[channel];$math[$round[$math[$getTimestamp/1000]]+86400]]
  $c[-----------------------------------SLASH----------------------------------]
  `,
  data: {
    "name": "create",
    "description": "Create a channel for your bot.",
    "options": [
      {
        "type": 6,
        "name": "bot",
        "description": "Please Provide the ID of your bot.",
        "required": true
      }
    ]
  }  
}