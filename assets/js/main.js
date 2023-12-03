const pokemonList = document.getElementById('pokemonList')
//Obtém a referência para o elemento HTML com o ID 'pokemonList'.
const loadMoreButton = document.getElementById('loadMoreButton')
//Obtém a referência para o elemento HTML com o ID 'loadMoreButton'.

const maxRecords = 151 // Define a quantidade máxima de registros.
const limit = 10 //Define o número máximo de registros a serem carregados a cada vez.
let offset = 0; //Inicializa uma variável que rastreia o deslocamento ou a posição atual dos registros.

function convertPokemonToLi(pokemon) {
/*  Define uma função que converte informações sobre um Pokémon em uma string HTML 
representando um elemento de lista (<li>). */
    const serializedPokemon = encodeURIComponent(JSON.stringify(pokemon));
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <div class="main-button">
                <a href="detail.html?pokemon=${serializedPokemon}" class="open-button">Detalhes</a>
            </div>
        </li>
    `
}
function loadPokemonItens(offset, limit) {
/* Define uma função que carrega os itens dos Pokémon a partir da PokeAPI com um
 determinado deslocamento e limite, e adiciona os elementos HTML
  gerados à lista de Pokémon. */
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)
//Chama a função loadPokemonItens para carregar os primeiros Pokémon quando a página é carregada.

loadMoreButton.addEventListener('click', () => {
/* Adiciona um ouvinte de evento de clique ao botão "Load More", que aumenta 
o deslocamento (offset) e carrega mais Pokémon quando o botão é clicado. Se o 
número total de registros a serem carregados for maior ou igual ao número máximo 
de registros, ajusta o limite para garantir que apenas os registros restantes sejam 
carregados. */
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})