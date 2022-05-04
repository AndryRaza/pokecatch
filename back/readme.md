# Back PokeCatch

API du jeu

## Installation & lancement (en dev)

### SHELL CMD

- npm install
- npm start

## Packages 

- dotenv
- express
- nodemon
- pokedex-promise-v2
- sqlite3
- swagger-jsdoc
- swagger-ui-express

## API DOC 

Retrouvez toutes les routes disponibles de l'API ici : '{url} + /api/api-docs '

## Exemples Queries 

- Chercher un pokemon

```
query MyQuery { 
  pokemon_v2_pokemonspecies_by_pk(id: 10) {
    name
    id
    pokemon_v2_pokemonspeciesflavortexts {
      flavor_text
    }
    pokemon_v2_pokemons {
      pokemon_v2_pokemonsprites {
        sprites
      }
    }
  }
}
```


- Avoir les noms en francais
```
query MyQuery {
  pokemon_v2_pokemonspeciesname_by_pk(id: 95) {
    name
    pokemon_v2_pokemonspecy {
      pokemon_v2_pokemonspeciesnames {
        name
        pokemon_v2_language {
          name
        }
      }
    }
  }
}
```
## Ressources 

API Pokemon : https://pokeapi.co/

https://github.com/PokeAPI/pokedex-promise-v2

https://beta.pokeapi.co/graphql/console/