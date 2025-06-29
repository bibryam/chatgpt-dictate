#!/bin/bash

# ChatGPT Dictate - Extension Packaging Script
# This script creates a ZIP file ready for Chrome Web Store submission

echo "🚀 Packaging ChatGPT Dictate Extension for Chrome Web Store..."

# Create a temporary directory for packaging
TEMP_DIR="chatgpt-dictate-package"
ZIP_NAME="chatgpt-dictate-v1.0.0.zip"

# Remove existing temp directory and zip file if they exist
rm -rf "$TEMP_DIR"
rm -f "$ZIP_NAME"

# Create temp directory
mkdir "$TEMP_DIR"

echo "📦 Copying extension files..."

# Copy required files for the extension
cp manifest.json "$TEMP_DIR/"
cp background.js "$TEMP_DIR/"
cp content.js "$TEMP_DIR/"
cp LICENSE "$TEMP_DIR/"

# Copy images directory but exclude system files
mkdir "$TEMP_DIR/images"
cp images/icon.png "$TEMP_DIR/images/"

# Create the ZIP file (excluding system files)
echo "🗜️  Creating ZIP package..."
cd "$TEMP_DIR"
zip -r "../$ZIP_NAME" . -x "*.DS_Store" "*.Thumbs.db" "*~"
cd ..

# Clean up temp directory
rm -rf "$TEMP_DIR"

# Check if ZIP was created successfully
if [ -f "$ZIP_NAME" ]; then
    echo "✅ Extension package created successfully!"
    echo "📁 File: $ZIP_NAME"
    echo "📊 Size: $(ls -lh "$ZIP_NAME" | awk '{print $5}')"
    echo ""
    echo "📋 Package contents:"
    unzip -l "$ZIP_NAME"
    echo ""
    echo "🎯 Next steps:"
    echo "1. Go to Chrome Web Store Developer Dashboard: https://chrome.google.com/webstore/devconsole"
    echo "2. Pay the $5 developer registration fee (one-time)"
    echo "3. Click 'Add new item'"
    echo "4. Upload $ZIP_NAME"
    echo "5. Fill out store listing using store-assets/STORE_DESCRIPTION.md"
    echo "6. Add privacy policy URL (host store-assets/PRIVACY_POLICY.md online)"
    echo "7. Follow the complete guide in store-assets/PUBLISHING_GUIDE.md"
else
    echo "❌ Failed to create extension package"
    exit 1
fi 