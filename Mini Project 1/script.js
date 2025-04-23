let pokemon = [];
let generations = new Set();
let types = new Set();
let currentGeneration = "All";
let currentType = "All";
let currentSortBy = "id";
let currentSearchTerm = "";

document.addEventListener("DOMContentLoaded", function () {
  setupSortOptions(); // this does not rely on any api data
  setupLiveSearch(); // added this after the initial search functionality to allow for searching while typing

  // First fetch the Pokémon data
  fetchPokemonData() // returns a promise data is populated before remaining functions are called
    .then(() => {
      populateGenerations(); // Then populate generations once data is available
      populateTypes(); /// next in navbar
      // Then display Pokémon
      filterSortAndDisplay(); // using this function since the initial array may not have been fetched in order
    })
    .catch((error) => {
      console.error("Failed to initialize app:", error);
    });
});

document.querySelector("form").addEventListener("submit", function (event) {
  //this stops the form submission
  event.preventDefault();
});

function showLoading(
  message = "Loading Pokémon data...",
  containerId = "pokemon-container"
) {
  const container = document.getElementById(containerId);

  container.innerHTML = `<div class="col-12 text-center mt-5">
      <h3>${message}</h3>
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>`;
}

function fetchPokemonData() {
  const cachedData = localStorage.getItem('pokemonData');
  
  if (cachedData) {
    try {
      // Parse and use the cached data
      pokemon = JSON.parse(cachedData);
      console.log(`Loaded ${pokemon.length} Pokémon from cache`);
      
      // Extract generations and types from cached data
      pokemon.forEach(p => {
        generations.add(p.generation);
        p.types.forEach(typeObj => {
          types.add(typeObj.type.name);
        });
      });
      
      console.log("Cached generations:", [...generations]);
      console.log("Cached types:", [...types]);
      
      // Return a resolved promise so the chain continues
      return Promise.resolve(pokemon);
    } catch (e) {
      console.error("Error parsing cached Pokémon data:", e);
      // If there was an error parsing the cache, continue to fetch from API
    }
  }

  // Clear existing data
  pokemon = [];
  generations = new Set();
  types = new Set();

  showLoading();

  const numberOfPokemon = 1024; // was not able to find a reliable way of doing this in the time constraints
  const fetchPromises = [];

  for (let i = 1; i <= numberOfPokemon; i++) {
    const promise = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch Pokemon: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Extract only the needed properties
        const pokemonData = {
          abilities: data.abilities.map((ability) => ({
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
                front_default:
                  data.sprites.other["official-artwork"].front_default,
              },
            },
          },
          stats: data.stats.map((stat) => ({
            base_stat: stat.base_stat,
            stat: {
              name: stat.stat.name,
            },
          })),
          types: data.types.map((type) => ({
            slot: type.slot,
            type: {
              name: type.type.name,
            },
          })),
          weight: data.weight,
          generation: determineGeneration(data.id), // Determine generation based on ID since was not available via the API
        };

        pokemon.push(pokemonData);
        generations.add(pokemonData.generation);
        data.types.forEach((typeObj) => {
          types.add(typeObj.type.name);
        });

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
      })
      .catch((error) => {
        console.error("Error fetching Pokemon data:", error);
        throw error;
      });
    fetchPromises.push(promise);
  }
  console.log(pokemon);
  console.log(generations);
  console.log(types);

  return Promise.all(fetchPromises)
    .then((results) => {
      console.log(`Loaded ${results.length} Pokémon`);
      console.log("Generations:", [...generations]);
      localStorage.setItem('pokemonData', JSON.stringify(pokemon));
      return results;
    })
    .catch((error) => {
      console.error("Error fetching Pokémon:", error);
      return [];
    });
}

function populateGenerations() {
  // Get the select element instead of dropdown menu
  const generationSelect = document.getElementById("generation-select");

  // Make sure "All" is selected by default
  generationSelect.value = "All";

  // Add generation options from the set
  [...generations].sort().forEach((generation) => {
    const option = document.createElement("option");
    option.value = generation;
    option.textContent = generation;
    generationSelect.appendChild(option);
  });

  // Add change event listener
  generationSelect.addEventListener("change", function () {
    currentGeneration = this.value;
    console.log(`Generation filter changed to: ${currentGeneration}`);
    filterSortAndDisplay(currentGeneration, null, null, null);
  });
}

function populateTypes() {
  // Get the select element instead of dropdown menu
  const typeSelect = document.getElementById("type-select");

  if (!typeSelect) {
    console.error("Type select element not found!");
    return;
  }

  // Make sure "All" is selected by default
  typeSelect.value = "All";

  // Add generation options from the set
  [...types].sort().forEach((type) => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeSelect.appendChild(option);
  });

  // Add change event listener
  typeSelect.addEventListener("change", function () {
    currentType = this.value;
    console.log(`Type filter changed to: ${currentType}`);
    filterSortAndDisplay(null, currentType, null, null);
  });
}

/// update for pokemon
function setupSortOptions() {
  // Get the select element instead of dropdown items
  const sortSelect = document.getElementById("sort-options");

  if (!sortSelect) {
    console.error("Sort options select element not found!");
    return;
  }

  // Listen for change event on the select element
  sortSelect.addEventListener("change", function () {
    console.log("Sort changed:", this.value);

    // Get the selected option value
    const sortOption =
      this.value || this.options[this.selectedIndex].getAttribute("data-sort");
    console.log("Selected sort option:", sortOption);

    // Update current sort
    currentSort = sortOption;

    // Filter and display with new sort
    filterSortAndDisplay(null, null, sortOption, null);
  });
}

function filterSortAndDisplay(
  generation = null,
  type = null,
  sortOption = null,
  searchTerm = null
) {
  // Update globals if provided
  if (generation !== null) currentGeneration = generation;
  if (type !== null) currentType = type;
  if (sortOption !== null) currentSortBy = sortOption;
  if (searchTerm !== null) currentSearchTerm = searchTerm;

  showLoading("Filtering Pokemon...");

  // Get filtered and sorted pokemon
  const filteredPokemon = getFilteredAndSortedPokemon();

  // Clear container
  const container = document.getElementById("pokemon-container");
  if (!container) {
    console.error("Pokemon container element not found!");
    return;
  }

  container.innerHTML = "";

  // Handle empty results with appropriate message
  if (filteredPokemon.length === 0) {
    let message = "No Pokémon found";

    if (
      currentSearchTerm &&
      currentGeneration !== "All" &&
      currentType !== "All"
    ) {
      message = `No Pokémon matching "${currentSearchTerm}" in ${currentGeneration} of ${currentType} type`;
    } else if (currentSearchTerm) {
      message = `No Pokémon found matching "${currentSearchTerm}"`;
    } else if (currentGeneration !== "All" && currentType !== "All") {
      message = `No ${currentType} type Pokémon found in ${currentGeneration}`;
    } else if (currentGeneration !== "All") {
      message = `No Pokémon found in ${currentGeneration}`;
    } else if (currentType !== "All") {
      message = `No ${currentType} type Pokémon found`;
    }

    container.innerHTML = `<div class="col-12 text-center mt-5">
              <h3>${message}</h3>
          </div>`;
    return;
  }

  // Display pokemon
  displayPokemon(filteredPokemon);
}

function getFilteredAndSortedPokemon(
  generation = null,
  type = null,
  sortOption = null,
  searchTerm = null
) {
  // Use parameters or fall back to current global values
  generation = generation || currentGeneration;
  type = type || currentType;
  sortOption = sortOption || currentSortBy;
  searchTerm = searchTerm || currentSearchTerm;

  // Start with all pokemon
  let filteredPokemon = [...pokemon];

  // Apply generation filter if provided and not "All"
  if (generation && generation !== "All") {
    filteredPokemon = filteredPokemon.filter(
      (p) => p.generation === generation
    );
  }

  // Apply type filter if provided and not "All"
  if (type && type !== "All") {
    filteredPokemon = filteredPokemon.filter((p) =>
      p.types.some((t) => t.type.name === type)
    );
  }

  // Apply search filter if provided
  if (searchTerm && searchTerm.trim() !== "") {
    const search = searchTerm.toLowerCase().trim();
    filteredPokemon = filteredPokemon.filter(
      (p) => p.name.toLowerCase().includes(search) || p.id.toString() === search
    );
  }

  // Apply sorting based on option
  switch (sortOption) {
    case "id":
      filteredPokemon.sort((a, b) => a.id - b.id);
      break;
    case "name":
      filteredPokemon.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "height-desc":
      filteredPokemon.sort((a, b) => b.height - a.height);
      break;
    case "height-asc":
      filteredPokemon.sort((a, b) => a.height - b.height);
      break;
    case "weight-desc":
      filteredPokemon.sort((a, b) => b.weight - a.weight);
      break;
    case "weight-asc":
      filteredPokemon.sort((a, b) => a.weight - b.weight);
      break;
    // Handle all the stat sorting options
    case "hp-desc":
      filteredPokemon.sort(
        (a, b) => getStatValue(b, "hp") - getStatValue(a, "hp")
      );
      break;
    case "hp-asc":
      filteredPokemon.sort(
        (a, b) => getStatValue(a, "hp") - getStatValue(b, "hp")
      );
      break;
    case "attack-desc":
      filteredPokemon.sort(
        (a, b) => getStatValue(b, "attack") - getStatValue(a, "attack")
      );
      break;
    case "attack-asc":
      filteredPokemon.sort(
        (a, b) => getStatValue(a, "attack") - getStatValue(b, "attack")
      );
      break;
    case "defense-desc":
      filteredPokemon.sort(
        (a, b) => getStatValue(b, "defense") - getStatValue(a, "defense")
      );
      break;
    case "defense-asc":
      filteredPokemon.sort(
        (a, b) => getStatValue(a, "defense") - getStatValue(b, "defense")
      );
      break;
    case "special-attack-desc":
      filteredPokemon.sort(
        (a, b) =>
          getStatValue(b, "special-attack") - getStatValue(a, "special-attack")
      );
      break;
    case "special-attack-asc":
      filteredPokemon.sort(
        (a, b) =>
          getStatValue(a, "special-attack") - getStatValue(b, "special-attack")
      );
      break;
    case "special-defense-desc":
      filteredPokemon.sort(
        (a, b) =>
          getStatValue(b, "special-defense") -
          getStatValue(a, "special-defense")
      );
      break;
    case "special-defense-asc":
      filteredPokemon.sort(
        (a, b) =>
          getStatValue(a, "special-defense") -
          getStatValue(b, "special-defense")
      );
      break;
    case "speed-desc":
      filteredPokemon.sort(
        (a, b) => getStatValue(b, "speed") - getStatValue(a, "speed")
      );
      break;
    case "speed-asc":
      filteredPokemon.sort(
        (a, b) => getStatValue(a, "speed") - getStatValue(b, "speed")
      );
      break;
    default:
      // Default sort by ID
      filteredPokemon.sort((a, b) => a.id - b.id);
  }

  return filteredPokemon;
}

// Helper function to get stat value by name
function getStatValue(pokemon, statName) {
  const stat = pokemon.stats.find((s) => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
}

function displayPokemon(pokemonArray) {
  const container = document.getElementById("pokemon-container");
  container.innerHTML = "";

  pokemonArray.forEach((pokemon) => {
    const template = document.getElementById("pokemon-template").content.cloneNode(true);
    const card = template.querySelector(".card");

    // Make card clickable
    // Add ID as data attribute for easy reference
    card.setAttribute("data-pokemon-id", pokemon.id);
    
    // Add click handler to the card
    card.addEventListener("click", function() {
      const pokemonId = this.getAttribute("data-pokemon-id");
      window.location.href = `pokemon-details.html?id=${pokemonId}`;
    });
    
    // Basic information
    const capitalizedName = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
    template.querySelector(".card-title").textContent = capitalizedName;
    template.querySelector(".card-id").textContent = `Pokédex No. ${pokemon.id}`;

    // Set image
    const img = template.querySelector("img");
    img.src = pokemon.sprites.other["official-artwork"].front_default;
    img.alt = pokemon.name;

    // Add types as badges
    const typesContainer = template.querySelector(".pokemon-types");
    pokemon.types.forEach((typeInfo) => {
      const typeName = typeInfo.type.name;
      const badge = document.createElement("span");
      badge.className = `badge bg-${typeName}`;
      badge.textContent = typeName.charAt(0).toUpperCase() + typeName.slice(1);
      typesContainer.appendChild(badge);
    });

    // Add abilities
    const abilitiesContainer = template.querySelector(".abilities-container");
    abilitiesContainer.innerHTML = "";
    pokemon.abilities.forEach((abilityInfo) => {
      const abilityRow = document.createElement("div");
      abilityRow.className = "ability-row";

      const abilityName = abilityInfo.ability.name
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

        if (abilityInfo.is_hidden) {
          abilityRow.innerHTML = `${abilityName} <span class="badge bg-secondary ability-hidden">Hidden</span>`;
        } else {
      abilityRow.textContent = abilityName;
        }

      abilitiesContainer.appendChild(abilityRow);
    });

    // Set physical attributes
    template.querySelector(".height-value").textContent = `Height: ${(
      pokemon.height / 10
    ).toFixed(1)} m`;
    template.querySelector(".weight-value").textContent = `Weight: ${(
      pokemon.weight / 10
    ).toFixed(1)} kg`;

    container.appendChild(template);
  });
}

// function searchPokemon(event) {
//   // Prevent form submission if called from a form
//   if (event) {
//     event.preventDefault();
//   }

//   // Get search term from input
//   const searchInput = document.getElementById("searchInput");
//   const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";

//   console.log(`Searching for: "${searchTerm}"`);

//   // Update current search term
//   currentSearchTerm = searchTerm;

//   // Call filter function with the search term (keeping other filter values)
//   filterSortAndDisplay(null, null, null, searchTerm);
// }

function setupLiveSearch() {
  const searchInput = document.getElementById("searchInput");

  if (!searchInput) {
    console.error("Search input not found!");
    return;
  }

  // Debounce function to avoid too many searches while typing
  let debounceTimer;

  searchInput.addEventListener("input", function () {
    clearTimeout(debounceTimer);

    // Wait 300ms after the user stops typing before searching
    debounceTimer = setTimeout(() => {
      const searchTerm = this.value.trim().toLowerCase();
      console.log(`Live searching for: "${searchTerm}"`);

      // Update current search term
      currentSearchTerm = searchTerm;

      // Call filter function with the search term
      filterSortAndDisplay(null, null, null, searchTerm);
    }, 300);
  });
}
