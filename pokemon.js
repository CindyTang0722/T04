function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

async function fetchPokemon(url) {
    const response = await fetch(url);
    const data = await response.json();
    const pokemonsDiv = document.getElementById("pokemons");

    const pokemonDiv = document.createElement("div");
    pokemonDiv.id = data.name;
    pokemonDiv.className = "pokemon";

    const pidElement = document.createElement("p");
    pidElement.className = "pid";
    pidElement.appendChild(document.createTextNode("#" + pad(data.id, 3)));
    pokemonDiv.appendChild(pidElement);

    const imgElement = document.createElement("img");
    imgElement.src = data.sprites.front_default;
    pokemonDiv.appendChild(imgElement);

    const nameElement = document.createElement("p");
    nameElement.className = "name";
    nameElement.appendChild(document.createTextNode(data.name.toUpperCase()));
    pokemonDiv.appendChild(nameElement);

    const types = data.types.map(type => type.type.name);
    const typesElement = document.createElement("p");
    typesElement.className = "type";
    typesElement.appendChild(document.createTextNode(types.join(", ")));
    pokemonDiv.appendChild(typesElement);

    pokemonsDiv.appendChild(pokemonDiv);
}

async function fetchPokemons() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");
    const data = await response.json();

    for (const pokemon of data.results) {
        const detailsResponse = await fetchPokemon(pokemon.url);
    }
}

fetchPokemons();