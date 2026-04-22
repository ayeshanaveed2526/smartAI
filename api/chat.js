export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { userText } = req.body;

  if (!userText) {
    return res.status(400).json({ error: 'Missing userText in request body' });
  }

  // Read the API key securely from the server's environment variables
  const API_KEY = process.env.API_KEY;

  if (!API_KEY) {
    console.error("API_KEY is not defined in the environment variables.");
    return res.status(500).json({ error: 'Server misconfiguration: API_KEY is missing' });
  }

  try {
    // Forward the request securely to Google's API from the backend
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: userText }] }]
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        return res.status(response.status).json({ error: `API Error: ${errorText}` });
    }

    const data = await response.json();
    return res.status(200).json(data);
    
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
