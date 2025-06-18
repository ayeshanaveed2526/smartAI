document.getElementById('mybtn').onclick = function() {
    const userText = document.getElementById('userInput').value;
    const API_KEY = "AIzaSyAvT35ANllrM6vdsJCBbglXJOOo8trB-FI";

fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify({
    contents: [
      {
        parts: [
          {
            text: userText
          }
        ]
      }
    ]
  })
})
  .then(response => response.json())
  .then(data => {
       let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer found';
    // Replace **text** with <strong>text</strong>
    reply = reply.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    document.getElementById('answer').innerHTML = reply;
    console.log("AI Response:", reply);
    
  })
  .catch(error => {
    document.getElementById('answer').innerHTML = 'Error fetching answer';  
    console.error("Error:", error);
  });
}