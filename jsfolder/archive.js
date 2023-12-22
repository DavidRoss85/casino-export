//ABIE.JS ARCHIVE
//MERGED INTO enableButtons();

// const mainGame = document.querySelector("#dealCards");

// mainGame.addEventListener("click", function() {
//   document.querySelector(".startMainGame").classList.toggle("hide");
//   document.querySelector(".playerChoices").classList.toggle("show");
// });


// const restart = document.querySelector("#dealCards6");
// restart.addEventListener("click", function(){
//     document.querySelector(".startMainGame").classList.toggle("hide");
//     document.querySelector(".playerChoices").classList.toggle("show");
// })

// console.log("hi from js")

//MAIN.JS ARCHIVE
// const CARD_IMAGE_PATH = "https://www.deckofcardsapi.com/static/img/";
// const CARD_BACK_IMAGE = "back.png";
// const NEW_DECK_API_URL = 'https://deckofcardsapi.com/api/deck/new/shuffle/?count=';
// const piles = 'https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S';



// const cardQuerySelector = document.querySelector(".playerCard");
// const newCardQuerySelectorPlayer = document.querySelector(".newCardPlayer");
// const cardDealerQuerySelector = document.querySelector(".cardDealer");
// const newCardDealerQuerySelectorDealer = document.querySelector(".newCardDealer");



// let numDecks = 1;
// let deckID;
// let dealerScore;
// let playerScore;
// let currentPlayerHand = [];
// let currentDealerHand = [];
// let historyOfAllHands = {};
// let playerBank = 10000;

// let newCardPlayer = "";
// let newCardDealer = "";

// async function createCardDeckAndGetID() {
//   const res = await fetch(NEW_DECK_API_URL + numDecks);
//   const data = await res.json();
//   deckID = data.deck_id;
// }

// async function drawTwoCardsPlayer() {
//   const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=2');
//   const data = await res.json();
//   let newCard = "";
//   for (let card of data.cards) {
//     currentPlayerHand.push(card.value, card.suit);
//     console.log("drawn card test ", card.image, card.value, card.suit);
//     currentPlayerHand.push(card.value, card.suit);
//     newCard += `<img class="cardPlayer" src="https://deckofcardsapi.com/static/img/6H.png" alt="${card.value + " of " + card.suit}"'/>`;
//   }
//   cardQuerySelector.innerHTML = newCard;
// }

// async function drawOneCardFaceUpDealer() {
//   const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
//   const data = await res.json();
//   for (let card of data.cards) {
//     currentDealerHand.push(card.value, card.suit);
//     newCardDealer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;
//   }
//   newCardDealerQuerySelectorDealer.innerHTML = newCardDealer;
// };
// async function drawCardDealerBackImage() {
//   const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
//   const data = await res.json();
//   for (let card of data.cards) {
//     currentDealerHand.push(card.value, card.suit);
//     newCardDealer += `<img class="cardDealer" src="https://www.deckofcardsapi.com/static/img/back.png " alt="${card.value + " of " + card.suit}"'/>`;
//   }
//   newCardDealerQuerySelectorDealer.innerHTML = newCardDealer;
// }

// function drawCardImage(cardCode, targetId) {
//   //This function will fetch the card image from an object and draw it to the designated element with a given ID.

//   //Ensure targetId is not empty 
//   if (targetId) { const drawTarget = document.getElementById(targetId) }


// }
// // async function drawOneCardDealer() {
// //     const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
// //     const data = await res.json();
// //     newCardDealer = "";
// //     for(let card of data.cards) {
// //         newCardDealer += `<img class="cardDealer" src="https://www.deckofcardsapi.com/static/img/back.png " alt="${card.value + " of " + card.suit}"'/>`;
// //         }
// //         newCardQuerySelectorDealer.innerHTML = newCardDealer;
// // }

// async function drawOneCardPlayer() {
//   const res = await fetch('https://www.deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=1');
//   const data = await res.json();
//   for (let card of data.cards) {
//     currentPlayerHand.push(card.value, card.suit);
//     newCardPlayer += `<img class="cardDealer" src="${card.image}" alt="${card.value + " of " + card.suit}"'/>`;

//   }

//   newCardQuerySelectorPlayer.innerHTML = newCardPlayer;
// }


// function gameStart() {
//   createCardDeckAndGetID();
//   setTimeout(() => {
//     drawTwoCardsPlayer();
//   }, "1000");
//   setTimeout(() => {
//     drawCardDealerBackImage();
//   }, "1000");
//   setTimeout(() => {
//     drawOneCardFaceUpDealer();
//   }, "1000");
//   setTimeout(() => {
//     consoleLogHands();
//   }, "1000");
// }

// function consoleLogHands() {

//   for (i = 0; i < currentPlayerHand.length; i++) {
//     console.log(currentPlayerHand[i] + "Player hand");
//   }

//   for (i = 0; i < currentDealerHand.length; i++) {
//     console.log(currentDealerHand[i] + "Dealer hand");
//   }

// };

// function openSettingtoStart() {
//   document.querySelector(".navbar-setting").classList.toggle("start");
//   document.querySelector(".setting").classList.toggle("menu");
// }
// function backToFirstPage() {
//   document.querySelector(".navbar-setting").classList.toggle("start");
//   document.querySelector(".setting").classList.toggle("menu");
// }


// //   newCardQuerySelectorPlayer.innerHTML = newCardPlayer;
// // }


// function gameStart() {
//   createCardDeckAndGetID();
//   setTimeout(() => {
//     drawTwoCardsPlayer();
//   }, "1000");
//   setTimeout(() => {
//     drawCardDealerBackImage();
//   }, "1000");
//   setTimeout(() => {
//     drawOneCardFaceUpDealer();
//   }, "1000");
//   setTimeout(() => {
//     consoleLogHands();
//   }, "1000");
// }

// const mainGame = document.querySelector(".btn-circle.btn-xl.btn-circle");
//   mainGame.addEventListener("click", function() {
//   document.querySelector(".startMainGame").classList.toggle("hide");
//   document.querySelector(".playerChoices").classList.toggle("show");
// });

// function playerStayOption(){}
//     //calculate the total score of the player vs the dealer and update the DOM with scores accordingly
// function consoleLogHands() {

//   for (i = 0; i < currentPlayerHand.length; i++) {
//     console.log(currentPlayerHand[i] + "Player hand");
//   }

//   for (i = 0; i < currentDealerHand.length; i++) {
//     console.log(currentDealerHand[i] + "Dealer hand");
//   }

// };

// function openSettingtoStart() {
//   document.querySelector(".navbar-setting").classList.toggle("start");
//   document.querySelector(".setting").classList.toggle("menu");
// }
// function backToFirstPage() {
//   document.querySelector(".navbar-setting").classList.toggle("start");
//   document.querySelector(".setting").classList.toggle("menu");
// }

// function playerStayOption() {
//   //calculate the total score of the player vs the dealer and update the DOM with scores accordingly
// }

// function playerBetOption(amount) {
//   if (playerBank <= amount) {
//     alert("you need more money to bet");
//   } else {
//     playerBank -= amount;
//   }


// }







//ZACH.JS ARCHIVE
// const playerBank = document.getElementById("playerBank");
// const totalMoneyInPot = document.getElementById("totalPot");
// const dealerScoreNow = document.getElementById("dealerScoreNow");
// const playerScoreNow = document.getElementById("playerScoreNow");

// function playerPlacedBet(amount = 50, playerIndex = 1) {
//   const betAmountPlayer1 = currentPlayer[playerIndex].placeBet(amount);

//   currentTable.moneyPot += 50;
//   return betAmountPlayer1;
// }

// not sure where to go on this one. maybe need dealer to have his own money and pot to have its own thing, and clear out pot each round.
// function allocateWinnings(playerMoney, totalMoneyInPot) {
//   if (playerMoney == player0) {
//     totalMoneyInPot.innerHTML = "Total money in the pot has " + 0;
//     localStorage.setItem(`${playerMoney}`, currentTable.moneyPot);
//   }
// }
// //I need to work on this one a lot - tired now - brain not working.
// function declareWinner(player) {
//   totalMoneyInPot.innerHTML =
//     "Total cash in the Pot: $" + currentPlayer[0].money;
//   // if(player == player0){
//   //     currentPlayer[0] =
//   // }
//   alert(
//     player + " Is the Winner & has won this much:$" + currentPlayer[0].money
//   );
// }

// // function calculateScore(player) {
// //   const cards = player.hand;
// //   let score = 0;
// //   let numAces = 0;

// //   for (const card of cards) {
// //     const cardValue = card.value;
// //     // console.log("cardValue: " + cardValue);
// //     if (cardValue === "KING" || cardValue === "QUEEN" || cardValue === "JACK") {
// //       score += 10;
// //       // console.log("cardValue: " + cardValue);
// //     } else if (cardValue === "ACE") {
// //       numAces += 1;
// //       score += 11; // Assume 11 for now, can be adjusted later if needed
// //     } else {
// //       score += parseInt(cardValue);
// //     }
// //   }
// //   while (numAces > 0 && score > 21) {
// //     score -= 10;
// //     numAces -= 1;
// //   }
// //   // console.log("score: " + score);
// //   return score;
// // }

// async function getPlayersHandsJson() {
//   const dealerJson = await fetch(
//     `${DECK_URL}${deck__id}/pile/${"Player0"}/list/`
//   );
//   const dealerJsonified = await dealerJson.json();

//   const dealerScore = dealerJsonified.piles.Player0;
//   console.log("dealer: ", dealerScore);

//   const player1Json = await fetch(
//     `${DECK_URL}${deck__id}/pile/${"Player1"}/list/`
//   );
//   const player1Jsonified = await player1Json.json();

//   const player1Score = player1Jsonified.piles.Player1;
//   console.log("player1: ", player1Score);

//   const player1Scores = calculateScore(player1Score);
//   const player0Scores = calculateScore(dealerScore);
//   playerScoreNow.innerHTML = "Player score is: " + player1Scores;
//   dealerScoreNow.innerHTML = "Dealer score is: " + player0Scores;

//   if (player1Scores > 21 && player0Scores <= 21) {
//     // declareWinner("dealer");
//         showWinner.innerHTML = "Dealer wins!";

//     return console.log("Player: loses" + player1Score);
//   }

//   else if (player0Scores > 21 && player1Scores <= 21) {
//     // declareWinner("player");
//     showWinner.innerHTML = "Player wins!";
//     return console.log("Dealer: loses" + dealerScore);
//   }
//   else if (
//     player0Scores === player1Scores &&
//     player1Scores <= 21 &&
//     player0Scores >= 17
//   ) {
//     showWinner.innerHTML = "TIE";

//     // declareWinner("TIE - both win");
//     return console.log("Dealer and Player both tie");
//   }
//   else if (
//     player0Scores >= 17 &&
//     player0Scores <= 21 &&
//     player1Scores < player0Scores
//   ){
//     showWinner.innerHTML = "Dealer wins!";

//     return console.log("Dealer wins");

//   }
  
//   else if (
//     player1Scores >= 17 &&
//     player1Scores <= 21 &&
//     player0Scores < player1Scores
//   )  {
//     showWinner.innerHTML = "Player wins!";

//     return console.log("Player wins");
//   } 
//   else {
//     showWinner.innerHTML = "Bugs in the system";

//     return console.log("Something broke");
//   }
// }


// function nukeTable()
  


// function reset(){
//   // this code works but won't work after you deal again, it'll duplicate cards for everyone I'm not sure how to fix. 
//   // const tableElements = document.querySelectorAll(".cardDealer");
  
//   //   tableElements.forEach(tableElements => {
//   //     tableElements.remove();
//   // });

//   // using this for now until we find a better way to empty table / players hands / maintain state of pot / cash etc.
//   window.location.reload(); 

// }

// not sure how to do this. 
// function animateCard(card) {
//   const cardDealer = document.querySelector('.cardDealer');
//   const cardElement = document.createElement('div');
// }



// function onSignIn(googleUser) {
//   var profile = googleUser.getBasicProfile();
//   console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
//   console.log('Name: ' + profile.getName());
//   console.log('Image URL: ' + profile.getImageUrl());
//   console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
// }


// let playerMoney = localStorage.getItem('playerMoney');
// if (playerMoney === null) {
//   Storage.setItem("playerMoney", 1000); 
// }

// function updatePlayerMoney(amount) {
//   playerMoney += amount;
//   localStorage.setItem('playerMoney', playerMoney);
// }

//DAVID.JS ARCHIVE:
//OLD CODE BELOW:
//Add a sound to the DOM
// function addAudioToDOM(url = "../audio/jazzy-band-Monument_Music.mp3", idTag = "sound"){
//     const theSound = new Audio(url); 
//     theSound.id = idTag;
//     document.querySelector("#audioParent").appendChild(theSound);

// }
// //Play a sound that has been attached to the DOM
// function playSound(itemId = "sound", loop = false, seekPoint = 0, vol = 1) {
//     if (!audioOn) return;//Global variable for Sound On/Off

//     try {
//         document.querySelector(`#${itemId}`).currentTime = seekPoint;
//         document.querySelector(`#${itemId}`).volume = vol;
//         document.querySelector(`#${itemId}`).play();
//         document.querySelector(`#${itemId}`).loop = loop;
//     } catch (e) {
//         console.log("Failed to play sound from " + itemId);
//     }

// }
// //Stop playing sound
// function stopSound(itemId = "sound") {
//     try {
//         document.querySelector(`#${itemId}`).pause();

//     } catch (e) {
//         console.log("Failed to play sound from " + itemId);
//     }

// }

// //Called when player adjusts volume options
// function playerAdjustVolume(){
//     adjustVolume("backgroundMusic",musicSlider.value);
//     adjustVolume("backgroundNoise",noiseSlider.value);
//     adjustVolume("flipSound",effectsSlider.value);
//     adjustVolume("chipsSound1",effectsSlider.value);
// }

// //Called when user clicks OK
// function saveSoundValues(toSave = true){
//     if (toSave){
//         musicVolume = musicSlider.value;
//         noiseVolume = noiseSlider.value;
//         effectsVolume = effectsSlider.value;
//     } else {
//         musicSlider.value = musicVolume;
//         noiseSlider.value = noiseVolume;
//         effectsSlider.value=effectsVolume;
//         adjustVolume("backgroundMusic",musicVolume);
//         adjustVolume("backgroundNoise",noiseVolume);
//         adjustVolume("flipSound",effectsVolume);
//         adjustVolume("chipsSound1",effectsVolume);
    
//     }
// }

// //set volume for a playing sound
// //Note, this will not affect a sound that is not currently playing since the sound
// //volume will be set when calling the playSound function. The volume will be passed through
// //global variables at time of call.
// function adjustVolume(itemId = "sound", vol = 1){
//     if (!audioOn) return;//Global variable for Sound On/Off

//     try {
//         document.querySelector(`#${itemId}`).volume = vol;
//     } catch (e) {
//         console.log("Failed to adjust volume from " + itemId);
//     }

// }
// //Using absolute positions, slightly offsets positions of cards
// function positionCard(targetId, cardNumber){
//     const playerBox = document.getElementById(targetId)
//     playerBox.childNodes[cardNumber].style.left = ((5* cardNumber)+(20/currentTable.numPlayers)) + "vw"

// }

// //Card size can be adjusted on the fly. Just call this function and pass a 
// //multiplier value. (Default is 1)
// function adjustCardSize(data, multiplier = 1){
//     let cardHeight = 25 * multiplier
//     let cardWidth = cardHeight/1.4
//     let scaleUnit = "vh"

//     if(document.querySelector("body").clientHeight <= document.querySelector("body").clientWidth){
//     }
//     document.documentElement.style.setProperty("--card-width",`${cardWidth}${scaleUnit}`);
//     document.documentElement.style.setProperty("--card-height",`${cardHeight}${scaleUnit}`);
    
// }

// //Load all sounds to the DOM
// function loadSounds(){
//     addAudioToDOM("./audio/jazzy-band-Monument_Music.mp3","backgroundMusic");
//     addAudioToDOM("./audio/casino-ambiance.mp3","backgroundNoise");
//     addAudioToDOM("./audio/flipcard.mp3","flipSound");
//     addAudioToDOM("./audio/allinpushchips1.mp3","chipsSound1");
// }
//Reset all values

// const startButton = document.getElementById("dealCards")
// const hitButton = document.getElementById("dealCards1")
// const betButton = document.getElementById("dealCards2")
// const stayButton = document.getElementById("dealCards3")
// const dealerHitButton = document.getElementById("dealCards4")
// const resetButton = document.getElementById("dealCards6")

// window.addEventListener("load",enableButtons);

// const UNKNOWN_CARD = new Card("back",0,"NONE");
// const DEFAULT_CARD_CLASS = "playing-card-img cardDealer img-fluid"
// const MAX_SCORE = 21;

// //Change the player label id's here
// const PLAYER_SCORE_LABEL = [];
// const PLAYER_MONEY_LABEL = [];
// const PLAYER_NAME_LABEL = [];
// const TABLE_LABEL = ['tableMoney'];
// const GAME_STATUS_LABEL = ['gameStatus1']

// for (let i = 0; i < 6; i++){
//     PLAYER_SCORE_LABEL[i] = `playerScore${i}`;
//     PLAYER_MONEY_LABEL[i] = `playerMoney${i}`;
//     PLAYER_NAME_LABEL[i] = `playerName${i}`;
// }

// //timer function
// async function sleep(time){
//     return new Promise(resolve => setTimeout(resolve, time))
// };   

// function testOutThis(){
//     // console.log (currentTable.deckId);
//     // console.log("Dealer score: " + calculateScore(currentPlayer[0]));
//     // console.log("Player 1 score: " + calculateScore(currentPlayer[1]));
//     // console.log("Dealer Index:" + currentPlayer[0].playerNumber);
//     // console.log("Player 1 Index:" + currentPlayer[1].playerNumber)
//     // alert("ok")
//     // animateAddCard(`${CARD_IMAGE_PATH}AS.png`, "player1");
//     // refreshPlayerHand(0,5);
//     // revealPlayerHand(1);
// }


// //Fetch player cards from pile and place it in player object hand
// //Then cycle through and hide cards that do not need to be revealed
// //Call this fuction before a draw function
// async function showPlayerCards(player = new Player, numToShow = 1){

//     const playerHand = await getPileList(`Player${player.playerNumber}`,currentTable.deckId);
    
//     if (playerHand.length === 0) {
//         player.hand = playerHand;
//         return false;
//     } 
//     let cardDisplay = -1
//     try{ //When intializing player.hand will be null... this will catch it...I'm just lazy

//         for (let i = 0; i < playerHand.length; i++){
//             if (cardDisplay===-1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
//             if (i >= numToShow){
//                 player.hand[i] = UNKNOWN_CARD;
//             } else {
//                 player.hand[i] = playerHand[i]
//             }
//         }
//     } catch(e){
//         player.hand = playerHand
//         for (let i = 0; i < playerHand.length; i++){
//             if (cardDisplay===-1 && player.hand[i].value === 0) cardDisplay = i; //Tells us how many cards were shown before
//             if (i >= numToShow){
//                 player.hand[i] = UNKNOWN_CARD;
//             } else {
//                 player.hand[i] = playerHand[i]
//             }
//         }

//     } finally {
//         return cardDisplay;
//     }
  
// }
// async function revealPlayerHand(playerIndex = 0){
//     const numToAnimate = await showPlayerCards(currentPlayer[playerIndex],22);
//     console.log(numToAnimate);
//     await refreshPlayerHand(playerIndex,numToAnimate);
// }

// async function refreshPlayerHand(playerIndex, numToAnimate = 0){
//     drawTarget = document.getElementById(`player${playerIndex}`)
//     const animateIndex = currentPlayer[playerIndex].hand.length - numToAnimate
    
//     while (drawTarget.firstChild){
//         drawTarget.removeChild(drawTarget.firstChild)
//     }
//     for (let i = 0; i < currentPlayer[playerIndex].hand.length; i++){
//         let animateIt = false;
//         if (i >= animateIndex) animateIt = true;
//         await drawNewCard(currentPlayer[playerIndex].hand[i].image,`player${playerIndex}`, animateIt);
//     }
// }

// async function drawNewCard(cardImage, targetId, animateIt = true) {
//     //Ensure targetId is not empty
//     try{
//         const drawTarget = document.getElementById(targetId)
//         const newCard = await loadImage(cardImage)
      
//         if (animateIt){
//             newCard.setAttribute("class", `${DEFAULT_CARD_CLASS}  flip-over`);
//         } else {
//             newCard.setAttribute("class", DEFAULT_CARD_CLASS);
//         }
//         //console.log(newCard);
//         drawTarget.appendChild(newCard);
     
//     }
//     catch(e){
//         console.log(`Error drawing card:\nTarget: ${targetId}\n\n ${e}`)
//     }
//   }



// //This function is called when player stays or busts
// async function blackjackDealerAI(data, autoLose = false) {
//     disableButtons()

//     const thisDealer = currentPlayer[0];
//     await revealPlayerHand(0);
//     thisDealer.score = calculateScore(thisDealer);
//     currentPlayer[1].score = calculateScore(currentPlayer[1]);
//     //drawDealerCards();

//     //If player busts or other auto loss conditon, declare dealer winner
//     if (autoLose) {
//         await sleep(1000); //wait a sec
//         console.log("You went over... YOU LOSE");
//         showMessage(`Player Bust...<br>You Lose<br><br>Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}`)
//         enableButtons();
//         return;
//     } 

//     //THIS IS WHERE ALL OF THE DEALER LOGIC WILL GO...
//     //-----------------------------------------------------
//     while (thisDealer.score < currentPlayer[1].score){
//         await sleep(500); //include a timer to slow down tasks
//         await dealerHit();
//         //drawDealerCards();
//         thisDealer.score = calculateScore(thisDealer);
//     }
//     //------------------------------------------------------
//     let scoreText = `<br><br>Your score: ${currentPlayer[1].score}<br>Dealer score: ${thisDealer.score}`
//     await sleep(1000); //wait a sec
//     switch (true){
//         case (thisDealer.score > MAX_SCORE):
//             //Dealer goes over:
//             showMessage(`You Win!!${scoreText}`);
//             console.log ("Dealer went over... you win.");
//             break;
//         case (thisDealer.score > currentPlayer[1].score):
//             //Dealer beats player:
//             showMessage(`Dealer wins.${scoreText}`);
//             console.log("Dealer wins.");
//             break;
//         case (thisDealer.score === currentPlayer[1].score):
//             //It's a tie!!
//             showMessage(`Push.${scoreText}`);
//             console.log("Push");
//             break;
//         case (thisDealer.score < currentPlayer[1].score):
//             //Player scores higher:
//             showMessage(`You WIN!!${scoreText}`);
//             console.log ("Player wins!");
//     }
//     enableButtons()
// }

// //Dealer takes a hit... (Not the 420 type)
// async function dealerHit(){
//     await givePlayerCards(0,1,currentTable.deckId,22)
// }

// function updateLabels() {
//     const scoreLabel = [];
//     const moneyLabel = [];
//     const nameLabel = [];

//     for (let i = 0; i <= currentTable.numPlayers; i++) {
//         scoreLabel[i] = document.getElementById(PLAYER_SCORE_LABEL[i]);
//         moneyLabel[i] = document.getElementById(PLAYER_MONEY_LABEL[i]);
//         nameLabel[i] = document.getElementById(PLAYER_NAME_LABEL[i]);

//         scoreLabel[i].textContent = `Score: ${calculateScore(currentPlayer[i])}`
//         moneyLabel[i].textContent = `$${currentPlayer[i].money}`
//         nameLabel[i].textContent = `${currentPlayer[i].name}:`
//     }
//     document.getElementById(TABLE_LABEL[0]).textContent = `Pot: $${currentTable.moneyPot}`;
// }

// async function updateDisplay(doUpdate = true) {
//     while (doUpdate) {
//         updateLabels();
//         await sleep(100);
//     }
// }


// async function loadImage(src){
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = reject;
//     img.src = src;
//   })  
// }

// function clearTable(playerIndex){
  
//     const drawTarget = document.getElementById(`player${playerIndex}`)
//     while (drawTarget.firstChild){
//         drawTarget.removeChild(drawTarget.firstChild)
//     }

// }

// function enableButtons(){
//     startButton.addEventListener("click",gameStart);
//     startButton.addEventListener("click",startListenerFunction); //Abbie.js

//     hitButton.addEventListener("click",hitMe); 
//     betButton.addEventListener("click",playerPlacedBet);
//     stayButton.addEventListener("click",blackjackDealerAI); 
//     dealerHitButton.addEventListener("click",testOutThis);
//     resetButton.addEventListener("click",reset);
//     resetButton.addEventListener("click", resetListenerFunction); //Abbie.js
//     console.log("buttons enabled")
// }
// function disableButtons(){
//     startButton.removeEventListener("click",gameStart);
//     startButton.removeEventListener("click", startListenerFunction); //Abbie.js
      
//     hitButton.removeEventListener("click",hitMe); 
//     betButton.removeEventListener("click",playerPlacedBet);
//     stayButton.removeEventListener("click",blackjackDealerAI); 
//     dealerHitButton.removeEventListener("click",testOutThis);
//     resetButton.removeEventListener("click",reset);
//     resetButton.removeEventListener("click", resetListenerFunction); //Abie.js
//     console.log("buttons disabled")
// }

// function resetListenerFunction(){
//     document.querySelector(".startMainGame").classList.toggle("hide");
//     document.querySelector(".playerChoices").classList.toggle("show");
// }

// function startListenerFunction(){
//     document.querySelector(".startMainGame").classList.toggle("hide");
//     document.querySelector(".playerChoices").classList.toggle("show");
 
// }