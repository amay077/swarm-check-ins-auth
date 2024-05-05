const fetch = require('node-fetch')

const handler = async (event) => {
  
  try {
    const { access_token, text } = JSON.parse(event.body); // as { access_token: string, text: string };

    const res = await fetch(`https://api.twitter.com/2/tweets`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });    

    if (!res.ok) {
      return {
        statusCode: res.status,
        body: JSON.stringify(res)
      }
    };

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    }
  } catch (error) {
    console.log(`handler -> error:`, error);
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }