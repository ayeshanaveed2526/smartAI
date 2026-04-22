# 🌟 Smart AI Assistant

A modern, highly aesthetic AI chatbot built using the **Google Gemini API** (Gemini 2.5 Flash). This project features a sleek dark-mode glassmorphism interface and a secure backend using Vercel Serverless Functions to protect the API key.

## ✨ Features

- **Modern UI/UX**: Deep dark mode, smooth gradient accents, and dynamic glassmorphism effects.
- **Rich Chat Experience**: Full scrolling chat interface with left/right message bubbles and typing indicators.
- **Markdown Support**: AI responses are beautifully rendered with bolding, lists, code blocks, and tables using `marked.js`.
- **Sleek Icons**: Incorporates clean vector graphics using `lucide-icons`.
- **Secure Architecture**: API calls are routed through a Vercel Serverless Function (`api/chat.js`) to completely hide the Google API key from the frontend.

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla CSS3, Vanilla JavaScript (ES6)
- **Backend**: Node.js (Vercel Serverless Functions)
- **External APIs**: Google Generative AI (`gemini-2.5-flash`)
- **Libraries**: `marked.js` (Markdown parsing), `lucide` (Icons)

## 🚀 Local Development Setup

Because this project uses a backend function to keep the API key secure, standard HTML Live Servers will not work. You must use the Vercel CLI.

### 1. Install Dependencies
Ensure you have [Node.js](https://nodejs.org/) installed, then install the Vercel CLI globally (optional, but recommended):
```bash
npm i -g vercel
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory of the project and add your Google AI Studio API key:
```env
API_KEY=your_actual_google_api_key_here
```
*(Note: `.env` is included in `.gitignore` to prevent your key from being leaked to GitHub).*

### 3. Run the Development Server
Start the local server using Vercel:
```bash
npx vercel dev
```
Open the provided `localhost` link (usually `http://localhost:3000`) in your browser to start chatting!

## 🌐 Deployment

This project is configured for seamless deployment on **Vercel**. 
1. Push your code to GitHub.
2. Import the repository into your Vercel dashboard.
3. Go to the project settings in Vercel and add your `API_KEY` to the **Environment Variables** section.
4. Deploy!

---
*Developed with modern web standards and security best practices.*
