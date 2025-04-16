# DocuMate

<img src="./assets/documate_banner.png" alt="DocuMate Banner" width="700">

**DocuMate** is a VS Code extension that automatically extracts and uploads function-level documentation from your JavaScript project into MongoDB. It parses comments between custom tags and stores function details, parameters, tags, and more in a database.

## Prerequisites:
- <a href="https://code.visualstudio.com/" target="blank">Visual Studio Code</a>
- <a href="https://nodejs.org/en/" target="blank">NodeJS</a>
- MongoDB running locally on **mongodb://localhost:27017**

## Download:
Download **DocuMate (v1.0.0)** from <a href="https://drive.google.com/file/d/1kV7xLrz04z5wD6kOXAFY3KgAZqTDcKyB/view?usp=sharing">here.</a>

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

