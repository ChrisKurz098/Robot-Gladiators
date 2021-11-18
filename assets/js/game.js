console.log("SOMETHING SHOULD APPEAR HERE");

var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

//you can also log multiple vars at once

var enemyNames = ["Roborto", "Amy Android", "Robo Trumble"];
var enemyHealth = 50;
var enemyAttack = 12;

///////////////////////////////////////////////////
///////////////////Fight Function//////////////////
//////////////////////////////////////////////////
var fight = function (enemyName) {
    ////////////Fight or Skip//////////////////
    while (enemyHealth > 0 && playerHealth > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP") {
            //ask if sure
            var confirmSkip = window.confirm("Are you sure you want to quit?")
            //if yes then quit
            if (confirmSkip) {
                window.alert(playerName + " has chosen to skip the fight! Goodbye!");
                playerMoney = Math.max(0,playerMoney - 10);
                console.log("playerMoney", playerMoney);
                break;
            } //if no (false) restart game 
        }
        ///////////////Init Fight////////////////////
        if (promptFight === "fight" || promptFight === "FIGHT") {
            //////////////Player Attacks/////////////////
            var damage = randomNumber(playerAttack-3,playerAttack);
            enemyHealth = Math.max(0,enemyHealth - damage);
            //log result
            console.log(playerName + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining.");

            ///// check enemy's health////
            if (enemyHealth <= 0) {
                window.alert(enemyName + " has died!");
                break; //exit out of while loop
            }
            else {
                window.alert(enemyName + " still has " + enemyHealth + " health left.");

            };

            /////////////Enemy Attacks///////////////
            var damage = randomNumber(enemyAttack-3, enemyAttack);
            playerHealth = Math.max(0,playerHealth - damage);
            //log result
            console.log(enemyName + " attacked " + playerName + ". " + playerName + " now has " + playerHealth + " health remaining.");

            /////// check player's health/////
            if (playerHealth <= 0) {
                window.alert(playerName + " has died!");
                break;
            }
            else {
                window.alert(playerName + " still has " + playerHealth + " health left.");
            }
        }



    }
};

/////////////////////////////////////////////////////
////////////Loop to initiate battles/////////////////
////////////////////////////////////////////////////
var startGame = function () {

    //Reset player and enemy starts for new game
    // reset player stats
    playerHealth = 100;
    playerAttack = 10;
    playerMoney = 10;

    /////////////Begin Game Loop/////////////
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerHealth > 0) {//needed because this message will be looped after the player dies otherwise
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyName = enemyNames[i]; //this is for semantic purposes

            enemyHealth = randomNumber(40,60);

            //pass pickedEnemyName to function fight()
            fight(pickedEnemyName);
            ////Shop Call AFTER each battle////
            //If there's still an enemy left to fight
            if (playerHealth > 0 && i < enemyNames.length - 1) {
                var storeConfirm = window.confirm('The fight is over! Visit the shop before the next round?')

                if (storeConfirm) {
                    shop();
                }
                //start FOR loop over for next round
            }
            else {
                window.alert('You have lost your robot in battle! Game Over!')
                break;
            }
        }
        //play again
        endGame();
    }

}
/////////////////////////////////
///////////End  Game/////////////
////////////////////////////////
var endGame = function () {
    ///if player still alive
    if (playerHealth > 0) {
        window.alert("Great Job, you've survived the game! You now have a score");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }
    /////Play Again?/////
    var playAgainConfirm = window.confirm('Would you like to play again?');

    if (playAgainConfirm) {
        startGame();
    } else {
        window.alert("Thanks for playing Robot Gladiators! Come Back Soon!");
    }
}
//////////////////////////////////
////////////Shop Function////////
////////////////////////////////
var shop = function () {

    console.log('You have entered the Robo-Shop');
    window.alert("Entering Shop...");

    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");

    switch (shopOptionPrompt) {
        case "REFILL":
        case "refill":
            if (playerMoney >= 7) {
                window.alert("Refilling players health by 20 for 7 dollars");
                playerHealth += 6;
                playerMoney -= 7;

            }
            else { window.alert('You dont have enough money') }
            break;

        case "UPGRADE":
        case "upgrade":
            if (playerMoney >= 7) {
                window.alert("Upgrading player's attack by 6 for 7 dollars.");

                playerAttack += 6;
                playerMoney -= 7;
            }
            else {
                window.alert("You dont have enough money.");
            }

            break;

        case "LEAVE":
        case "leave":
            window.alert('Leaving store...');
            break;

        default:
            window.alert('You did not pick a valid option. Try again.');
            shop();
            break;
    }
    //goes back to game loop
}
//////////////////////////////
//////RandomNumber Gen////////
/////////////////////////////
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() *(max-min+1)+min);
  
    return value;
  };

////This initiates the game
startGame();