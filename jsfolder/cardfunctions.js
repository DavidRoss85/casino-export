//Card functions separated so that they can be included in other pages
//pile reference https://www.deckofcardsapi.com/api/deck/<<deck_id>>/pile/<<pile_name>>/add/?cards=AS,2S

//API Constants:
const API_URL = "https://www.deckofcardsapi.com/";
const DECK_URL = `${API_URL}api/deck/`
const NEW_DECK_API_URL = `${DECK_URL}new/shuffle/?count=`;
const EXTRACT_URL = "/draw/?count="

const CARD_IMAGE_PATH = "https://www.deckofcardsapi.com/static/img/";
const CARD_BACK_IMAGE = "back.png";
//Shuffle a new Deck and return the deck ID
async function shuffleNewDeck(numDecks) {
  const res = await fetch(NEW_DECK_API_URL + numDecks);
  const data = await res.json();
  if (data.success !== true){return false}
  return data.deck_id;
}

//Shuffle the current deck. Return true/false
async function shuffleCurrentDeck(deckId, returnCards = true) {
  let remainString = "";
  if (!returnCards) remainString = "?remaining=true"
  const res = await fetch(DECK_URL + deckId + "/shuffle/" + remainString);
  const data = await res.json();
  if (data.success !== true){return false}
  return data.deck_id;
}

//Returns an array of card objects containing cards dealt:
async function extractCards(numCards, deckId) {
  if (numCards < 1){return false}

  const res = await fetch(`${DECK_URL}${deckId}${EXTRACT_URL}${numCards}`);
  const data = await res.json();
  //Needs a check for no cards remaining in deck!!!!!!!!!!!!!
  //numCards -= Number(data.remaining);

  // const cardGroup = []

  // for (let card of data.cards) {
  //   //.code .suit,.value.image.
  //   cardGroup.push(card);
  // }
  // return cardGroup;
  return data.cards;

}

//Pass an array of card codes to add them to a given pile Return the number in the pile!
//Attempting to pass a card that has not been drawn will fail.
async function addCardsToPile(cardArray, pileName, deckId){
  if (cardArray.length === 0){return false;}

  const res = await fetch(`${DECK_URL}${deckId}/pile/${pileName}/add/?cards=${cardArray}`);
  const data = await res.json();
  
  if (data.success !== true){return false;}
  //if (data.success !== true){return false;}
  // return data.piles[pileName].remaining;
  return cardArray.length
}

//Shuffle a pile, return number of cards in pile
async function shufflePile(pileName, deckId){
  const res = await fetch(`${DECK_URL}${deckId}/pile/${pileName}/shuffle/`);
  const data = await res.json();
  
  if (data.success !== true){return false}
  //if (data.success !== true){return false}
  return data.remaining;


}

//Get all the cards from a specific pile
async function getPileList(pileName, deckId){
  const res = await fetch(`${DECK_URL}${deckId}/pile/${pileName}/list/`);
  const data = await res.json();
  
  //if (data.success !== true){return false}
  return data.piles[pileName].cards;
}