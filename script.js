// Initialize Lucide icons
lucide.createIcons();

// Elements
const inputField = document.getElementById('userInput');
const btn = document.getElementById('mybtn');
const answerContainer = document.getElementById('answer-container');

// Event Listeners
btn.addEventListener('click', handleAsk);
inputField.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        handleAsk();
    }
});

// Focus input on load
window.addEventListener('DOMContentLoaded', () => {
    inputField.focus();
});

function handleAsk() {
    const userText = inputField.value.trim();
    if (!userText) return;
    
    // Clear empty state if it exists
    if (answerContainer.classList.contains('empty')) {
        answerContainer.innerHTML = '';
        answerContainer.classList.remove('empty');
    }

    // Append User Message
    appendMessage(userText, 'user');
    inputField.value = '';
    
    // Disable input while generating
    btn.disabled = true;
    inputField.disabled = true;

    // Show Loading state
    const loadingId = 'loading-' + Date.now();
    const loadingHTML = `
        <div id="${loadingId}" class="message ai">
            <div class="loading-indicator">
                <i data-lucide="sparkles" style="width:16px;height:16px;color:var(--accent-color);"></i>
                <span>Thinking...</span>
                <div class="typing-animation" style="margin-left:8px;">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        </div>
    `;
    answerContainer.insertAdjacentHTML('beforeend', loadingHTML);
    lucide.createIcons();
    scrollToBottom();

    // Fetch API via our secure Vercel backend
    fetch('/api/chat', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ userText: userText })
    })
    .then(async response => {
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Error (${response.status}): ${errorText}`);
        }
        return response.json();
    })
    .then(data => {
        // Remove Loading
        document.getElementById(loadingId)?.remove();
        
        let reply = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer found';
        appendMessage(reply, 'ai');
        
        // Re-enable input
        btn.disabled = false;
        inputField.disabled = false;
        inputField.focus();
    })
    .catch(error => {
        // Remove Loading
        document.getElementById(loadingId)?.remove();
        
        let errorMsg = '**Connection Error:** Failed to fetch answer.';
        if (error.message.includes('503')) {
            errorMsg = '**Service Unavailable (503):** The Gemini API is currently overloaded or down. Please try again in a few moments.';
        } else if (error.message.includes('API Error')) {
            errorMsg = `**API Error:** ${error.message}`;
        }

        appendMessage(errorMsg, 'ai');
        console.error("Error Details:", error);
        
        // Re-enable input
        btn.disabled = false;
        inputField.disabled = false;
        inputField.focus();
    });
}

function appendMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (sender === 'ai') {
        // Render Markdown for AI messages
        messageDiv.innerHTML = `<div class="markdown-body">${marked.parse(text)}</div>`;
    } else {
        // Plain text for user messages to avoid HTML injection
        messageDiv.textContent = text;
    }
    
    answerContainer.appendChild(messageDiv);
    
    // Apply syntax highlighting if any code blocks were rendered
    // (Optional enhancement, currently relies on markdown styles)
    
    scrollToBottom();
}

function scrollToBottom() {
    answerContainer.scrollTop = answerContainer.scrollHeight;
}

// Configure marked options for better formatting and security
marked.setOptions({
    breaks: true,
    gfm: true
});