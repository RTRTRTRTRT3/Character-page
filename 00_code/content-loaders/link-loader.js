// Apply CSS variables to img src and audio source attributes
(function() {
    // Helper function to get variable value and extract URL
    function getVariableUrl(varName) {
        const rootStyles = getComputedStyle(document.documentElement);
        const value = rootStyles.getPropertyValue(varName).trim();
        // Remove url(' and ') from the value
        return value.replace(/^url\(['"]?/, '').replace(/['"]?\)$/, '');
    }
    
    function applyLinks() {
        // Find all elements with data-link attribute
        const elementsWithVars = document.querySelectorAll('[data-link]');
        
        elementsWithVars.forEach(element => {
            const varName = element.getAttribute('data-link');
            if (varName) {
                const url = getVariableUrl(varName);
                if (url) {
                    element.src = url;
                }
            }
        });
        
        // Handle audio source elements with data-link
        const audioSources = document.querySelectorAll('source[data-link]');
        audioSources.forEach(source => {
            const varName = source.getAttribute('data-link');
            if (varName) {
                const url = getVariableUrl(varName);
                if (url) {
                    console.log('Setting audio src:', varName, '->', url);
                    source.src = url;
                    // Reload the parent audio element
                    const audio = source.parentElement;
                    if (audio && audio.tagName === 'AUDIO') {
                        audio.load();
                    }
                }
            }
        });
    }
    
    // Apply immediately if DOM is ready, otherwise wait
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', applyLinks);
    } else {
        // DOM already loaded, apply immediately
        applyLinks();
    }
    
    // Also apply after window load to catch any late-loading elements
    window.addEventListener('load', applyLinks);
})();
