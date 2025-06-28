// Chat functionality
let isProcessing = false;

// API configuration - Update this URL to your deployed API endpoint
const API_BASE_URL = 'https://your-api-domain.com'; // Change this to your deployed API URL

// Scroll to chat section
function scrollToChat() {
    document.getElementById('chat').scrollIntoView({ behavior: 'smooth' });
}

// Scroll to examples section
function scrollToExamples() {
    document.getElementById('examples').scrollIntoView({ behavior: 'smooth' });
}

// Handle Enter key press
function handleKeyPress(event) {
    if (event.key === 'Enter' && !isProcessing) {
        sendMessage();
    }
}

// Send message function
async function sendMessage() {
    const input = document.getElementById('user-input');
    const userInput = input.value.trim();
    
    if (userInput === '' || isProcessing) return;
    
    // Add "What if" precursor to the user's input if it doesn't already start with it
    const fullMessage = userInput.toLowerCase().startsWith('what if') ? userInput : `What if ${userInput}`;
    
    // Add user message (show the full message with "What if")
    addMessage(fullMessage, 'user');
    input.value = '';
    
    // Show loading
    isProcessing = true;
    showLoading();
    
    try {
        // Call ChatGPT API
        const response = await fetch(`${API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: fullMessage })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // Add AI response
        addMessage(data.response, 'ai');
        
    } catch (error) {
        console.error('Error calling ChatGPT API:', error);
        
        // Fallback to a generic response if API fails
        const fallbackResponse = `I apologize, but I'm having trouble connecting to my AI service right now. Please try again in a moment, or check your internet connection. If the problem persists, you might want to try asking your question again later.

For now, here's a brief thought on your question: Historical "what if" scenarios are fascinating because they help us understand how interconnected events are. Small changes can have massive ripple effects throughout time, affecting politics, culture, technology, and society in ways we can only imagine.`;
        addMessage(fallbackResponse, 'ai');
    } finally {
        hideLoading();
        isProcessing = false;
    }
}

// Add message to chat
function addMessage(content, sender) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    
    if (sender === 'ai') {
        messageContent.innerHTML = `<i class="fas fa-robot me-2"></i>${content}`;
    } else {
        messageContent.textContent = content;
    }
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Show loading indicator
function showLoading() {
    const chatMessages = document.getElementById('chat-messages');
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message';
    loadingDiv.id = 'loading-message';
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = '<i class="fas fa-robot me-2"></i>Thinking<span class="loading-dots"></span>';
    
    loadingDiv.appendChild(messageContent);
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Hide loading indicator
function hideLoading() {
    const loadingMessage = document.getElementById('loading-message');
    if (loadingMessage) {
        loadingMessage.remove();
    }
}

// Ask example question
function askQuestion(question) {
    const input = document.getElementById('user-input');
    input.value = question;
    sendMessage();
    scrollToChat();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
    
    // Focus on input when chat section is visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                document.getElementById('user-input').focus();
            }
        });
    });
    
    const chatSection = document.getElementById('chat');
    if (chatSection) {
        observer.observe(chatSection);
    }
    
    // Add typing animation to hero text
    const heroTitle = document.querySelector('.hero-section h1');
    if (heroTitle) {
        heroTitle.style.opacity = '0';
        heroTitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroTitle.style.transition = 'all 1s ease';
            heroTitle.style.opacity = '1';
            heroTitle.style.transform = 'translateY(0)';
        }, 500);
    }
    
    // Add fade-in animation to hero subtitle
    const heroSubtitle = document.querySelector('.hero-section .lead');
    if (heroSubtitle) {
        heroSubtitle.style.opacity = '0';
        heroSubtitle.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            heroSubtitle.style.transition = 'all 1s ease';
            heroSubtitle.style.opacity = '1';
            heroSubtitle.style.transform = 'translateY(0)';
        }, 800);
    }
    
    // Add animation to hero buttons
    const heroButtons = document.querySelectorAll('.hero-section .btn');
    heroButtons.forEach((button, index) => {
        button.style.opacity = '0';
        button.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            button.style.transition = 'all 1s ease';
            button.style.opacity = '1';
            button.style.transform = 'translateY(0)';
        }, 1100 + (index * 200));
    });
});

// Add some interactive features
function addInteractiveFeatures() {
    // Add hover effects to example cards
    const exampleCards = document.querySelectorAll('.example-card');
    exampleCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click feedback to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
}

// Call interactive features after DOM loads
document.addEventListener('DOMContentLoaded', addInteractiveFeatures); 