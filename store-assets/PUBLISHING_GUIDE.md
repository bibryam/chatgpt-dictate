# Chrome Web Store Publishing Guide

## Prerequisites Checklist ✅

Before you start, make sure you have:
- [ ] A Google account
- [ ] $5 for the one-time Chrome Web Store developer fee
- [ ] Your extension files ready
- [ ] Privacy policy (included in this repo)
- [ ] Screenshots/promotional images

---

## Step 1: Chrome Web Store Developer Registration

1. **Go to Chrome Web Store Developer Dashboard**
   - Visit: https://chrome.google.com/webstore/devconsole
   - Sign in with your Google account

2. **Pay Developer Registration Fee**
   - One-time payment of $5 USD
   - Payment is required before you can publish

3. **Accept Developer Agreement**
   - Read and accept the Chrome Web Store Developer Program Policies

---

## Step 2: Prepare Your Extension Package

1. **Create Extension Package**
   ```bash
   # Create a ZIP file with all extension files
   # Include these files in the root of the ZIP:
   - manifest.json
   - background.js
   - content.js
   - images/icon.png
   - LICENSE
   ```

2. **Required Assets for Store Listing:**
   - **Icon:** 128x128px PNG (you already have this)
   - **Small tile:** 440x280px PNG (promotional image)
   - **Screenshots:** At least 1, up to 5 screenshots (1280x800px or 640x400px)
   - **Detailed description:** Use the one from `STORE_DESCRIPTION.md`

---

## Step 3: Create Store Assets

### Screenshots Needed (1-5 images):
1. **ChatGPT page with the extension working**
2. **Extension notification showing keyboard shortcuts**
3. **Voice dictation in action**

### Promotional Images:
- **Small tile (440x280px):** Main promotional image
- **Large tile (920x680px):** Optional but recommended

---

## Step 4: Upload and Configure Your Extension

1. **Upload Extension Package**
   - Click "Add new item"
   - Upload your ZIP file
   - Chrome will validate your extension

2. **Fill Out Store Listing:**
   
   **Basic Info:**
   - Name: `ChatGPT Dictate Shortcuts`
   - Description: Use the detailed description from `STORE_DESCRIPTION.md`
   - Category: `Productivity`
   - Language: `English`

   **Privacy:**
   - Single purpose: `Adds keyboard shortcuts for voice dictation on ChatGPT`
   - Permission justification: Explain each permission (use privacy policy)
   - Privacy policy URL: Upload `PRIVACY_POLICY.md` to your GitHub repo and link it

   **Store Listing:**
   - Upload icon (128x128px)
   - Upload screenshots (1280x800px recommended)
   - Upload promotional images

---

## Step 5: Privacy Policy Hosting

You need to host your privacy policy online:

**Option 1: GitHub Pages**
1. Upload `PRIVACY_POLICY.md` to your GitHub repo
2. Enable GitHub Pages in repo settings
3. Link: `https://[username].github.io/[repo-name]/store-assets/PRIVACY_POLICY.html`

**Option 2: Convert to HTML and host anywhere**
```html
<!DOCTYPE html>
<html>
<head>
    <title>Privacy Policy - ChatGPT Dictate</title>
</head>
<body>
    <!-- Copy content from PRIVACY_POLICY.md here -->
</body>
</html>
```

---

## Step 6: Review Process

1. **Submit for Review**
   - Click "Submit for review"
   - Review typically takes 1-3 business days for new extensions
   - Updates to existing extensions are usually faster

2. **Review Criteria**
   Chrome will check:
   - Code quality and security
   - Privacy policy compliance
   - Store listing accuracy
   - Permission usage justification

---

## Step 7: Common Issues to Avoid

❌ **Avoid These Common Rejections:**
- Missing or inadequate privacy policy
- Permissions not properly justified
- Poor quality screenshots
- Misleading store description
- Code that doesn't match functionality described

✅ **Best Practices:**
- Clear, accurate descriptions
- High-quality screenshots showing actual functionality
- Detailed privacy policy
- Minimal permissions requested
- Clean, well-commented code

---

## Step 8: After Approval

1. **Extension Goes Live**
   - Usually within 1-3 business days
   - You'll receive email notification
   - Extension becomes searchable and installable

2. **Share Your Extension**
   - Direct link: `https://chrome.google.com/webstore/detail/[extension-id]`
   - Share on social media, GitHub, etc.

3. **Monitor and Update**
   - Respond to user reviews
   - Keep extension updated
   - Monitor Chrome Web Store policies

---

## Quick Reference: Required Information

**Extension Details:**
- Name: ChatGPT Dictate Shortcuts
- Version: 1.0.0
- Category: Productivity
- Single Purpose: Voice dictation shortcuts for ChatGPT

**Required Permissions:**
- `activeTab`: Interact with current ChatGPT tab
- `scripting`: Inject keyboard shortcut functionality
- `host_permissions`: Auto-activate on ChatGPT pages

**File Sizes:**
- Extension package: < 100MB
- Icons: 16px, 48px, 128px (PNG)
- Screenshots: 1280x800px or 640x400px
- Promotional: 440x280px (small), 920x680px (large)

---

## Support

If you encounter issues:
- Chrome Web Store Help: https://support.google.com/chrome_webstore/
- Developer Policies: https://developer.chrome.com/docs/webstore/program-policies/
- Extension Development: https://developer.chrome.com/docs/extensions/

Good luck with your publication! 🚀 