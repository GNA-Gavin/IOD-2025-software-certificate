let pokemon = ["Pikachu", "Charizard", "Venusaur", "Blastoise", "Zapdos"];

console.log(pokemon);

pokemon[0] = "Mewtwo"; // unsure if the "position" in the exercise question is referring to the element number or actual order
pokemon[3] = "Snom";
console.log(pokemon);

pokemon.unshift("Nidoking"); // beginning of the Array
console.log(pokemon);

pokemon.push("Abra"); // end of the Array
console.log(pokemon);