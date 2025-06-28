// ChatGPT API Handler for WhatIfAI
// This file can be used with Vercel Functions, Netlify Functions, or any Node.js backend

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ChatGPT API endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Create a system prompt that defines the AI's role
    const systemPrompt = `You are an AI history expert specializing in exploring alternate historical scenarios. Your role is to help users explore "what if" questions about history.

When responding to users:
1. Be engaging and thoughtful in your analysis
2. Consider multiple perspectives and possibilities
3. Draw on historical knowledge and context
4. Explain the potential ripple effects of changes
5. Keep responses informative but conversational
6. Encourage further exploration of the topic
7. Provide specific examples and details when possible
8. Consider both immediate and long-term consequences
9. Discuss how the change might affect different aspects of society (politics, culture, technology, economics)
10. Always maintain a tone that is educational, engaging, and encourages critical thinking

Format your responses to be engaging and easy to read, with clear paragraphs and bullet points when appropriate.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: systemPrompt
        },
        {
          role: "user",
          content: message
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const response = completion.choices[0].message.content;
    res.json({ response });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ 
      error: 'Failed to get response from AI',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'WhatIfAI API is running' });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({ 
    message: 'WhatIfAI API Server',
    version: '1.0.0',
    endpoints: {
      chat: 'POST /api/chat',
      health: 'GET /api/health'
    }
  });
});

app.listen(port, () => {
  console.log(`WhatIfAI API server running on port ${port}`);
});

// Sports Reference data fetcher
async function fetchSportsReferenceData(playerUrl) {
    try {
        const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(playerUrl)}`);
        const data = await response.json();
        
        if (data.contents) {
            return parseSportsReferenceData(data.contents);
        }
        
        return null;
    } catch (error) {
        console.error('Error fetching Sports Reference data:', error);
        return null;
    }
}

// Parse Sports Reference HTML data
function parseSportsReferenceData(htmlContent) {
    // This would need a proper HTML parser in Node.js
    // For now, we'll return a basic structure
    return {
        source: 'Sports Reference',
        data: 'Player statistics and career data',
        timestamp: new Date().toISOString()
    };
}

// Enhanced sports scenario generator
async function generateSportsScenario(player, scenario, followUp) {
    const prompt = createSportsPrompt(player, scenario, followUp);
    return await callOpenAI(prompt, 1500, 0.7);
}

// Create detailed sports prompt
function createSportsPrompt(player, scenario, followUp) {
    return `You are a sports historian and analyst. Using real statistics and data from Sports Reference (https://www.sports-reference.com), analyze what would have happened if ${scenario}. 

Focus specifically on: ${followUp}

Player: ${player.name}
Sport: ${player.sport}
Career Statistics: Available from Sports Reference

Please provide a detailed analysis including:
1. Immediate Impact (what would have happened right away)
2. Career Trajectory (how the player's career would have changed)
3. Team Success (impact on championships and team performance)
4. League Landscape (how the entire sport would be different)
5. Legacy Impact (how history would remember the player/team)

Make your response engaging, well-researched, and based on actual statistics. Use specific numbers and facts when possible. Cite Sports Reference as your data source.`;
}

// Export for different environments
if (typeof module !== 'undefined' && module.exports) {
    // Node.js environment
    module.exports = {
        handleChatGPTRequest,
        callOpenAI,
        fetchSportsReferenceData,
        generateSportsScenario
    };
} else if (typeof window !== 'undefined') {
    // Browser environment
    window.WhatIfAI = {
        handleChatGPTRequest,
        callOpenAI,
        fetchSportsReferenceData,
        generateSportsScenario
    };
}

// For Vercel Functions
if (typeof exports !== 'undefined') {
    exports.default = handleChatGPTRequest;
} 