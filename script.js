// Select DOM elements
const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const button = document.getElementById('new-quote');

// API endpoint [citation:6]
const API_URL = 'https://api.quotable.io/random';

// Function to fetch and display a new quote
async function fetchQuote() {
    // Disable button and show loading state
    button.disabled = true;
    button.textContent = 'Loading...';
    quoteElement.textContent = 'Fetching inspiration...';
    authorElement.textContent = '—';
    
    try {
        // Fetch quote from API [citation:2]
        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }
        
        const data = await response.json();
        
        // Update the DOM with the new quote [citation:8]
        quoteElement.textContent = data.content;
        authorElement.textContent = `— ${data.author}`;
        
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

// Fetch a quote when the page loads [citation:8]
window.addEventListener('DOMContentLoaded', fetchQuote);

// Fetch a new quote when the button is clicked
button.addEventListener('click', fetchQuote);