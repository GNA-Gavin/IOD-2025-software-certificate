// Initialize global variables
let pokemon = null;

document.addEventListener("DOMContentLoaded", function() {
    // Get Pokemon ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonId = urlParams.get('id');
    
    if (pokemonId) {
        fetchPokemonDetails(pokemonId);
    } else {
        showError("No Pokémon ID provided!");
    }
});

function fetchPokemonDetails(id) {
// opportunity to use local data here too
    
    // Show loading state
    const container = document.getElementById("pokemon-detail-container");
    
    // Fetch the specific Pokemon data
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch Pokemon: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Format the Pokemon data
            pokemon = {
                abilities: data.abilities.map(ability => ({
                    ability: {
                        name: ability.ability.name,
                        url: ability.ability.url,
                    },
                    is_hidden: ability.is_hidden,
                    slot: ability.slot,
                })),
                height: data.height,
                id: data.id,
                name: data.name,
                sprites: {
                    other: {
                        "official-artwork": {
                            front_default: data.sprites.other["official-artwork"].front_default,
                        },
                    },
                },
                stats: data.stats.map(stat => ({
                    base_stat: stat.base_stat,
                    stat: {
                        name: stat.stat.name,
                    },
                })),
                types: data.types.map(type => ({
                    slot: type.slot,
                    type: {
                        name: type.type.name,
                    },
                })),
                weight: data.weight,
                generation: determineGeneration(data.id),
            };
            
            // Display the Pokemon details
            displayPokemonDetails(pokemon);
        })
        .catch(error => {
            showError(`Error fetching Pokémon #${id}: ${error.message}`);
            console.error("Error:", error);
        });
}

function determineGeneration(id) {
    if (id <= 151) return "Generation I";
    if (id <= 251) return "Generation II";
    if (id <= 386) return "Generation III";
    if (id <= 493) return "Generation IV";
    if (id <= 649) return "Generation V";
    if (id <= 721) return "Generation VI";
    if (id <= 809) return "Generation VII";
    if (id <= 905) return "Generation VIII";
    return "Generation IX";
}

function displayPokemonDetails(pokemon) {
    const container = document.getElementById("pokemon-detail-container");
    container.innerHTML = "";
    
    const template = document.getElementById("pokemon-detail-template").content.cloneNode(true);
    
    // Basic information
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    document.title = `${capitalizedName} | Pokémon Details`;
    template.querySelector(".card-title").textContent = capitalizedName;
    template.querySelector(".card-id").textContent = `Pokédex No. ${pokemon.id} (${pokemon.generation})`;
    
    // Set image
    const img = template.querySelector("img");
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.alt = pokemon.name;
    
    // Add types as badges
    const typesContainer = template.querySelector(".pokemon-types");
    pokemon.types.forEach(typeInfo => {
        const typeName = typeInfo.type.name;
        const badge = document.createElement("span");
        badge.className = `badge bg-${typeName} me-2`;
        badge.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1);
        typesContainer.appendChild(badge);
    });
    
    // Add abilities
    const abilitiesContainer = template.querySelector(".abilities-container");
    pokemon.abilities.forEach(abilityInfo => {
        const abilityRow = document.createElement("div");
        abilityRow.className = "ability-row mb-2";
        
        const abilityName = abilityInfo.ability.name
            .split("-")
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");
        
        if (abilityInfo.is_hidden) {
            abilityRow.innerHTML = `${abilityName} <span class="badge bg-secondary ability-hidden">Hidden</span>`;
        } else {
            abilityRow.textContent = abilityName;
        }
        
        abilitiesContainer.appendChild(abilityRow);
    });
    
    // Add stats
    const statsContainer = template.querySelector(".stats-container");
    pokemon.stats.forEach(statInfo => {
        const statRow = document.createElement("div");
        statRow.className = "stat-row mb-2";
        
        const statName = document.createElement("span");
        statName.className = "stat-name";
        statName.textContent = statInfo.stat.name.replace("-", " ") + ": ";
        
        const statValue = document.createElement("span");
        statValue.className = "stat-value";
        statValue.textContent = statInfo.base_stat;
        
        // Create progress bar for visual representation
        const progressContainer = document.createElement("div");
        progressContainer.className = "progress mt-1";
        progressContainer.style.height = "10px";
        
        const progressBar = document.createElement("div");
        progressBar.className = "progress-bar";
        progressBar.style.width = `${Math.min(100, (statInfo.base_stat / 255) * 100)}%`;
        progressBar.setAttribute("role", "progressbar");
        progressBar.setAttribute("aria-valuenow", statInfo.base_stat);
        progressBar.setAttribute("aria-valuemin", "0");
        progressBar.setAttribute("aria-valuemax", "255");
        
        progressContainer.appendChild(progressBar);
        
        statRow.appendChild(statName);
        statRow.appendChild(statValue);
        statRow.appendChild(progressContainer);
        statsContainer.appendChild(statRow);
    });
    
    // Set physical attributes
    template.querySelector(".height-value").textContent = `Height: ${(pokemon.height / 10).toFixed(1)} m`;
    template.querySelector(".weight-value").textContent = `Weight: ${(pokemon.weight / 10).toFixed(1)} kg`;
    
    container.appendChild(template);
}

function showError(message) {
    const container = document.getElementById("pokemon-detail-container");
    container.innerHTML = `
        <div class="col-md-8">
            <div class="alert alert-danger text-center">
                <h4>Error</h4>
                <p>${message}</p>
                <a href="mainPage.html" class="btn btn-primary mt-3">Back to All Pokémon</a>
            </div>
        </div>
    `;
}