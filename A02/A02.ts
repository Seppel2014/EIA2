//ist ganz hart buggy, hab zu spät angefangen und unnötig kompliziert ists auch

var startRestart: string = "start"; 

class Card {
    color: string;
    number: number;

    constructor(color: string, number: number) {
        this.color = color, this.number = number;
    }
}

var red1: Card = new Card("red", 1);
var red2: Card = new Card("red", 2);
var red3: Card = new Card("red", 3);
var red4: Card = new Card("red", 4);
var red5: Card = new Card("red", 5);
var red6: Card = new Card("red", 6);
var red7: Card = new Card("red", 7);
var red8: Card = new Card("red", 8);
var red9: Card = new Card("red", 9);

var green1: Card = new Card("green", 1);
var green2: Card = new Card("green", 2);
var green3: Card = new Card("green", 3);
var green4: Card = new Card("green", 4);
var green5: Card = new Card("green", 5);
var green6: Card = new Card("green", 6);
var green7: Card = new Card("green", 7);
var green8: Card = new Card("green", 8);
var green9: Card = new Card("green", 9);

var yellow1: Card = new Card("yellow", 1);
var yellow2: Card = new Card("yellow", 2);
var yellow3: Card = new Card("yellow", 3);
var yellow4: Card = new Card("yellow", 4);
var yellow5: Card = new Card("yellow", 5);
var yellow6: Card = new Card("yellow", 6);
var yellow7: Card = new Card("yellow", 7);
var yellow8: Card = new Card("yellow", 8);
var yellow9: Card = new Card("yellow", 9);

var blue1: Card = new Card("blue", 1);
var blue2: Card = new Card("blue", 2);
var blue3: Card = new Card("blue", 3);
var blue4: Card = new Card("blue", 4);
var blue5: Card = new Card("blue", 5);
var blue6: Card = new Card("blue", 6);
var blue7: Card = new Card("blue", 7);
var blue8: Card = new Card("blue", 8);
var blue9: Card = new Card("blue", 9);

var allCards: Card[] = [red1, red2, red3, red4, red5, red6, red7, red8, red9, green1, green2, green3, green4, green5, green6, green7, green8, green9, 
blue1, blue2, blue3, blue4, blue5, blue6, blue7, blue8, blue9, yellow1, yellow2, yellow3, yellow4, yellow5, yellow6, yellow7, yellow8, yellow9];

var playerCards: Card[] = [red1, red6, red3, yellow5, yellow2, green5, green3, blue4, blue5];
var npcCards: Card[] = [red2, red4, red7, yellow1, yellow3, green1, green2, green4, blue1];
var tableCards: Card[] = [red5, red8, red9, yellow4, yellow6, yellow7, yellow8, yellow9, green6, green7, green8, green9, blue2, blue3, blue6, blue7, blue8, blue9];

function checkstart() { //Ändert Startbutton zu Reloadbutton und startet hauptfunktion
if (startRestart == "start") {
    startRestart = "restart";
    console.log("start"); //temporär
    
    createPlayerButtons();
    createPcCards();


}
else {location.reload(); }
}

function createPlayerButtons() { //Macht karten des spielers, könnte man zusammenlegen mit createPcCards mit Parametern

for (let i = 0; i < playerCards.length; i++) {

setTimeout(function() { //ohne timeout läuft es zu schnell durch und die button.id werden alle zum letzten slot im array gesetzt
var id = ((playerCards[i].color + playerCards[i].number.toString()));

var div = document.getElementById("playerArea");
var button = document.createElement("button");
button.id = id;
var text = document.createTextNode(playerCards[i].number.toString());

// https://www.rapidtables.com/web/color/RGB_Color.html
if (playerCards[i].color == "red") {
    button.style.backgroundColor = "RED";
}
if (playerCards[i].color == "green") {
    button.style.backgroundColor = "Green";
}
if (playerCards[i].color == "blue") {
    button.style.backgroundColor = "Blue";
}
if (playerCards[i].color == "yellow") {
    button.style.backgroundColor = "gold";
}

button.appendChild(text);
div?.appendChild(button);


button.onclick = function() {checkCards(playerCards[i].color, playerCards[i].number, id); };
},         20);

}
}

function createPcCards() {

setTimeout(function() {
var id = ((tableCards[0].color + tableCards[0].number.toString()));
var div = document.getElementById("pcArea");
var button = document.createElement("button");
var text = document.createTextNode(tableCards[0].number.toString());
button.id = id;
// https://www.rapidtables.com/web/color/RGB_Color.html
if (tableCards[0].color == "red") {
    button.style.backgroundColor = "RED";
}
if (tableCards[0].color == "green") {
    button.style.backgroundColor = "Green";
}
if (tableCards[0].color == "blue") {
    button.style.backgroundColor = "Blue";
}
if (tableCards[0].color == "yellow") {
    button.style.backgroundColor = "gold";
}
button.appendChild(text);
div?.appendChild(button);
},         20); 
}


function checkCards(color: string, number: number, id: string) {
console.log(npcCards);
if (color == tableCards[0].color || number == tableCards[0].number) {
    removeCards(id);
    console.log("removeCards");
    }
else {
    addCards();
    console.log("addCards");
    }   
}

function removeCards(id: string){

var childNodePlayer = document.getElementById(id);
document.getElementById("playerArea")?.removeChild(childNodePlayer);

var idPc = tableCards[0].color + tableCards[0].number.toString();

tableCards.splice(0, 1);

var childNodePc = document.getElementById(idPc);
document.getElementById("pcArea")?.removeChild(childNodePc);
createPcCards();
checkWin("player");
setTimeout(function() {
npcPlays();
},         20);
}

function npcPlays() {
for (let i = 0; i <= npcCards.length; i++) {    
    if (tableCards[0].color == npcCards[i].color || tableCards[0].number == npcCards[i].number) {
    var idPc = tableCards[0].color + tableCards[0].number.toString();

    tableCards.splice(0, 1);
    npcCards.splice(i, i +1);
    var childNodePc = document.getElementById(idPc);
    document.getElementById("pcArea")?.removeChild(childNodePc);
    checkWin("npc");
    createPcCards();    
    return;
    }
    else {
    var n: number = Math.floor(Math.random() * tableCards.length);
    var newCard: Card = tableCards[n];
    npcCards.push(newCard);
    }
    }
}

function addCards() {
setTimeout(function() { //ohne timeout läuft es zu schnell durch und die button.id werden alle zum letzten slot im array gesetzt
var i: number = Math.floor(Math.random() * tableCards.length);

var id = ((tableCards[i].color + tableCards[i].number.toString()));

var div = document.getElementById("playerArea");
var button = document.createElement("button");
button.id = id;
var text = document.createTextNode(tableCards[i].number.toString());

// https://www.rapidtables.com/web/color/RGB_Color.html
if (tableCards[i].color == "red") {
    button.style.backgroundColor = "RED";
}
if (tableCards[i].color == "green") {
    button.style.backgroundColor = "Green";
}
if (tableCards[i].color == "blue") {
    button.style.backgroundColor = "Blue";
}
if (tableCards[i].color == "yellow") {
    button.style.backgroundColor = "gold";
}

button.appendChild(text);
div?.appendChild(button);

button.onclick = function() {checkCards(tableCards[i].color, tableCards[i].number, id); };
},         20);
npcPlays();
}

function checkWin(npcOrPlayer: string) {
    switch (npcOrPlayer){
        case("player"): if (playerCards.length <= 0) {
            alert("Du hast gewonnen");
        }
        case("npc"): if (npcCards.length <= 0) {
            alert("Du hast verloren, wie hast du das gemacht ???");
        }
        default: return;
    }
}

//Ersters Versuch implementieren des random füllens der drei arrays player npc und table
/*function RandomArray(array, length: number) {
    var allCardsTemporary = [];
    var i = length;

    while (array.length >= 0) {
        var j = Math.floor(Math.random() * (length + 1));

        if (i >= 1) {
            if(array[j] != undefined && !allCardsTemporary.includes(array[j])) {
            allCardsTemporary.push(allCards[j]);
            array.splice(j, j);
            i--;
            }
        }
        else {
        j = 0;
        }
    }
    
    allCards = allCardsTemporary;

    console.log(array);
    console.log(allCards);
}*/




