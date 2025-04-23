// Global variables
let pokemon = [];
let battleHistory = [];

// Initialize
document.addEventListener("DOMContentLoaded", function() {
    // Load Pokemon data
    fetchPokemonData();

    // Set up event listeners
    document.getElementById("battle-form").addEventListener("submit", startBattle);
    document.getElementById("battle-again").addEventListener("click", resetBattle);
    
    // Load battle history from local storage if available
    loadBattleHistory();
    // localStorage.removeItem('pokemonBattleHistory'); // testing
    // battleHistory = []; // 
    // document.getElementById("clear-history").addEventListener("click", clearBattleHistory); was looking at adding a clear history button this but ran out of time
    
    // Add event listener for Pokémon selection
    document.getElementById("pokemon-select").addEventListener("change", showPokemonPreview);
    document.getElementById("stat-select").addEventListener("change", highlightSelectedStat);
});

// Fetch Pokemon data for battle
function fetchPokemonData() {
    // check local storage if pokemon have already been fetched
    const cachedData = localStorage.getItem('pokemonData');
    
    if (cachedData) {
        try {
            pokemon = JSON.parse(cachedData);
            populatePokemonSelect();
            console.log("Loaded Pokémon data from cache");
            return Promise.resolve(pokemon);
        } catch (e) {
            console.error("Error parsing cached Pokémon data", e);
            // Continue with normal fetch
        }
    }
    
    // Show loading state in the pokemon select
    const pokemonSelect = document.getElementById("pokemon-select");
    pokemonSelect.innerHTML = '<option value="">Loading Pokémon...</option>';
    
    // Fetch a reasonable number of Pokemon
    const numberOfPokemon = 1024; // all current pokemon
    const fetchPromises = [];
    
    for (let i = 1; i <= numberOfPokemon; i++) {
        const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch Pokemon: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // Extract only the needed properties
                const pokemonData = {
                    id: data.id,
                    name: data.name,
                    sprites: {
                        other: {
                            "official-artwork": {
                                front_default: data.sprites.other["official-artwork"].front_default
                            }
                        }
                    },
                    stats: data.stats.map(stat => ({
                        base_stat: stat.base_stat,
                        stat: {
                            name: stat.stat.name
                        }
                    }))
                };
                
                return pokemonData;
            });
        
        fetchPromises.push(promise);
    }
    
    Promise.all(fetchPromises)
        .then(results => {
            pokemon = results;
            populatePokemonSelect();
            console.log(`Loaded ${pokemon.length} Pokémon for battle`);
            localStorage.setItem('pokemonData', JSON.stringify(pokemon));
        })
        .catch(error => {
            console.error("Error fetching Pokémon:", error);
            pokemonSelect.innerHTML = '<option value="">Error loading Pokémon</option>';
        });
}

// Populate the Pokemon select dropdown
function populatePokemonSelect() {
    const pokemonSelect = document.getElementById("pokemon-select");
    
    // Clear and add default option
    pokemonSelect.innerHTML = '<option value="">Select a Pokémon</option>';
    
    // Sort by ID
    pokemon.sort((a, b) => a.id - b.id);
    
    // Add each Pokemon as an option
    pokemon.forEach(p => {
        const option = document.createElement("option");
        option.value = p.id;
        // Capitalize first letter
        const name = p.name.charAt(0).toUpperCase() + p.name.slice(1);
        option.textContent = `#${p.id} - ${name}`;
        pokemonSelect.appendChild(option);
    });
}

// Start a battle
function startBattle(event) {
    event.preventDefault();

    // Ensure pokemon data is loaded first
    if (pokemon.length === 0) {
        alert("Please wait for Pokémon data to load!");
        return;
    }
    
    // Get form values
    let pokemonId = document.getElementById("pokemon-select").value;
    let statName = document.getElementById("stat-select").value;
    
    // Random Pokémon selection if none selected
    if (!pokemonId || pokemonId === "") {
        // First disable the required attribute temporarily
        const pokemonSelect = document.getElementById("pokemon-select");
        const wasRequired = pokemonSelect.hasAttribute("required");
        if (wasRequired) {
            pokemonSelect.removeAttribute("required");
        }
        
        // Get a random existing Pokémon from the list
        const options = pokemonSelect.options;
        if (options.length <= 1) {
            alert("No Pokémon available yet. Please wait for data to load.");
            return;
        }
        
        // Skip the first option (which is the placeholder)
        const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
        pokemonId = options[randomIndex].value;
        
        // Set the value
        pokemonSelect.value = pokemonId;
        
        // Restore required attribute if it was there
        if (wasRequired) {
            pokemonSelect.setAttribute("required", "");
        }
        
        // Update preview
        showPokemonPreview();
        
        console.log(`Random Pokémon selected: #${pokemonId}`);
    }
    
    // Similar approach for stat selection
    if (!statName || statName === "") {
        const statSelect = document.getElementById("stat-select");
        const wasRequired = statSelect.hasAttribute("required");
        if (wasRequired) {
            statSelect.removeAttribute("required");
        }
        
        // Get all available options
        const options = statSelect.options;
        if (options.length <= 1) {
            alert("No stats available. Please refresh the page.");
            return;
        }
        
        // Skip the first option (placeholder)
        const randomIndex = Math.floor(Math.random() * (options.length - 1)) + 1;
        statName = options[randomIndex].value;
        
        // Set value
        statSelect.value = statName;
        
        // Restore required attribute
        if (wasRequired) {
            statSelect.setAttribute("required", "");
        }
        
        // Update highlight
        highlightSelectedStat();
        
        console.log(`Random stat selected: ${statName}`);
    }
    
    // Find selected Pokemon (ensure it exists)
    const selectedPokemon = pokemon.find(p => p.id == pokemonId);
    
    if (!selectedPokemon) {
        console.error("Selected Pokémon not found:", pokemonId);
        alert("Error: Selected Pokémon not found. Please try again.");
        return;
    }
    
    let opponent;
    do {
        const randomIndex = Math.floor(Math.random() * pokemon.length);
        opponent = pokemon[randomIndex];
    } while (opponent.id == selectedPokemon.id);
    
    // Get stat values
    const yourStatValue = getStatValue(selectedPokemon, statName);
    const opponentStatValue = getStatValue(opponent, statName);
    
    // Determine the result
    let result;
    if (yourStatValue > opponentStatValue) {
        result = "win";
    } else if (yourStatValue < opponentStatValue) {
        result = "lose";
    } else {
        result = "draw";
    }
    
    // Record battle history
    const battleRecord = {
        date: new Date(),
        yourPokemon: selectedPokemon.name,
        yourPokemonId: selectedPokemon.id,
        opponentPokemon: opponent.name,
        opponentPokemonId: opponent.id,
        stat: statName,
        yourValue: yourStatValue,
        opponentValue: opponentStatValue,
        result: result
    };

    battleHistory.unshift(battleRecord); // Add to beginning of array
    if (battleHistory.length > 10) {
        battleHistory.pop(); // Keep only the last 10 battles
    }
    
    // Save to local storage
    saveBattleHistory();
    
    // Display the battle result
    displayBattleResult(selectedPokemon, opponent, statName, yourStatValue, opponentStatValue, result);
    updateBattleHistory();
}

// Display the battle result
function displayBattleResult(yourPokemon, opponent, statName, yourStatValue, opponentStatValue, result) {
    // Hide instructions and show result container
    document.getElementById("battle-instruction").style.display = "none";
    document.getElementById("battle-result").style.display = "block";
    
    // Format stat name for display
    const formattedStatName = statName.replace('-', ' ');
    
    // Your Pokemon display - use the template structure
    const yourPokemonDisplay = document.getElementById("your-pokemon");
    yourPokemonDisplay.innerHTML = "";
    
    const yourTemplate = document.getElementById("battle-card-structure").content.cloneNode(true);
    
    // Update your Pokémon data
    yourTemplate.querySelector(".pokemon-name").textContent = yourPokemon.name.charAt(0).toUpperCase() + yourPokemon.name.slice(1);
    yourTemplate.querySelector(".pokemon-img").src = yourPokemon.sprites.other["official-artwork"].front_default;
    yourTemplate.querySelector(".pokemon-img").alt = yourPokemon.name;
    yourTemplate.querySelector(".stat-name").textContent = formattedStatName;
    yourTemplate.querySelector(".stat-value").textContent = yourStatValue;
    
    // Apply winner/loser class directly to the card
    const yourCard = yourTemplate.querySelector(".pokemon-battle-card");
    if (result === "win") {
        yourCard.classList.add("winner");
    } else if (result === "lose") {
        yourCard.classList.add("loser");
    }
    
    yourPokemonDisplay.appendChild(yourTemplate);
    
    // Opponent Pokemon display - use the template structure
    const opponentPokemonDisplay = document.getElementById("opponent-pokemon");
    opponentPokemonDisplay.innerHTML = "";
    
    const opponentTemplate = document.getElementById("battle-card-structure").content.cloneNode(true);
    
    // Update opponent Pokémon data
    opponentTemplate.querySelector(".pokemon-name").textContent = opponent.name.charAt(0).toUpperCase() + opponent.name.slice(1);
    opponentTemplate.querySelector(".pokemon-img").src = opponent.sprites.other["official-artwork"].front_default;
    opponentTemplate.querySelector(".pokemon-img").alt = opponent.name;
    opponentTemplate.querySelector(".stat-name").textContent = formattedStatName;
    opponentTemplate.querySelector(".stat-value").textContent = opponentStatValue;
    
    // Apply winner/loser class
    const opponentCard = opponentTemplate.querySelector(".pokemon-battle-card");
    if (result === "lose") {
        opponentCard.classList.add("winner");
    } else if (result === "win") {
        opponentCard.classList.add("loser");
    }
    
    opponentPokemonDisplay.appendChild(opponentTemplate);
    
    // Set message values
    document.querySelectorAll(".your-pokemon-name").forEach(el => {
        el.textContent = yourPokemon.name;
    });
    document.querySelectorAll(".opponent-pokemon-name").forEach(el => {
        el.textContent = opponent.name;
    });
    document.querySelectorAll(".stat-name").forEach(el => {
        el.textContent = formattedStatName;
    });
    
    // Show the appropriate message
    document.getElementById("win-message").style.display = "none";
    document.getElementById("lose-message").style.display = "none";
    document.getElementById("draw-message").style.display = "none";
    
    if (result === "win") {
        document.getElementById("win-message").style.display = "block";
    } else if (result === "lose") {
        document.getElementById("lose-message").style.display = "block";
    } else {
        document.getElementById("draw-message").style.display = "block";
    }
    
    // Apply animation after a short delay
    setTimeout(() => {
        const battleCards = document.querySelectorAll(".pokemon-battle-card");
        battleCards.forEach(card => {
            // Force a reflow
            void card.offsetWidth;
            card.classList.add("battle-animation");
        });
        
        // Remove animation class after animation completes
        setTimeout(() => {
            battleCards.forEach(card => {
                card.classList.remove("battle-animation");
            });
        }, 500); // Match to animation duration
    }, 100);
}

// Reset the battle arena for a new battle
function resetBattle() {
    document.getElementById("battle-instruction").style.display = "block";
    document.getElementById("battle-result").style.display = "none";
    
    // Reset form selections
    document.getElementById("pokemon-select").selectedIndex = 0;
    document.getElementById("stat-select").selectedIndex = 0;
    
    // Hide preview
    document.getElementById("pokemon-preview").style.display = "none";
}

// Update the battle history display
function updateBattleHistory() {
    const historyContainer = document.getElementById("battle-history");
    const noHistoryMessage = document.getElementById("no-history-message");
    
    // Log for debugging
    console.log("Updating battle history with", battleHistory.length, "entries");
    
    // Clear ALL existing content first
    historyContainer.innerHTML = '';
    
    // Add the no-history message back if needed
    historyContainer.appendChild(noHistoryMessage);
    
    // Show/hide no history message
    if (!battleHistory || battleHistory.length === 0) {
        noHistoryMessage.style.display = "block";
        return;
    } else {
        noHistoryMessage.style.display = "none";
    }
    
    // Add history entries from template
    battleHistory.forEach((battle, index) => {
        try {
            const template = document.getElementById("history-entry-template").content.cloneNode(true);
            
            // Fill in the data
            template.querySelector(".your-name").textContent = capitalize(battle.yourPokemon);
            template.querySelector(".opponent-name").textContent = capitalize(battle.opponentPokemon);
            template.querySelector(".stat-name").textContent = battle.stat.replace('-', ' ');
            template.querySelector(".your-value").textContent = battle.yourValue;
            template.querySelector(".opponent-value").textContent = battle.opponentValue;
            
            // Set result text and class
            const resultElement = template.querySelector(".result");
            if (battle.result === "win") {
                resultElement.textContent = "Victory!";
                resultElement.className = "result result-win";
            } else if (battle.result === "lose") {
                resultElement.textContent = "Defeat!";
                resultElement.className = "result result-lose";
            } else {
                resultElement.textContent = "Draw!";
                resultElement.className = "result result-draw";
            }
            
            // Format date safely
            let dateText = "Recent";
            try {
                dateText = formatDate(battle.date);
            } catch (e) {
                console.warn("Could not format date:", e);
            }
            template.querySelector(".battle-time").textContent = dateText;
            
            historyContainer.appendChild(template);
        } catch (e) {
            console.error("Error creating history entry", index, battle, e);
        }
    });
    
    console.log("Battle history display updated");
}

// Helper function for capitalization
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Helper function to format date
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleString();
}

// Helper function to get stat value by name
function getStatValue(pokemon, statName) {
    const stat = pokemon.stats.find(s => s.stat.name === statName);
    return stat ? stat.base_stat : 0;
}

// Save battle history to local storage
function saveBattleHistory() {
    localStorage.setItem('pokemonBattleHistory', JSON.stringify(battleHistory));
}

// Load battle history from local storage
function loadBattleHistory() {
    const savedHistory = localStorage.getItem('pokemonBattleHistory');
    if (savedHistory) {
        try {
            battleHistory = JSON.parse(savedHistory);
            updateBattleHistory();
        } catch (e) {
            console.error("Error loading battle history:", e);
            battleHistory = [];
        }
    }
}

// Update showPokemonPreview function to use existing HTML structure
function showPokemonPreview() {
  const pokemonSelect = document.getElementById("pokemon-select");
  const pokemonId = pokemonSelect.value;
  const previewSection = document.getElementById("pokemon-preview");
  
  // Hide preview if no Pokémon selected
  if (!pokemonId) {
    previewSection.style.display = "none";
    return;
  }
  
  // Find the selected Pokémon
  const selectedPokemon = pokemon.find(p => p.id == pokemonId);
  if (!selectedPokemon) return;
  
  // Update preview image and name
  document.getElementById("preview-image").src = selectedPokemon.sprites.other["official-artwork"].front_default;
  document.getElementById("preview-name").textContent = selectedPokemon.name.charAt(0).toUpperCase() + selectedPokemon.name.slice(1);
  
  // Max stat value for calculating percentage
  const maxStatValue = 255;
  
  // Update each stat in the existing structure
  const statElements = document.querySelectorAll("#preview-stats .stat-preview");
  statElements.forEach(element => {
    const statName = element.getAttribute("data-stat");
    const statValue = getStatValue(selectedPokemon, statName);
    const percentage = Math.min(100, (statValue / maxStatValue) * 100);
    
    // Update text value
    element.querySelector(".stat-value").textContent = statValue;
    
    // Update progress bar
    const progressBar = element.querySelector(".progress-bar");
    progressBar.style.width = `${percentage}%`;
    progressBar.setAttribute("aria-valuenow", statValue);
    
    // Set color based on stat value
    progressBar.className = "progress-bar";
    if (statValue < 50) progressBar.classList.add("bg-danger");
    else if (statValue < 80) progressBar.classList.add("bg-warning");
    else if (statValue < 120) progressBar.classList.add("bg-success");
    else progressBar.classList.add("bg-primary");
  });
  
  // Show preview section
  previewSection.style.display = "block";
  
  // Highlight the stat selected in the dropdown
  highlightSelectedStat();
}

// Add this function to highlight the currently selected stat
function highlightSelectedStat() {
  const statSelect = document.getElementById("stat-select");
  const selectedStat = statSelect.value;
  
  if (!selectedStat) return;
  
  // Remove highlighting from all stats
  const statElements = document.querySelectorAll("#preview-stats .stat-preview");
  statElements.forEach(el => el.classList.remove("selected-stat"));
  
  // Find and highlight the selected stat
  const statNames = ["hp", "attack", "defense", "special-attack", "special-defense", "speed"];
  const index = statNames.indexOf(selectedStat);
  
  if (index >= 0 && index < statElements.length) {
    statElements[index].classList.add("selected-stat");
  }
}


