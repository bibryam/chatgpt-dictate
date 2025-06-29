chrome.action.onClicked.addListener((tab) => {
    // Open ChatGPT with the specific custom GPT
    // Add auto-dictate=true parameter to automatically start dictation
    const chatgptUrl = `https://chatgpt.com/?auto-dictate=true`;

    chrome.tabs.create({ url: chatgptUrl }, (newTab) => {
        // Wait for ChatGPT to load, then set up the extension
        setTimeout(() => {
            chrome.scripting.executeScript({
                target: { tabId: newTab.id },
                func: activateVoiceInput
            });
        }, 1000); // Allow time for ChatGPT to start loading
    });
});

function activateVoiceInput() {
    // Always set up keyboard shortcuts
    setupDictationKeyboards();
    
    // Check if auto-dictate parameter is present in URL
    const urlParams = new URLSearchParams(window.location.search);
    const shouldAutoDictate = urlParams.get('auto-dictate') === 'true';
    
    if (shouldAutoDictate) {
        // Wait 1 second then start dictation automatically
        setTimeout(() => {
            findAndClickVoiceButton();
        }, 1000);
    } else {
        // Don't auto-start, but show notification about keyboard shortcuts
        setTimeout(() => {
            showNotification('Use ALT+SPACE to start dictating, ALT+ESC to cancel');
        }, 1000);
    }

    // Function to repeatedly check for and click the voice input button
    function findAndClickVoiceButton() {
        // Specific selectors based on the actual ChatGPT dictate button structure
        const voiceButtonSelectors = [
            // Most specific - the exact dictate button
            'button[aria-label="Dictate button"]',
            'button[aria-label="Dictate button"].composer-btn',
            '[data-testid="composer-trailing-actions"] button[aria-label="Dictate button"]',
            // Alternative selectors
            'button.composer-btn[aria-label*="Dictate"]',
            '.composer-btn[aria-label*="dictate" i]',
            // Fallback selectors for different ChatGPT versions
            'button[aria-label*="voice" i]',
            'button[aria-label*="Voice"]',
            'button[aria-label*="microphone" i]',
            'button[aria-label*="Microphone"]',
            'button[data-testid*="voice"]',
            'button[data-testid*="microphone"]',
            // Look for buttons with specific microphone SVG path
            'button:has(svg path[d*="M15.7806 10.1963"])',
            'button:has(svg path[d*="M12.2513 5.41699"])',
            // More specific selectors for ChatGPT interface
            '.flex.items-center button[aria-label*="voice" i]',
            '.composer-controls button[aria-label*="voice" i]',
            // Alternative approach - look for buttons near the input area
            'div[contenteditable] ~ button[aria-label*="voice" i]',
            'div[contenteditable] ~ div button[aria-label*="voice" i]',
            // Look for composer button class
            'button.composer-btn:has(svg)',
            // Last resort - look for any button with dictate-related content
            'button:contains("Dictate")',
            'button:contains("dictate")'
        ];

        let voiceButton = null;
        
        // Try each selector
        for (const selector of voiceButtonSelectors) {
            try {
                const buttons = document.querySelectorAll(selector);
                for (const button of buttons) {
                    // Check if button is visible and clickable
                    if (button && button.offsetParent !== null && !button.disabled) {
                        // Additional verification - check for microphone-related attributes or content
                        const buttonText = button.textContent.toLowerCase();
                        const ariaLabel = (button.getAttribute('aria-label') || '').toLowerCase();
                        const title = (button.getAttribute('title') || '').toLowerCase();
                        
                        if (buttonText.includes('voice') || buttonText.includes('microphone') ||
                            ariaLabel.includes('voice') || ariaLabel.includes('microphone') ||
                            title.includes('voice') || title.includes('microphone') ||
                            button.querySelector('svg')) {
                            voiceButton = button;
                            break;
                        }
                    }
                }
                if (voiceButton) break;
            } catch (e) {
                // Some selectors might not work in all browsers, continue trying
                continue;
            }
        }

        // Alternative approach - look for SVG icons that might represent microphones
        if (!voiceButton) {
            const svgElements = document.querySelectorAll('button svg, [role="button"] svg');
            for (const svg of svgElements) {
                const paths = svg.querySelectorAll('path');
                for (const path of paths) {
                    const d = path.getAttribute('d') || '';
                    // Common microphone icon path patterns
                    if (d.includes('M12') && (d.includes('3 3') || d.includes('microphone')) ||
                        d.includes('M8 12') || d.includes('M16 12') ||
                        svg.getAttribute('viewBox') === '0 0 24 24') {
                        const button = svg.closest('button, [role="button"]');
                        if (button && button.offsetParent !== null && !button.disabled) {
                            voiceButton = button;
                            break;
                        }
                    }
                }
                if (voiceButton) break;
            }
        }

        if (voiceButton) {
            console.log('Found voice button, clicking it...');
            voiceButton.click();
            
            // Show a brief notification that voice input was activated
            showNotification('Dictation started! ALT+SPACE=submit, ALT+ESC=cancel');
            return true;
        }
        
        // Show fallback notification if button not found
        showNotification('Voice button not found. Please click the microphone icon manually to enable voice input.');
        return false;
    }

    // Function to show a temporary notification
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

    // This function is now called from the 2-second timeout above

    // Function to set up keyboard shortcuts for dictation control
    function setupDictationKeyboards() {
        // Remove any existing keyboard listeners to avoid duplicates
        document.removeEventListener('keydown', handleDictationKeyboard);
        
        // Add keyboard event listener
        document.addEventListener('keydown', handleDictationKeyboard);
        
        console.log('Dictation keyboard shortcuts activated: ALT+SPACE=start/submit, ALT+ESC=cancel');
    }

    // Handle keyboard shortcuts for dictation
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
                console.log('ALT+SPACE pressed - Starting dictation');
                dictateButton.click();
                showNotification('Dictation started! ALT+SPACE=submit, ALT+ESC=cancel');
                return;
            }
            
            // If dictation IS active - submit it
            if (isDictationActive) {
                const submitButton = document.querySelector('button[aria-label="Submit dictation"]');
                if (submitButton && !submitButton.disabled) {
                    console.log('ALT+SPACE pressed - Submitting dictation');
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
                console.log('ALT+ESC pressed - Stopping dictation');
                cancelButton.click();
                showNotification('Dictation cancelled');
            }
        }
    }
}
