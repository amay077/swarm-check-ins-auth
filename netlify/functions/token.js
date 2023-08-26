const fetch = require('node-fetch')

// Need for CORS
const handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true
  };

  try {
    const code = event.queryStringParameters.code ?? 'empty';
    const clientId = process.env.GITHUB_OAUTH_CLIENT_ID;
    const clientSecret = process.env.GITHUB_OAUTH_CLIENT_SECRET;
    const accessTokenUrl = `https://github.com/login/oauth/access_token?client_id=${clientId}&client_secret=${clientSecret}&code=${code}`;
    console.log(`handler ~ accessTokenUrl:`, accessTokenUrl);

    const res = await fetch(accessTokenUrl, {
      method: 'POST',
      headers: {
        'Access-Control-Allow-Origin': "*",
        'Accept': 'application/json'
      },      
    });
    const resJson = await res.json();
    console.log(`handler ~ resText:`, resJson);

    if (!res.ok) {
      return {
        statusCode: res.status,
        headers,
        body: JSON.stringify(resJson)
      }
    };

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(resJson)
    }
  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }