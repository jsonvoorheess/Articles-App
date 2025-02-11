let comments = []

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method Not Allowed' })
    }
  }

  try {
    const body = JSON.parse(event.body)
    
    comments.push({
      id: body.id,
      author: body.author,
      text: body.text,
      avatar: body.avatar,
      commId: body.commId,
      date: body.date
    })

    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ message: "Comment added" })
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "error" })
    }
  }
}