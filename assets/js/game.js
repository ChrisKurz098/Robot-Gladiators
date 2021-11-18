//////////////////////////////
//////RandomNumber Gen////////
/////////////////////////////
var randomNumber = function (min, max) {
    var value = Math.floor(Math.random() * (max - min + 1) + min);

    return value;
};

var fightOrSkip = function () {
    // ask player if they'd like to fight or skip using fightOrSkip function
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    // Conditional Recursive Function Call
    if (promptFight === "" || promptFight === null) {
        window.alert("You need to provide a valid answer! Please try again.");
        return fightOrSkip();
    }

    promptFight = promptFight.toLowerCase();

    // if player picks "skip" confirm and then stop the loop
    if (promptFight === "skip") {
        // confirm player wants to skip
        var confirmSkip = window.confirm("Are you sure you'd like to quit?");

        // if yes (true), leave fight
        if (confirmSkip) {
            window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
            // subtract money from playerMoney for skipping
            playerInfo.money = Math.max(0, playerInfo.money - 10);
            return true;
            
        }
    }
    return false
}

///////////////////////////////////////////////////
///////////////////Fight Function//////////////////
//////////////////////////////////////////////////
var fight = function (enemy) {
    var isPlayerTurn = true;

    if (Math.random() > 0.5) {
        isPlayerTurn = false;
    }
    ////////////Fight or Skip//////////////////
    while (enemy.health > 0 && playerInfo.health > 0) {

        ///////////////Init Fight////////////////////
        if (isPlayerTurn) {
            if (fightOrSkip()) {
                break;
            }

            //////////////Player Attacks/////////////////
            var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
            enemy.health = Math.max(0, enemy.health - damage);
            //log result
            console.log(playerInfo.name +
                 " attacked " + 
                 enemy.name + 
                 ". " + 
                 enemy.name + 
                 " now has " + 
                 enemy.health + 
                 " health remaining.");

            ///// check enemy's health////
            if (enemy.health <= 0) {
                window.alert(enemy.name + " has died!");
                playerInfo.money = playerInfo.money + 20;
                break; //exit out of while loop
            }
            else {
                window.alert(enemy.name + " still has " + enemy.health + " health left.");

            }
        }

        else
        {
        /////////////Enemy Attacks///////////////
        var damage = randomNumber(enemy.attack - 3, enemy.attack);
        playerInfo.health = Math.max(0, playerInfo.health - damage);
        //log result
        console.log(enemy.name + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining.");

        /////// check player's health/////
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            break;
        }else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }


    }
    isPlayerTurn = !isPlayerTurn;

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
        console.log(playerInfo);
        if (playerInfo.health > 0) {//needed because this message will be looped after the player dies otherwise
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1));




            var pickedEnemyObj = enemyInfo[i]; //this is for semantic purposes

            pickedEnemyObj.health = randomNumber(40, 60);
            console.log(pickedEnemyObj);
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
    window.alert("The game has now ended. Let's see how you did!");

    // check localStorage for high score, if it's not there, use 0
    var highScore = localStorage.getItem("highscore");
    //if highscore not set yet...
    if (highScore === null) {
      highScore = 0;
    }
   
    if (playerInfo.money > highScore) {
      localStorage.setItem("highscore", playerInfo.money);
      localStorage.setItem("name", playerInfo.name);
  
      alert(playerInfo.name + " now has the high score of " + playerInfo.money + "!");
    } 
    else {
      alert(playerInfo.name + " did not beat the high score of " + highScore + ". Maybe next time!");
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

    var shopOptionPrompt = window.prompt(
        "Would you like to [1]REFILL your health, [2]UPGRADE your attack, or [3]LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', or 'LEAVE' to make a choice.");
    shopOptionPrompt = parseInt(shopOptionPrompt);
    switch (shopOptionPrompt) {

        case 1:
            playerInfo.refillHealth();
            break;

        case 2:
            playerInfo.upgradeAttack();
            break;

        case 3:
            window.alert('Leaving store...');
            break;

        default:
            window.alert('You did not pick a valid option. Try again.');
            shop();
            break;
    }
    //goes back to game loop
}


var getPlayerName = function () {
    var name = "";

    while (name === "" || name === null) {
        name = prompt("What is your robot's name?");
    }

    console.log("Your robot's name is " + name);
    return name;
}

///player object///
var playerInfo = {
    name: getPlayerName(),
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