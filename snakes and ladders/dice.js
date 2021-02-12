function hideNumbers() {
     const numbers = document.getElementsByClassName("diceNumber");
     for (var i = 0; i < numbers.length; i++) {
          numbers[i].style.display = "none";
     }
}

function showNumber() {
     hideNumbers();
     diceNumber = Math.floor(Math.random() * 6) + 1;
     let diceString = diceNumber.toString();
     let diceID = `dice${diceString}`;
     document.getElementById(diceID).style.display = "block";
}
showNumber();
