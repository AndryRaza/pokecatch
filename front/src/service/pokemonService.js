export  function random(min,max)
{
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}


export async function getPokemonRandom(){

    const url = process.env.VUE_APP_URL_API; 

    const options = {
        method : "GET",
        headers: { "Content-Type": "application/json", }
    }

    const response = await fetch(`${url}/pokemon/${random(1,500)}`,options)
    const result = await response.json();

    return result;

}

export async function getPokemonName(id){
    const url = process.env.VUE_APP_URL_API; 

    const options = {
        method : "GET",
        headers: { "Content-Type": "application/json", }
    }

    const response = await fetch(`${url}/pokemon/${id}/french`,options)
    const result = await response.json();

    return result;
}

