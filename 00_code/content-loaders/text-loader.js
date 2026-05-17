// Apply CSS variables to text content
(function() {
    // Helper function to get text variable value
    function getVariableText(varName) {
        const rootStyles = getComputedStyle(document.documentElement);
        let value = rootStyles.getPropertyValue(varName).trim();
        // Remove quotes from the value
        value = value.replace(/^['"]|['"]$/g, '');
        // Handle escaped quotes
        value = value.replace(/\\'/g, "'").replace(/\\"/g, '"');
        return value;
    }
    
    function applyTexts() {
        // Find all elements with data-text attribute
        const elementsWithText = document.querySelectorAll('[data-text]');
        
        elementsWithText.forEach(element => {
            const varName = element.getAttribute('data-text');
            if (varName) {
                const text = getVariableText(varName);
                if (text && text !== '') {
                    element.textContent = text;
                }
            }
        });
    }
    
    // Apply immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyTexts);
    } else {
        // DOM already loaded, apply immediately
        applyTexts();
    }
    
    // Also apply after window load to catch any late-loading elements
    window.addEventListener('load', applyTexts);
})();
