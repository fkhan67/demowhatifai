# WhatIfAI Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: GitHub Pages (Frontend Only)
1. Go to your GitHub repository settings
2. Scroll down to "GitHub Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)" folder
5. Click "Save"

Your website will be available at: `https://fkhan67.github.io/demowhatifai/`

### Option 2: Vercel (Full Stack - Recommended)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel**
   ```bash
   vercel
   ```

3. **Set Environment Variables**
   - Go to your Vercel dashboard
   - Add `OPENAI_API_KEY` with your actual API key

4. **Update Frontend API URL**
   - In `script.js`, change `API_BASE_URL` to your Vercel URL
   - Example: `const API_BASE_URL = 'https://your-app.vercel.app';`

### Option 3: Netlify (Full Stack)

1. **Create Netlify Function**
   - Create `netlify/functions/chat.js` with the API logic
   - Deploy to Netlify
   - Update API URL in `script.js`

### Option 4: Traditional Hosting

1. **Deploy API to your server**
   ```bash
   npm install
   cp env.example .env
   # Edit .env with your OpenAI API key
   npm start
   ```

2. **Deploy frontend files**
   - Upload `index.html`, `style.css`, `script.js` to your web server
   - Update `API_BASE_URL` in `script.js`

## 🔧 Configuration Steps

### 1. Get OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Create a new API key
3. Copy the key for use in your deployment

### 2. Update API URL
In `script.js`, line 5:
```javascript
const API_BASE_URL = 'https://your-deployed-api-url.com';
```

### 3. Environment Variables
Set these in your deployment platform:
```
OPENAI_API_KEY=your_actual_openai_api_key_here
PORT=3001 (optional, defaults to 3001)
```

## 🧪 Testing Your Deployment

1. **Test the API**
   ```bash
   npm test
   ```

2. **Test the Website**
   - Open your deployed website
   - Try asking a "what if" question
   - Check browser console for any errors

## 🆘 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Ensure your API server has CORS enabled
   - Check that the API URL is correct

2. **API Key Issues**
   - Verify your OpenAI API key is valid
   - Check that you have sufficient credits

3. **404 Errors**
   - Ensure all files are uploaded correctly
   - Check file paths and URLs

4. **Loading Issues**
   - Check network connectivity
   - Verify API server is running

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify your API key and credits
3. Test the API endpoint directly
4. Check the deployment platform logs

## 🎯 Next Steps

After deployment:
1. Test all functionality
2. Share your website URL
3. Consider adding analytics
4. Monitor API usage and costs 