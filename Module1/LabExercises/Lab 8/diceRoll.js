function rollDice() {
  const dice = parseInt(document.getElementById("diceSelect").value);
  const roll = Math.floor(Math.random() * dice) + 1;

  const diceImages = document.getElementById("diceImages");
  diceImages.src = `./images/d${dice}-${roll}.png`;
}

document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    rollDice();
  }
});
