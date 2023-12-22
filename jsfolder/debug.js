//For debug and logs

function logEvent(currentFunction, currentEvent, extraInfo, throwAlert){
    console.log (`Procedure: ${currentFunction}\nEvent: ${currentEvent}\nMisc: ${extraInfo}`);
    if (throwAlert){
        alert(`Procedure: ${currentFunction}\nEvent: ${currentEvent}\nMisc: ${extraInfo}`)
    }
}

const Player1 = new Dealer("Player", false, 1000, 1);
const Player0 = new Dealer("Player1", false, 1000, 1);

// basic debugging is just using the .has method to check values or properties of set. (unique values). We don't use it yet
//console.log("player bank test: ", playerTest.has("Player", false, 1000, 1));


// table is super neat debugging tool, shows you all their properties and values
// console.table(Player1);
// console.table(Player0);


// we can test the time it takes to generate certain functions to complete. (NEAT)
console.time('Timer1');
 
console.log(calculateScore(Player0))
console.timeEnd('Timer1');

// we can use stack tracing with this command:

console.trace(Player0);

// we can add cool styling to our console with these symbols: although I tried it can't get it to work

// console.todo = function(msg) {
//     console.log(‘ % c % s % s % s‘, ‘color: yellow; background - color: black;’, ‘–‘, msg, ‘–‘);
// }

// console.important = function(msg) {
//     console.log(‘ % c % s % s % s’, ‘color: brown; font - weight: bold; text - decoration: underline;’, ‘–‘, msg, ‘–‘);
// }

// console.todo(“This is something that’ s need to be fixed”);
// console.important(‘This is an important message’);

//We can use the monitor() function  to keep track of it's arguments being passed in and values it's generating:

// monitor(calclulateScore) for instance in the console


//A faster way to do a querySelector in the console is with the dollar sign. $(‘css-selector’) will return the first match of CSS selector. $$(‘css-selector’) will return all of them. If you are using an element more than once, it’s worth saving it as a variable.

