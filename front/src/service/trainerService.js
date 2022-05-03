const url = process.env.VUE_APP_URL_API; 

export async function savePokemon(idtrainer,idpokemon)
{
    const options = {
        method : "GET",
        headers: { "Content-Type": "application/json", }
    }

    const response = await fetch(`${url}/trainer/save/${idtrainer}/${idpokemon}`,options)
    const result = await response.json();

    return result;
}

export async function getTrainersPokemons(idtrainer)
{
    const options = {
        method : "GET",
        headers: { "Content-Type": "application/json", }
    }

    const response = await fetch(`${url}/trainer/${idtrainer}`,options)
    const result = await response.json();

    return result;
}