// Select DOM elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const button = document.getElementById('new-quote');

// API endpoint
const API_URL = 'https://api.quotable.io/random';

// Function to fetch and display a new quote
async function fetchQuote() {
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    quoteElement.textContent = 'Fetching inspiration...';
    authorElement.textContent = '—';
    
    try {
        // Fetch quote from API
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        
        // Update the DOM with the new quote
        quoteElement.textContent = data.content;
        authorElement.textContent = `— ${data.author}`;
        
        // Store in local storage for daily tracking
        chrome.storage.local.set({
            lastQuote: data.content,
            lastAuthor: data.author,
            lastFetched: new Date().toDateString()
        });
        
    } catch (error) {
        console.error('Error:', error);
        quoteElement.textContent = 'Oops! Something went wrong. Please try again.';
        authorElement.textContent = '—';
    } finally {
        // Re-enable button
        button.disabled = false;
        button.textContent = 'New Quote';
    }
}

// Load saved quote or fetch a new one when popup opens
document.addEventListener('DOMContentLoaded', function() {
    // Check if we have a quote stored and if it's from today
    chrome.storage.local.get(['lastQuote', 'lastAuthor', 'lastFetched'], function(result) {
        const today = new Date().toDateString();
        
        if (result.lastQuote && result.lastFetched === today) {
            // Show yesterday's quote
            quoteElement.textContent = result.lastQuote;
            authorElement.textContent = result.lastAuthor;
        } else {
            // Fetch a new quote
            fetchQuote();
        }
    });
});

// Fetch a new quote when the button is clicked
button.addEventListener('click', fetchQuote);
