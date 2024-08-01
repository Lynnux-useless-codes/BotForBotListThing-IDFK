module.exports = ({
    name: "update",
    aliases: ["reload", "updatecommands"],
    type: "messageCreate",
    code: `
        $onlyForUsers[;705306248538488947;392609934744748032]

        $let[count;$commandCount]
        $updateCommands $updateApplicationCommands
        $let[add;$sub[$commandCount;$get[count]]]
 
        $color[ff47ff]
        $description[Successfully update all commands.]

        $addActionRow
        $addButton[1;Added: $get[add];Success;✔️]
        $addButton[2;Total: $commandCount;Secondary;📃]
`})