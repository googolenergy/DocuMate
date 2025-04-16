# DocuMate
DocuMate is a VS Code extension that automatically extracts and uploads function-level documentation from your JavaScript project into MongoDB. It parses comments between custom tags and stores function details, parameters, tags, and more in a database.

## Prerequisites:
- <a href="https://code.visualstudio.com/" target="blank">Visual Studio Code</a>
- <a href="https://nodejs.org/en/" target="blank">NodeJS</a>
- MongoDB running locally on __mongodb://localhost:27017__

## Features:
- Scan all JS files for special doc tags.
- Extract 7 categories of documentation.
- Automatically clear and update MongoDB collections.
- Supports real-time documentation updates.

## Usage

1. Add special comments to your JS files:
   ```js
   // --documate.start(funcName)
   function funcName() { ... }
   // --documate.end(funcName)
