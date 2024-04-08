//DOM elements
const startButton = document.getElementById("dealCards")
const hitButton = document.getElementById("dealCards1")
const betButton = document.getElementById("dealCards2")
const stayButton = document.getElementById("dealCards3")
const dealerHitButton = document.getElementById("dealCards4")
const quitButton = document.getElementById("dealCards6")
const musicSlider = document.querySelector("#musicVolSlider");
const noiseSlider = document.querySelector("#noiseVolSlider");
const effectsSlider = document.querySelector("#soundVolSlider");

const UNKNOWN_CARD = new Card("back", 0, "NONE");
const DEFAULT_CARD_CLASS = "playing-card-img cardDealer img-fluid"
const DEFAULT_MAX_SCORE = 21;

//These 'Labels' refer to the DOM elements where drawing occurs.
//These values are used by the draw functions to identify the draw target:
const TABLE_LABEL = ['tableMoney'];
const GAME_STATUS_LABEL = ['gameStatus1']
const PLAYER_SCORE_LABEL = [];
const PLAYER_MONEY_LABEL = [];
const PLAYER_NAME_LABEL = [];
const TABLE_NAME_LABEL = []
for (let i = 0; i < 6; i++) {
  PLAYER_SCORE_LABEL[i] = `playerScore${i}`;
  PLAYER_MONEY_LABEL[i] = `playerMoney${i}`;
  PLAYER_NAME_LABEL[i] = `playerName${i}`;
  TABLE_NAME_LABEL[i] = `player${i}name`
}

//Create classes for players, dealer and Table
const currentTable = new GameTable("Blackjack", 1, "");
const currentPlayer = []

//Max players = 5 + Dealer (Player 0)
currentPlayer[0] = new Dealer("Dealer 1", "novice");
for (let i = 1; i < 6; i++) {
  currentPlayer[i] = new Player(`Player ${i}`, false);
  Object.seal(currentPlayer[i]);//prevents mutation of object properties but allows value changes
}

let isLoggedIn = false;
let loadedName = "Player";
let cardScale = .8;
let timeToRedraw = true;
let audioOn = true;
let musicVolume = .2;
let noiseVolume = 1;
let effectsVolume = 1;
let dealerIdentity = "Male-Dealer";

let welcomeMessageHTML = "";
let dealerWinsMessageHTML = "";
let dealerLossMessageHTML = "";
let dealerPushMessageHTML = "";
let chooseDealerHTML = `
<div class="row">
  <div class = "col">
  <h2>Welcome to Nucamp Casino BlackJack!!</h2>
  Choose your dealer:
  <div class = "row">

    <div class = "col-sm-6 choose-dealer">
      Dealer 1
      <br>
      <img src="./imgs/Male-Dealer/Conceited2.png" onclick="msgYesButton.click()" class = "img-fluid"/>
      <br>
      <span class = "d-none d-md-inline">I'd like to see you try...</span>
    </div>
    
    <div class = "col choose-dealer">
      Dealer 2
      <br>
      <img src="./imgs/Female-Dealer/Conceited2.png" onclick="msgNoButton.click()" class = "img-fluid"/>
      <br>
      <span class = "d-none d-md-inline">I'm the dealer here... Just try and beat me!</span>
    <div>

  </div>
</div>
</div>
`;

function setDisplayMessages() {
  welcomeMessageHTML =
    `<div class="row">
    <div class = "col">
      <h2>Welcome to Nucamp Casino BlackJack!!</h2>
      <br>
      <img src="./imgs/${dealerIdentity}-Dealer/Conceited2.png" class = "img-fluid"/>
      <br>
      I'm the dealer here... Just try and beat me!
    </div>
  </div>
  `

  dealerWinsMessageHTML = `
  <div class="row">
    <div class = "col">
      <h2>Looks like I take this round!!</h2>
      <br>
      <img src="./imgs/${dealerIdentity}/Conceited1.png" class = "img-fluid"/>
      <br>
      Better luck next round!
    </div>
  </div>
  `

  dealerLossMessageHTML = `
  <div class="row">
    <div class = "col">
      <h2>What? How did you beat me? Impossible!!</h2>
      <br>
      <img src="./imgs/${dealerIdentity}/Angry1.png" class = "img-fluid"/>
      <br>
      I'll get you next time!</span>
    </div>
  </div>
  `

  dealerPushMessageHTML = `
  <div class="row">
    <div class = "col">
      <h2>Hmmm... Lucky!</h2>
      <br>
      <img src="./imgs/${dealerIdentity}/Angry2.png" class = "img-fluid"/>
      <br>
      How bout another round?
    </div>
  </div>
  `


}
