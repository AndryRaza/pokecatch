import { options,url } from "../utils/var";

export  function random(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


export async function getPokemonRandom(){

    const response = await fetch(`${url}/pokemon/${random(1,500)}`,options)
    const result = await response.json();

    return result;

}

export async function getPokemon(id){

    const response = await fetch(`${url}/pokemon/${id}`,options)
    const result = await response.json();

    return result;

}

export async function getPokemonName(id){

    const response = await fetch(`${url}/pokemon/${id}/french`,options)
    const result = await response.json();

    return result;
}

