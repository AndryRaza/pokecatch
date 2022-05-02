import Pokedex from 'pokedex-promise-v2';

const options = {
    protocol: 'https',
    hostName: process.env.SERVER_URL,
    versionPath: '/api/v2/',
    cacheLimit: 100 * 1000, // 100s
    timeout: 5 * 1000 // 5s
  }

const P = new Pokedex(options);

export async function getPokemon (request,response) {

    const idPokemon = request.params.idpokemon
    P.getPokemonByName(idPokemon)
    .then((res) => {
        const result = {
          "id":res.id,
          "name" : res.name,
          "abilities" : res.abilities,
          "moves":res.moves,
          "sprites": res.sprites,
          "types" : res.types
        }
        response.status(200).json(result)
    })
    .catch((error) => {
      response.status(403).send(error)
      console.log('There was an ERROR: ', error);
    });
}


export async function getPokemonInFrench(request,response){

  const idPokemon = request.params.idPokemon

  P.getPokemonSpeciesByName(idPokemon).then(res=>{
    response.status(200).json(res.names.filter(pokeAPINAME => pokeAPINAME.language.name === 'fr')[0].name)
  })
}