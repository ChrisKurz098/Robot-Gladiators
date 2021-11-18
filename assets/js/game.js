console.log("SOMETHING SHOULD APPEAR HERE");





///////////////////////////////////////////////////
///////////////////Fight Function//////////////////
//////////////////////////////////////////////////
var fight = function (enemy) {
    ////////////Fight or Skip//////////////////
    while (enemy.health > 0 && playerInfo.health > 0) {
        var promptFight = window.prompt("Would you like to FIGHT or SKIP this battle? Enter 'FIGHT' or 'SKIP' to choose.");
        if (promptFight === "skip" || promptFight === "SKIP") {
            //ask if sure
            var confirmSkip = window.confirm("Are you sure you want to quit?")
            //if yes then quit
            if (confirmSkip) {
                window.alert(playerInfo.name + " has chosen to skip the fight! Goodbye!");
                playerInfo.money = Math.max(0, playerInfo.money - 10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            } //if no (false) restart game 
        }
        ///////////////Init Fight////////////////////
        if (promptFight === "fight" || promptFight === "FIGHT") {
            //////////////Player Attacks/////////////////
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            //log result
            console.log(playerInfo.name + " attacked " + enemy.name + ". " + enemy.name + " now has " + enemy.health + " health remaining.");

            ///// check enemy's health////
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                break; //exit out of while loop
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");

            };

            /////////////Enemy Attacks///////////////
            var damage = randomNumber(enemy.attack - 3, enemy.attack);
            playerInfo.health = Math.max(0, playerInfo.health - damage);
            //log result
            console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

            /////// check player's health/////
            if (playerInfo.health <= 0) {
                window.alert(playerInfo.name + " has died!");
                break;
            }
            else {
                window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
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
    playerInfo.reset();

    /////////////Begin Game Loop/////////////
    for (var i = 0; i < enemyInfo.length; i++) {
        if (playerInfo.health > 0) {//needed because this message will be looped after the player dies otherwise
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));
            var pickedEnemyObj = enemyInfo[i]; //this is for semantic purposes

            pickedEnemyObj.health = randomNumber(40, 60);

            //pass pickedenemy.name to function fight()
            fight(pickedEnemyObj);
            ////Shop Call AFTER each battle////
            //If there's still an enemy left to fight
            if (playerInfo.health > 0 && i < enemyInfo.length - 1) {
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

    }
    endGame();

}
/////////////////////////////////
///////////End  Game/////////////
////////////////////////////////
var endGame = function () {
    ///if player still alive
    if (playerInfo.health > 0) {
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
            playerInfo.refillHealth();
            break;

        case "UPGRADE":
        case "upgrade":
                playerInfo.upgradeAttack();
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
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

///player object///
var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
    reset: function () {
        this.health = 100;
        this.money = 10;
        this.attack = 10;
    },
    refillHealth: function () {
        if (this.money >= 7) {
            window.alert("Refilling player's health by 20 for 7 dollars.");
            this.health += 20;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
    }, // comma!
    upgradeAttack: function () {
        if (this.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");
            this.attack += 6;
            this.money -= 7;
          } 
          else {
            window.alert("You don't have enough money!");
          }
    }
};


//you can also log multiple vars at once
var enemyInfo = [
    {
        name: "Roborto",
        attack: randomNumber(10, 14)
    },
    {
        name: "Amy Android",
        attack: randomNumber(10, 14)
    },
    {
        name: "Robo Trumble",
        attack: randomNumber(10, 14)
    }
];

////This initiates the game
startGame();