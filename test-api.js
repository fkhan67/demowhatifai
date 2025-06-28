// Simple test script for the WhatIfAI API
const API_BASE_URL = 'http://localhost:3001';

async function testAPI() {
    console.log('🧪 Testing WhatIfAI API...');
    
    try {
        // Test health endpoint
        console.log('1. Testing health endpoint...');
        const healthResponse = await fetch(`${API_BASE_URL}/api/health`);
        const healthData = await healthResponse.json();
        console.log('✅ Health check:', healthData);
        
        // Test chat endpoint
        console.log('2. Testing chat endpoint...');
        const chatResponse = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                message: 'What if Alexander the Great didn\'t die prematurely?' 
            })
        });
        
        if (!chatResponse.ok) {
            throw new Error(`HTTP error! status: ${chatResponse.status}`);
        }
        
        const chatData = await chatResponse.json();
        console.log('✅ Chat response received');
        console.log('📝 Response preview:', chatData.response.substring(0, 100) + '...');
        
        console.log('\n🎉 API test completed successfully!');
        
    } catch (error) {
        console.error('❌ API test failed:', error.message);
        console.log('\n💡 Make sure:');
        console.log('1. The API server is running (npm start)');
        console.log('2. Your OpenAI API key is set in .env file');
        console.log('3. The API_BASE_URL is correct');
    }
}

// Run the test
testAPI(); 