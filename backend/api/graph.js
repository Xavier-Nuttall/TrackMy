const graphMeEndpoint =  "https://graph.microsoft.com/v1.0/me"

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
async function callMsGraph(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    let val = fetch("https://graph.microsoft.com/v1.0/me", options)
        .then(response => response.json())
        .catch(error => console.log(error));
    return val;
}

module.exports = { callMsGraph };