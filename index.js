const token = require("./handler/token.js");
const events = require("./handler/events.js");
const intents = require("./handler/intents.js");

const { ForgeDB } = require("@tryforge/forge.db")             // https://github.com/tryforge/ForgeDB/tree/dev
const { ForgeClient } = require("@tryforge/forgescript")      // https://github.com/tryforge/ForgeScript/tree/dev

const client = new ForgeClient({
    "events": events,
    "intents": intents,
    "useInviteSystem": false,
    "prefixes": [
        "$if[$getVar[prefix;$try[$guildID;738381353921544282]]!=;$getVar[prefix;$try[$guildID;738381353921544282]];!]",
        "<@!$clientID>",
        "<@$clientID>"
    ],
    "extensions": [
        new ForgeDB(), 
    ]
})
   
// Load the commands
   client.commands.load("commands")
   client.applicationCommands.load("slash")

///////////////////////////////
//   [    Variables     ]    //
///////////////////////////////

ForgeDB.variables({
    prefix: "!",
    color: "#efe7ee",
    staffRole: "1267479790001066056",
    enabled: "true",
    botBanned: "false",
    //   [   Channels    ] 
    BotLogChannel: "1267435305573552261",       // Channel for Logs                         | Used for User Logs
    BotGetChannel: "1267435280126705664",       // Channel used for /botchannel create      | Used for general command usage
    BotStaffChannel: "1267435391905169458",     // Channel for staff logs.                  | Used for aproval/Decline.
    BotGetCategory: "1268124763365314571",      // Category where channels are created under| used for channel creation

    //   [   Errors    ] 
    ErrorNoBot: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You need to use a **botID**.]",
    UserDoesntExist: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> The ID you entered is not a valid botID.]",
    ErrorBotAlreadyAdded: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> The bot you provided is already approved by a staff member.]",
    ErrorBotAlreadyAwaiting: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> The bot you provided is already in the queue.]",
    ErrorBotBanned: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> The bot you provided has been banned from the bots system by a staff member.]",
    errorBotNotAdded: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> This bot has not been added.]",
    errorPermCannotBeAdmin: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You cannot change the recommanded invite perms to Admin.]",
    errorNotYourBot: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> This bot is not yours, you cannot do this action.]",
    errorAtleastOneOption: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You need to give atleast one option to edit.]",
    errorAdminOnly:"$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You need to be a reviewer to use this command.]",
    errorKickOnly:"$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You need to be a reviewer to use this command.]",
    errorNotBanned: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> This user/bot is not banned.]",
    ErrorUserBanned: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You are banned from the bots system by a staff member.]",
    ErrorUserAlreadyAwaiting: "$ephemeral $color[#d50056] $description[<:Error:1267450232593973338> You already have a bot in the queue,\nplease wait untill this bot is approved or declined before requesting another one.]",
})

///////////////////////////////
//  [     Commands      ]    //
///////////////////////////////

client.commands.add({
    type: "ready",
    code: `
        $setStatus[online;Watching;$userCount users]
        $logger[Info;@$username[$clientID]  | Bot Running With "$commandCount" Commands.]
    `
})

client.commands.add({
    type: "ready",
    code: `
    $loop[-1;
        $arrayCreate[channels;0]
        $arrayLoad[ids;, ;$channelIDs[, ]]
        $scope[
            $arrayForEach[ids;id;
                $if[$getVar[channelLastActive;$env[id]]!=;
                    $if[$getVar[channelLastActive;$env[id]]>=$getVar[channelDeleteIn;$env[id]];
                        $logger[Info;@$username[$clientID]  | Deleted private channel #$channelName[$env[id]] due to inactivity.]
                        $c[     $deleteChannels[$env[id]]   ]
                    ]
                ]        
            ]
        ]
        $wait[1h]
    ]`
})


///////////////////////////////
//  [   Client Login    ]    //
///////////////////////////////

client.login(`${token}`);
 