const params = new URLSearchParams(window.location.search);
const pokemonParam = params.get('pokemon');

class PokemonDt {}

async function main() {
    if (pokemonParam) {
        // Deserializa o objeto Pokémon a partir do parâmetro da URL
        const pokemon = JSON.parse(decodeURIComponent(pokemonParam));
        
        // Agora você pode manipular o DOM e exibir as informações na página de detalhes
        document.getElementById('pokemonName').textContent = pokemon.name;
        document.getElementById('pokemonColor').classList.add(pokemon.type);
        document.getElementById('pokemonNumber').textContent = `#${pokemon.number}`;
        document.getElementById('pokemnImage').src = pokemon.photo;

        const olTipos = document.getElementById('idtypes')

        const listaTipos = pokemon.types;

        listaTipos.forEach(element => {
            const novoLi = document.createElement('li');
            novoLi.className = 'type';
            novoLi.textContent = element;
            olTipos.appendChild(novoLi)
        });

        // Adicione 'await' aqui para garantir que a Promise seja resolvida antes de continuar
        const resultPokeDetail = await pegaPokeDetails(`https://pokeapi.co/api/v2/pokemon/${pokemon.number}/`);
        const pokemonDetail = convertePoketoDetailsPoke(resultPokeDetail);
        console.log(pokemonDetail);

        const divDescricao = document.getElementById('addContentDescr')
        
        for (const prop in pokemonDetail) {
            const content = document.createElement('span');
            const capitalizarPrimeiraLetra = (str) => {
                return str.charAt(0).toUpperCase() + str.slice(1);
            }
            const propriedadeCapitalizada = capitalizarPrimeiraLetra(prop);
            content.textContent = `${propriedadeCapitalizada}: ${pokemonDetail[prop]}`;
            content.className = 'parInfos'
            divDescricao.appendChild(content);
        }
        
    } else {
        // Lida com a situação em que o parâmetro 'pokemon' não está presente na URL
        console.error('Parâmetro "pokemon" não encontrado na URL.');
    }
}

main(); // Chama a função assíncrona

    async function pegaPokeDetails(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    function convertePoketoDetailsPoke(pokeDetail) {
        const pokemonDet = new PokemonDt();
        // Certifique-se de que pokeDetail.abilities está definido antes de chamar map
        pokemonDet.habilidades = pokeDetail.abilities ? pokeDetail.abilities.map((typeSlot) => typeSlot.ability.name) : [];
        pokemonDet.peso = pokeDetail.weight
        pokemonDet.altura = pokeDetail.height
        return pokemonDet;
    }