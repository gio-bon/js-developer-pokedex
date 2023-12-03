
const pokeApi = {}
//Cria um objeto pokeApi vazio para conter as funções relacionadas à API Pokemon.

function convertPokeApiDetailToPokemon(pokeDetail) {
/* Define uma função que converte detalhes da API Pokemon em um objeto Pokémon. */
    const pokemon = new Pokemon()
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name) //tipo
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default //foto

    return pokemon
}

pokeApi.getPokemonDetail = (pokemon) => {
/* Define uma função getPokemonDetail para obter detalhes de um Pokémon específico */
    return fetch(pokemon.url)
        .then((response) => response.json())
        .then(convertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = (offset = 0, limit = 5) => {
/* Define uma função getPokemons para obter uma lista de Pokémon com base no deslocamento e no limite especificados. */
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
}
