# WhatIfAI - Explore Alternate Histories with AI

A modern web application that uses ChatGPT to explore fascinating "what if" scenarios in history. Ask questions about alternate historical outcomes and get AI-powered responses that consider multiple perspectives and possibilities.

## 🌟 Features

- 🤖 **AI-Powered Responses**: Uses ChatGPT to generate thoughtful, engaging responses to historical "what if" questions
- 🎯 **Smart Question Formatting**: Automatically adds "What if" to questions that don't already include it
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile devices
- ⚡ **Real-time Chat**: Interactive chat interface with loading indicators
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- 🏀 **Sports History**: Includes sports scenarios like "What if LeBron James never left Cleveland?"
- 🏛️ **Historical Events**: Covers major historical events and figures

## 🚀 Live Demo

Visit the live website: [WhatIfAI Demo](https://fkhan67.github.io/demowhatifai/)

## 📋 Example Questions

- "What if Alexander the Great didn't die prematurely?"
- "What if JFK wasn't assassinated?"
- "What if LeBron James never left Cleveland in 2010?"
- "What if the Roman Empire never fell?"
- "What if Napoleon won at Waterloo?"
- "What if the Wright brothers never flew?"

## 🛠️ Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/fkhan67/demowhatifai.git
   cd demowhatifai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit the `.env` file and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_actual_openai_api_key_here
   PORT=3001
   ```

4. **Start the API server**
   ```bash
   npm start
   ```
   
   The API will run on `http://localhost:3001`

5. **Open the website**
   - Open `index.html` in your browser, or
   - Serve the files using a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (install http-server globally first)
     npx http-server
     ```

### Deployment

#### Option 1: Vercel (Recommended)

1. **Deploy the API to Vercel**
   - Create a `vercel.json` file in the root directory:
   ```json
   {
     "version": 2,
     "builds": [
       {
         "src": "api/chatgpt.js",
         "use": "@vercel/node"
       }
     ],
     "routes": [
       {
         "src": "/api/(.*)",
         "dest": "/api/chatgpt.js"
       }
     ]
   }
   ```

2. **Set environment variables in Vercel**
   - Go to your Vercel dashboard
   - Add `OPENAI_API_KEY` as an environment variable

3. **Deploy**
   ```bash
   vercel
   ```

4. **Update the API URL**
   - In `script.js`, change `API_BASE_URL` to your Vercel deployment URL

#### Option 2: Netlify Functions

1. **Create a Netlify function**
   - Create a `netlify/functions/chat.js` file with the API logic
   - Deploy to Netlify
   - Update the API URL in `script.js`

#### Option 3: Traditional Hosting

1. **Deploy the API to your server**
   - Upload the API files to your server
   - Set up environment variables
   - Update the API URL in `script.js`

2. **Deploy the frontend**
   - Upload the HTML, CSS, and JS files to your web server

## 🔧 API Endpoints

- `POST /api/chat` - Send a message to ChatGPT
- `GET /api/health` - Health check endpoint
- `GET /` - API information

## ⚙️ Configuration

### Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)
- `PORT` - Server port (default: 3001)

### Frontend Configuration

In `script.js`, update the `API_BASE_URL` constant to point to your deployed API:

```javascript
const API_BASE_URL = 'https://your-api-domain.com'; // Change this to your deployed API URL
```

## 🎮 Usage

1. Open the website in your browser
2. Type a "what if" question about history
3. Press Enter or click the send button
4. Get an AI-powered response exploring the possibilities

## 🏗️ Project Structure

```
demowhatifai/
├── index.html          # Main HTML file
├── style.css           # CSS styles
├── script.js           # Frontend JavaScript
├── api/
│   └── chatgpt.js      # Backend API server
├── package.json        # Node.js dependencies
├── env.example         # Environment variables template
├── vercel.json         # Vercel deployment config
└── README.md           # This file
```

## 🧪 Testing

Test the API locally:

```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

## 🆘 Support

If you encounter any issues:

1. Check that your OpenAI API key is valid and has sufficient credits
2. Ensure the API server is running and accessible
3. Check the browser console for any error messages
4. Verify that CORS is properly configured for your deployment

## 🙏 Acknowledgments

- Built with Bootstrap 5
- Icons from Font Awesome
- AI powered by OpenAI's GPT-3.5-turbo
- Inspired by the fascinating world of alternate history

## 📈 Future Enhancements

- [ ] Add more historical scenarios
- [ ] Implement conversation history
- [ ] Add image generation for scenarios
- [ ] Create a mobile app
- [ ] Add user accounts and favorites
- [ ] Implement social sharing features

---

**Made with ❤️ by Fardin Khan** 