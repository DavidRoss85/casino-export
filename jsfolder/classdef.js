//Class definitions
class Card {
    constructor (code="back", value = 0, suit = "SPADES"){
        this.code = code;
        this.image = `https://deckofcardsapi.com/static/img/${code}.png`
        this.images = {
            "svg": `https://deckofcardsapi.com/static/img/${code}.svg`, 
            "png": `https://deckofcardsapi.com/static/img/${code}.png`
        };
        this.value = value;
        this.suit = suit;
    }
}
class Player {
    constructor(name = "Player", isActive = false, money = 1000, playerNumber = 1) {
        this.name = name;
        this.money = money;
        this.wins = 0;
        this.isActive = isActive;
        this.playerNumber = playerNumber; //keep track of player index
        this.score = 0
        this.hand = [];
        //localStorage.setItem("money", amount);
    }
    clearLocalHand(){
        this.hand=[];
    }
    
    placeBet(amount) {
        if (amount > 0 && amount <= this.money) {
          this.money -= amount;
          //this is a way to update the value in local storage, setItem method.Just keeping score of player money at this time.
          console.log("betting");
          localStorage.setItem("money", amount);
          return amount;
        } else {
          console.log("Invalid bet amount or insufficient funds." + amount + ",", "current balance : " + this.money);
          return 0; 
        }
    }
}
class Dealer extends Player{
    constructor(name = "Dealer", diffLevel = "novice"){
        super(name, true, 0, 0);
        this.diffLevel = diffLevel;
    }
}

class GameTable{
    constructor(gameType, numPlayers = 1, deckId){
        this.gameType = gameType
        this.numPlayers = numPlayers;
        this.deckId = deckId;
        this.moneyPot = 0;
        this.currentRound = 0;
    }

}
