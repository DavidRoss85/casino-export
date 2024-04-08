//Note: The rest of the event listners are listed inside enableButtons()/disableButtons()//
// window.addEventListener("load", loadAssets);
window.onpageshow = () => loadAssets();
window.addEventListener("resize", adjustCardSize);

musicSlider.addEventListener("change", playerAdjustVolume);
noiseSlider.addEventListener("change", playerAdjustVolume);
effectsSlider.addEventListener("change", playerAdjustVolume);


//Execution starts HERE:
async function loadAssets() {
  loadUserData();
  cleanupCards(); //Temporary fix in case user hits the back button ;)
  saveUserData(false);
  adjustCardSize();
  loadSounds();
  showMessage(chooseDealerHTML, (() => { dealerIdentity = "Male-Dealer"; beginInteraction() }), (() => { dealerIdentity = "Female-Dealer"; beginInteraction() }), 80, -1, "chooseOne");
  enableButtons() //Need a more precise way to control user clicks to stop breaking from click spamming
  musicVolume = .1;

}
//---------------------------------------------------------------//
//**FUNCTIONS BELOW THIS POINT ARE LISTED IN ALPHABETICAL ORDER**//
//---------------------------------------------------------------//

//Add a sound to the DOM
function addAudioToDOM(url = "../audio/jazzy-band-Monument_Music.mp3", idTag = "sound") {
  const theSound = new Audio(url);
  theSound.id = idTag;
  document.querySelector("#audioParent").appendChild(theSound);

}

//Card size can be adjusted on the fly. Just call this function and pass a 
//multiplier value. (Default is 1)
function adjustCardSize(data) {
  let cardHeight = (25 * cardScale)//currentTable.numPlayers;
  let cardWidth = cardHeight / 1.4
  let scaleUnit = "vh"

  if (document.querySelector("body").clientHeight <= document.querySelector("body").clientWidth) {
  }
  document.documentElement.style.setProperty("--card-width", `${cardWidth}${scaleUnit}`);
  document.documentElement.style.setProperty("--card-height", `${cardHeight}${scaleUnit}`);

  //Set a timeout for drawing to reduce flicker
  if (timeToRedraw) {
    for (i = 0; i <= currentTable.numPlayers; i++) {
      redrawPlayerHand(i);
    }
    timeToRedraw = false;
    setTimeout(() => timeToRedraw = true, 250);
  }
}

//set volume for a playing sound
//Note, this will not affect a sound that is not currently playing since the sound
//volume will be set when calling the playSound function. The volume will be passed through
//global variables at time of call.
function adjustVolume(itemId = "sound", vol = 1) {
  if (!audioOn) return;//Global variable for Sound On/Off

  try {
    document.querySelector(`#${itemId}`).volume = vol;
  } catch (e) {
    console.log("Failed to adjust volume from " + itemId);
  }

}

//winnerArray is an array of player indexes. '0' is dealer
function awardWinnings(winnerArray = [], multiplier = 2) {
  console.log('Awarding winnings: ', currentTable.moneyPot);
  if (winnerArray.length > 0) {
    //For each player that wins, return double their bet.
    for (playerNumber of winnerArray) {
      currentPlayer[playerNumber].money = currentPlayer[playerNumber].money + (multiplier * currentPlayer[playerNumber].bet);
      currentTable.moneyPot -= currentPlayer[playerNumber].bet;
    };
  };
  //Zero out bets:
  for (player of currentPlayer) {
    player.bet = 0;
  }
  //Give remainder to dealer and zero out pot:
  currentPlayer[0].money = currentPlayer[0].money + currentTable.moneyPot;
  currentTable.moneyPot = 0;

}

//User has interacted with the window.
//This is here because some browsers will block  ome functionality unless user
//interacts with the window.
function beginInteraction() {
  //Start background music
  saveSoundValues(false);
  setDisplayMessages();
  playSound("backgroundMusic", true, 0, musicVolume);
  playSound("backgroundNoise", true, 0, noiseVolume);

  //Immediately start game:
  startButton.click(); //go to function gameStart()
}

//This function is called when player stays or busts
async function blackjackDealerAI(data, autoLose = false) {
  disableButtons()

  const thisDealer = currentPlayer[0];
  let winnerArray = [1];

  await revealPlayerHand(0);
  thisDealer.score = calculateScore(thisDealer);
  currentPlayer[1].score = calculateScore(currentPlayer[1]);
  //drawDealerCards();

  //If player busts or other auto loss conditon, declare dealer winner
  let scoreText = `<span class="subtext">Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}</span><br>Play again?<br>`

  if (autoLose) {
    await sleep(1000); //wait a sec
    awardWinnings(); //Give dealer all the money
    showMessage(`${dealerWinsMessageHTML}${scoreText}`,
      playAgain, returnToHomeScreen, 80, -1, "YesNo");
    enableButtons();
    return;
  }

  //THIS IS WHERE ALL OF THE DEALER LOGIC WILL GO...
  //-----------------------------------------------------
  while (thisDealer.score < currentPlayer[1].score) {
    await sleep(500); //include a timer to slow down tasks
    await dealerHit();
    //drawDealerCards();
    thisDealer.score = calculateScore(thisDealer);
  }
  //------------------------------------------------------
  scoreText = `<span class="subtext">Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}</span><br>Play again?<br>`
  await sleep(1000); //wait a sec
  switch (true) {
    case (thisDealer.score > DEFAULT_MAX_SCORE):
      //Dealer goes over:
      awardWinnings(winnerArray); //Award player money
      showMessage(`${dealerLossMessageHTML}${scoreText}`,
        playAgain, returnToHomeScreen, 80, -1, "YesNo");
      break;
    case (thisDealer.score > currentPlayer[1].score):
      //Dealer beats player:
      awardWinnings(); //Give dealer all the money
      showMessage(`${dealerWinsMessageHTML}${scoreText}`,
        playAgain, returnToHomeScreen, 80, -1, "YesNo");
      break;
    case (thisDealer.score === currentPlayer[1].score):
      //It's a tie!!
      awardWinnings(winnerArray, 1); //Return money to player
      showMessage(`Push.${dealerPushMessageHTML}${scoreText}`,
        playAgain, returnToHomeScreen, 80, -1, "YesNo");
      break;
    case (thisDealer.score < currentPlayer[1].score):
      //Player scores higher:
      awardWinnings(winnerArray); //Award player money
      showMessage(`${dealerLossMessageHTML}${scoreText}`,
        playAgain, returnToHomeScreen, 80, -1, "YesNo");
  }
  enableButtons()
}
//Calculate the player score
function calculateScore(player = new Player) {
  const cards = player.hand;
  let score = 0;
  let numAces = 0;

  for (const card of cards) {
    const cardValue = card.value;

    if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK") {
      score += 10;

    } else if (cardValue === "ACE") {
      numAces += 1;
      score += 11; // Assume 11 for now, can be adjusted later if needed
    } else {
      score += parseInt(cardValue);
    }
  }
  //If score is >21 for every Ace -10 (i.e. Ace = 1)
  while (numAces > 0 && score > 21) {
    score -= 10;
    numAces -= 1;
  }

  return score;
}

//Remove all card images from table, but does not clear players hands
function clearTable(playerIndex) {

  const drawTarget = document.getElementById(`player${playerIndex}`)
  while (drawTarget.firstChild) {
    drawTarget.removeChild(drawTarget.firstChild)
  }

}

//Dealer takes a hit... (Not the 420 type)
async function dealerHit() {
  await givePlayerCards(0, 1, currentTable.deckId, 22)
}

//Disable buttons
function disableButtons() {
  startButton.removeEventListener("click", gameStart);
  // startButton.removeEventListener("click", showPlayerChoices); //Abbie.js

  hitButton.removeEventListener("click", hitMe);
  betButton.removeEventListener("click", playerPlacedBet);
  stayButton.removeEventListener("click", blackjackDealerAI);
  dealerHitButton.removeEventListener("click", testOutThis);
  quitButton.removeEventListener("click", leaveGame);
  //resetButton.removeEventListener("click", hidePlayerChoices); //Abie.js
  //console.log("buttons disabled")
}

//Animate a new card that is gained 
async function drawNewCard(cardImage, targetId, animateIt = true) {
  //Ensure targetId is not empty
  try {
    const drawTarget = document.getElementById(targetId)
    const newCard = await loadImage(cardImage)

    if (animateIt) {
      newCard.setAttribute("class", `${DEFAULT_CARD_CLASS}  flip-over`);
      playSound("flipSound", false, .35, effectsVolume);
    } else {
      newCard.setAttribute("class", DEFAULT_CARD_CLASS);
    }
    drawTarget.appendChild(newCard);
    positionCard(targetId, drawTarget.childNodes.length - 1);
  }
  catch (e) {
    console.log(`Error drawing card:\nTarget: ${targetId}\n\n ${e}`)
  }
}

//Enable buttons
function enableButtons() {
  startButton.addEventListener("click", gameStart);
  startButton.addEventListener("click", showPlayerChoices); //Abbie.js

  hitButton.addEventListener("click", hitMe);
  betButton.addEventListener("click", playerPlacedBet);
  stayButton.addEventListener("click", blackjackDealerAI);
  dealerHitButton.addEventListener("click", testOutThis);
  quitButton.addEventListener("click", leaveGame);
  //resetButton.addEventListener("click", hidePlayerChoices); //Abbie.js
  //console.log("buttons enabled")
}

//Start the game
async function gameStart() {
  const numPlayers = 1; //not including dealer
  const numDecks = 1;

  //clear the table to remove whitespace nodes
  disableButtons();
  clearTable(0);
  clearTable(1);
  // await sleep(500);
  setTable(numPlayers, numDecks);
  enableButtons();

}

//Procedurally generate playing field
function generatePlayerRows(numPlayers) {
  const playerRow = document.getElementById("player-row")
  let insertText = ""
  for (let i = 1; i <= numPlayers; i++) {
    insertText += `
    <!--Player ${i} -->
    <div class="col mx-auto playerHand">

      <div class="row">
        <div class="col">
          <h3 class="player-table-label" id="player${i}name">Player ${i}</h3>
        </div>
      </div>

      <div class="row">
        <div class="col player-cards" id="player${i}">
          Player cards appear here
        </div>
      </div>

    </div>
    <!-- End of player block -->
    `
  }
  playerRow.innerHTML = insertText;
  for (let i = 1; i <= numPlayers; i++) {
    clearTable(i);
  }

  const playerTextEl = document.getElementById("playerblock");

  document.getElementById("playerscol").classList.remove("col");
  const colWidth = Math.floor((12 / (numPlayers + 3) * numPlayers));
  document.getElementById("playerscol").classList.add(`col-${colWidth}`);
  insertText = ""
  for (let i = 1; i <= numPlayers; i++) {
    insertText += `
    <div class="col table-info-section">
      <div class="row">
        <div class="col text-center player-label" id="playerName${i}">Player ${i}:</div>
      </div>
      <div class="row text-nowrap">
        <div class="col-sm-6" id="playerScore${i}">Score: 0</div>
        <div class="col-sm-6 text-end" id="playerMoney${i}">$0 </div>
      </div>
    </div>
    `
  }
  playerTextEl.innerHTML = insertText;

}

//This Will extract a designated number of cards from the deck and add it to player's hand
async function givePlayerCards(playerIndex, numCards, deckId, numToShow = 1) {
  const extractedCards = await extractCards(numCards, deckId); //Calls the cards from the API
  const playerPile = [];
  const previousCardCount = currentPlayer[playerIndex].hand.length //Store how many cards the player had before

  if (!extractedCards) { return 0; } //Exit function if no cards drawn.

  //Pushes cards to player object and extracts card codes for API call
  for (let card of extractedCards) {
    //currentPlayer[playerIndex].hand.push(card);
    playerPile.push(card.code);
  }
  //Adds the drawn cards to a "Pile" Server side (API call)
  await addCardsToPile(playerPile, `Player${playerIndex}`, deckId);

  //Only Show relevant cards:
  //Will update the players hand arrays with blank cards for hidden values
  await showPlayerCards(currentPlayer[playerIndex], numToShow);

  //Do some simple math to figure out ow many cards to add to the board
  const numCardsToFlip = currentPlayer[playerIndex].hand.length - previousCardCount
  if (numCardsToFlip > 0) {
    for (let i = 0; i < numCardsToFlip; i++) {
      //Draw cards by appending them to the parent node for that player
      drawNewCard(currentPlayer[playerIndex].hand[previousCardCount + i].image, `player${playerIndex}`)
    }

  }
  return numCards;

}

//Hides the "Hit/Stay/Reset buttons" (sister to showPlayerChoices())
function hidePlayerChoices() {
  document.querySelector(".startMainGame").classList.toggle("hide");
  document.querySelector(".playerChoices").classList.toggle("show");
}

//Player Hit...
async function hitMe() {
  disableButtons();
  const numCardsToFlip = await givePlayerCards(1, 1, currentTable.deckId, 22);
  //drawAllPlayerCards(currentTable.numPlayers);

  let yourScore = calculateScore(currentPlayer[1]);
  currentPlayer[1].score = yourScore;

  if (yourScore > DEFAULT_MAX_SCORE) {
    //disableButtons()  //Add code to disable buttons here...
    await blackjackDealerAI(numCardsToFlip, true);
  }
  enableButtons();
}

//User attempts to leave the game:
function leaveGame() {
  showMessage("Are you sure you want to quit?", returnToHomeScreen, doNothing, 60, -1, "YesNo");
}
//Load any given image into the DOM and wait for response
async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  })
}

//Load all sounds to the DOM
function loadSounds() {
  addAudioToDOM("./audio/jazzy-band-Monument_Music.mp3", "backgroundMusic");
  addAudioToDOM("./audio/casino-ambiance.mp3", "backgroundNoise");
  addAudioToDOM("./audio/flipcard.mp3", "flipSound");
  addAudioToDOM("./audio/allinpushchips1.mp3", "chipsSound1");
}

//For later functionality
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

function cleanupCards() {
  if (!currentTable.isActive) return;
  shuffleCurrentDeck(currentTable.deckId, true);
  for (i = 0; i <= currentTable.numPlayers; i++) {
    clearTable(i);
    currentPlayer[i].clearLocalHand();
    // currentPlayer[i].score = calculateScore(currentPlayer[i]);
  }

}
//New Game
function playAgain() {

  //window.location.reload();
  disableButtons()
  cleanupCards();
  // shuffleCurrentDeck(currentTable.deckId, true);
  // for (i = 0; i <= currentTable.numPlayers; i++) {
  //   clearTable(i);
  //   currentPlayer[i].clearLocalHand();
  //   // currentPlayer[i].score = calculateScore(currentPlayer[i]);
  // }
  setTable(currentTable.numPlayers, 1, false);
  enableButtons();
}

//Called when player adjusts volume options
function playerAdjustVolume() {
  adjustVolume("backgroundMusic", musicSlider.value);
  adjustVolume("backgroundNoise", noiseSlider.value);
  adjustVolume("flipSound", effectsSlider.value);
  adjustVolume("chipsSound1", effectsSlider.value);
}

//Place Bet
function playerPlacedBet(event, amount = 50, playerIndex = 1) {
  const betAmount = currentPlayer[playerIndex].placeBet(amount);
  playSound("chipsSound1", false, .35, effectsVolume);
  currentTable.moneyPot += betAmount;
  return betAmount;
}

//Play a sound that has been attached to the DOM
function playSound(itemId = "sound", loop = false, seekPoint = 0, vol = 1) {
  if (!audioOn) return;//Global variable for Sound On/Off

  try {
    document.querySelector(`#${itemId}`).currentTime = seekPoint;
    document.querySelector(`#${itemId}`).volume = vol;
    document.querySelector(`#${itemId}`).play();
    document.querySelector(`#${itemId}`).loop = loop;
  } catch (e) {
    console.log("Failed to play sound from " + itemId);
  }

}

//Using absolute positions, slightly offsets positions of cards
//Note: This gets weird in mobile display with more than 2 players.
//Need better math or wrap each individual card in a flex-element
function positionCard(targetId, cardNumber) {
  const playerBox = document.getElementById(targetId);
  const screenWidth = document.body.clientWidth;
  const screenHeight = document.body.clientHeight;
  const cardWidth = playerBox.childNodes[cardNumber].clientWidth

  let cardSpacer = 5;

  //In order to keep the card center we divide it's width by screen with
  let displayRatio = (cardWidth / 2) / screenWidth;
  let cardOffset = displayRatio * cardScale * 100;

  //so it doesn't space dealer according to num players:
  if (targetId !== "player0") {
    cardOffset *= currentTable.numPlayers;
    cardSpacer *= currentTable.numPlayers;
  }
  cardOffset = 50 - cardOffset;

  const numberOfCards = playerBox.childNodes.length;
  //recalculate card position based on number of cards
  for (i = 0; i < numberOfCards; i++) {
    let xPosMath = ((cardSpacer * i) + cardOffset);
    xPosMath -= ((numberOfCards - 1) * (cardSpacer / 2));
    playerBox.childNodes[i].style.left = xPosMath + "%"
  }

}

//Redraws the cards and place a flip animation on a specific number of cards
async function redrawPlayerHand(playerIndex, numToAnimate = 0) {
  drawTarget = document.getElementById(`player${playerIndex}`)
  const animateIndex = currentPlayer[playerIndex].hand.length - numToAnimate

  while (drawTarget.firstChild) {
    drawTarget.removeChild(drawTarget.firstChild)
  }
  for (let i = 0; i < currentPlayer[playerIndex].hand.length; i++) {
    let animateIt = false;
    if (i >= animateIndex) animateIt = true;
    await drawNewCard(currentPlayer[playerIndex].hand[i].image, `player${playerIndex}`, animateIt);
  }
}

//go back to main page
function returnToHomeScreen() {
  showMessage("Thank you for playing Blackjack!", () => { window.location.href = "./index.html"; saveUserData(false) }, doNothing, 60);
}

function reset() {
  showMessage("Goodbye!");
  sleep(2000);
  window.location.reload();
}

//Fetch all player cards from pile and place in hand face up
async function revealPlayerHand(playerIndex = 0) {
  const numToAnimate = await showPlayerCards(currentPlayer[playerIndex], 22);
  await redrawPlayerHand(playerIndex, numToAnimate);
}

//Called when user clicks OK on options window
function saveSoundValues(toSave = true) {
  if (toSave) {
    musicVolume = musicSlider.value;
    noiseVolume = noiseSlider.value;
    effectsVolume = effectsSlider.value;
  } else {
    musicSlider.value = musicVolume;
    noiseSlider.value = noiseVolume;
    effectsSlider.value = effectsVolume;
    adjustVolume("backgroundMusic", musicVolume);
    adjustVolume("backgroundNoise", noiseVolume);
    adjustVolume("flipSound", effectsVolume);
    adjustVolume("chipsSound1", effectsVolume);

  }
}

//Sets up the table for blackjack
async function setTable(numPlayers, numDecks, newDeck = true) {

  if (newDeck) {
    currentTable.deckId = await shuffleNewDeck(numDecks); //Get new deck
  } else {
    await shuffleCurrentDeck(currentTable.deckId);
  }
  currentTable.isActive = true;
  currentTable.numPlayers = numPlayers; // Set the number of players

  //Since dealer plays, Player 0 will always be set as dealer
  currentPlayer[0].name = "Dealer";
  currentPlayer[1].name = loadedName;
  //Before calling remaining fuctions, the table should be procedurally
  //adjusted if more than one player is intended.
  generatePlayerRows(numPlayers);

  //Set all players to active and deal cards
  for (let i = 0; i <= currentTable.numPlayers; i++) {
    currentPlayer[i].isActive = true;
    currentPlayer[i].playerNumber = i;  //We save the player index locally to the object
    let numToShow = 1;    // This variable sets how many cards go face up for each player
    if (i === 1) numToShow = 5;   //If the player is Player #1 all cards will be face up.
    if (i > 1) numToShow = 0;
    if (i === 0) {
      await givePlayerCards(i, 2, currentTable.deckId, numToShow);  //deals 2 cards for each player
    } else {
      await givePlayerCards(i, 2, currentTable.deckId, numToShow);  //deals 2 cards for each player
    }
  }

  //currentPlayer[1].name = "This is you"; //temporary Player should set their name

  updateDisplay(); //This is asyncrounous and will keep running for the entire game.

}

//Fetch player cards from pile and place it in player object hand
//Then cycle through and hide cards that do not need to be revealed
//Call this fuction before a draw function
async function showPlayerCards(player = new Player, numToShow = 1) {

  const playerHand = await getPileList(`Player${player.playerNumber}`, currentTable.deckId);

  if (playerHand.length === 0) {
    player.hand = playerHand;
    return false;
  }
  let cardDisplay = -1
  try { //When intializing player.hand will be null... this will catch it...I'm just lazy

    for (let i = 0; i < playerHand.length; i++) {
      if (cardDisplay === -1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
      if (i >= numToShow) {
        player.hand[i] = UNKNOWN_CARD;
      } else {
        player.hand[i] = playerHand[i]
      }
    }
  } catch (e) {
    player.hand = playerHand
    for (let i = 0; i < playerHand.length; i++) {
      if (cardDisplay === -1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
      if (i >= numToShow) {
        player.hand[i] = UNKNOWN_CARD;
      } else {
        player.hand[i] = playerHand[i]
      }
    }

  } finally {
    return cardDisplay;
  }

}

//Shows the "Hit/Stay/Reset buttons" (sister to hidePlayerChoices())
function showPlayerChoices() {
  document.querySelector(".startMainGame").classList.toggle("hide");
  document.querySelector(".playerChoices").classList.toggle("show");

}

//timer sleep function
async function sleep(time) {
  return new Promise(resolve => setTimeout(resolve, time))
};

//Stop playing sound
function stopSound(itemId = "sound") {
  try {
    document.querySelector(`#${itemId}`).pause();

  } catch (e) {
    console.log("Failed to play sound from " + itemId);
  }

}

//Just a function for testing
function testOutThis() {
  showOptions(80);
  // redrawPlayerHand(0,5);
  // revealPlayerHand(1);
}

//Continuously calls updateLabels()
async function updateDisplay(doUpdate = true) {
  while (doUpdate) {
    updateLabels();
    await sleep(100);
  }
}

//Collect all player information and update DOM items
function updateLabels() {
  const scoreLabel = [];
  const moneyLabel = [];
  const nameLabel = [];
  const tableNameLabel = [];

  for (let i = 0; i <= currentTable.numPlayers; i++) {
    try {
      scoreLabel[i] = document.getElementById(PLAYER_SCORE_LABEL[i]);
      moneyLabel[i] = document.getElementById(PLAYER_MONEY_LABEL[i]);
      nameLabel[i] = document.getElementById(PLAYER_NAME_LABEL[i]);
      tableNameLabel[i] = document.getElementById(TABLE_NAME_LABEL[i]);

      scoreLabel[i].textContent = `Score: ${calculateScore(currentPlayer[i])}`
      moneyLabel[i].textContent = `$${currentPlayer[i].money}`
      nameLabel[i].textContent = `${currentPlayer[i].name}:`
      tableNameLabel[i].textContent = `${currentPlayer[i].name}: ${calculateScore(currentPlayer[i])}`

    } catch (e) {

    }

  }
  document.getElementById(TABLE_LABEL[0]).textContent = `Pot: $${currentTable.moneyPot}`;
}




