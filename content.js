// ChatGPT Dictate - Auto-activate voice shortcuts on ChatGPT pages
console.log('ChatGPT Dictate: Voice shortcuts ready! ALT+SPACE=start/submit, ALT+ESC=cancel');

// Remove any existing keyboard listeners to avoid duplicates
document.removeEventListener('keydown', handleDictationKeyboard);

// Add keyboard event listener with the working logic from background.js
document.addEventListener('keydown', handleDictationKeyboard);

// Handle keyboard shortcuts for dictation (working version from background.js)
function handleDictationKeyboard(event) {
    // Check if dictation is currently active (recording buttons are present)
    const isDictationActive = document.querySelector('button[aria-label="Stop dictation"]') || 
                             document.querySelector('button[aria-label="Submit dictation"]');
    
    // Check if dictate button is available (not currently recording)
    const dictateButton = document.querySelector('button[aria-label="Dictate button"]');
    
    // ALT+SPACE - Toggle dictation (start when inactive, submit when active)
    if ((event.key === ' ' || event.key === 'Space' || event.code === 'Space') && event.altKey) {
        event.preventDefault();
        event.stopPropagation();
        
        // If dictation is NOT active - start it
        if (!isDictationActive && dictateButton) {
            console.log('ChatGPT Dictate: ALT+SPACE pressed - Starting dictation');
            dictateButton.click();
            showNotification('Dictation started! ALT+SPACE=submit, ALT+ESC=cancel');
            return;
        }
        
        // If dictation IS active - submit it
        if (isDictationActive) {
            const submitButton = document.querySelector('button[aria-label="Submit dictation"]');
            if (submitButton && !submitButton.disabled) {
                console.log('ChatGPT Dictate: ALT+SPACE pressed - Submitting dictation');
                submitButton.click();
                showNotification('Dictation submitted');
                return;
            }
        }
    }
    
    // ALT+ESC - Cancel/Stop dictation (only when active)
    if (event.key === 'Escape' && event.altKey && isDictationActive) {
        event.preventDefault();
        event.stopPropagation();
        
        const cancelButton = document.querySelector('button[aria-label="Stop dictation"]');
        if (cancelButton && !cancelButton.disabled) {
            console.log('ChatGPT Dictate: ALT+ESC pressed - Stopping dictation');
            cancelButton.click();
            showNotification('Dictation cancelled');
        }
    }
}

// Function to show notifications (copied from background.js)
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #10a37f;
        color: white;
        padding: 12px 20px;
        border-radius: 6px;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease-out;
    `;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
            if (style.parentNode) {
                style.parentNode.removeChild(style);
            }
        }, 300);
    }, 3000);
}

// If URL has auto-dictate=true, auto-click voice button
if (new URLSearchParams(window.location.search).get('auto-dictate') === 'true') {
    setTimeout(() => {
        const dictateBtn = document.querySelector('button[aria-label="Dictate button"]');
        if (dictateBtn) {
            dictateBtn.click();
            console.log('ChatGPT Dictate: Auto-started dictation');
            showNotification('Dictation started! ALT+SPACE=submit, ALT+ESC=cancel');
        }
    }, 2000);
} else {
    // Show notification that shortcuts are ready
    setTimeout(() => {
        showNotification('Use ALT+SPACE to start dictating, ALT+ESC to cancel');
    }, 1000);
} 