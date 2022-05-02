export async function api(url,params = {}){
    const url_ = process.env.VUE_APP_URL_API; 

    params = Object.assign({
        mode:'cors',
        cache:'no-cache'
    },params)

    params.headers = Object.assign({
        'Content-Type': 'application/json'
    }, params.headers)

    let response = await fetch(url_ + url,params)
    let json = await response.json() || {}
    return json;

}

