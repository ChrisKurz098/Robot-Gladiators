var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//you can also log multiple vars at once

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;


var fight = function (enemyName) {

    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP") {
            //ask if sure
            var confirmSkip = window.confirm("Are you sure you want to quit?")
            //if yes then quit
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! Goodbye!");
                playerMoney = playerMoney - 10;
                console.log("playerMoney", playerMoney);
                break;
            } //if no (false) restart game 
        }
        if (promptFight === "fight" || promptFight === "FIGHT") {
            //BATTLE BEGINS
            enemyHealth = enemyHealth - playerAttack;
            //log result
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            // check enemy's health
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                break; //exit out of while loop
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");

            };

            //Subtract the value of `playerAttack` from the value of `enemyHealth` and use that result to update the value in the `enemyHealth` variable
            playerHealth = playerHealth - enemyAttack;
            //log result
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            // check player's health
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            };
        }



    }
};

for (var i = 0; i < enemyNames.length; i++) {

    var pickedEnemyName = enemyNames[i]; //this is for semantic purposes
    enemyHealth = 50;
    fight(pickedEnemyName);
}