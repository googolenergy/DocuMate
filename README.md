# DocuMate

<img src="./assets/documate_banner.png" alt="DocuMate Banner" width="700">

**DocuMate** is a VS Code extension that automatically extracts and uploads function-level documentation from your JavaScript project into MongoDB. It parses comments between custom tags and stores function details, parameters, tags, and more in a database.

## Prerequisites:
- <a href="https://code.visualstudio.com/" target="blank">Visual Studio Code</a>
- <a href="https://nodejs.org/en/" target="blank">NodeJS</a>
- MongoDB running locally on `mongodb://localhost:27017`

## Downloads:
Download **DocuMate (v1.0.0)** from <a href="https://drive.google.com/file/d/1kV7xLrz04z5wD6kOXAFY3KgAZqTDcKyB/view?usp=sharing">here.</a>

## Installation:
`code --install-extension documate-1.0.0.vsix`

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
```

2. Writing the actual documentation with JSON:

```json
{
  "functions": [
    {
      "id": 1,
      "library_id": 100,
      "name": "calculateLapTime",
      "description": "Calculates the total lap time by summing the three sector times.",
      "return_type": "float",
      "created_by": "max_verstappen",
      "created_at": "2025-04-20T10:00:00Z"
    }
  ],
  "parameters": [
    {
      "id": 1,
      "function_id": 1,
      "name": "sector1",
      "type": "float",
      "description": "Time in seconds for sector 1"
    },
    {
      "id": 2,
      "function_id": 1,
      "name": "sector2",
      "type": "float",
      "description": "Time in seconds for sector 2"
    },
    {
      "id": 3,
      "function_id": 1,
      "name": "sector3",
      "type": "float",
      "description": "Time in seconds for sector 3"
    }
  ],
  "examples": [
    {
      "id": 1,
      "function_id": 1,
      "code": "calculateLapTime(30.5, 32.1, 28.7);",
      "description": "Compute lap time for given sector splits"
    }
  ],
  "developers": [
    {
      "id": 1,
      "name": "Max Verstappen",
      "email": "max.verstappen@redbullracing.com",
      "username": "max_v"
    }
  ],
  "tags": [
    {
      "id": 1,
      "name": "performance"
    },
    {
      "id": 2,
      "name": "telemetry"
    }
  ],
  "function_tags": [
    {
      "id": 1,
      "function_id": 1,
      "tag_id": 1
    },
    {
      "id": 2,
      "function_id": 1,
      "tag_id": 2
    }
  ],
  "libraries": [
    {
      "id": 100,
      "name": "F1TelemetryLib",
      "version": "2.3.1",
      "description": "Utility library for processing F1 telemetry data."
    }
  ]
}

```
## Writing the documentation with JSON

Create a file named `docs.json` at the **root** of your project and paste in the JSON snippet shown above.

### How to use this JSON

1. **Create the file**  
   At your project’s root, add a file called `docs.json`.

2. **Copy the sample**  
   Copy the provided JSON object (the one under “Writing the actual documentation with JSON”) into `docs.json`.

3. **Customize each section**  
   - **functions**: one object per function, including all fields (`id`, `library_id`, `name`, etc.).  
   - **parameters**: list each parameter object, referencing `function_id`.  
   - **examples**: add example usage objects with `code` and `description`.  
   - **developers**: include developer profiles (`id`, `name`, `email`, `username`).  
   - **tags**: define each tag with `id` and `name`.  
   - **function_tags**: link functions to tags by `function_id` and `tag_id`.  
   - **libraries**: describe each library (`id`, `name`, `version`, `description`).

4. **Run the extension**  
   - Open the Command Palette (`Ctrl+Shift+P` / `⌘+Shift+P`).  
   - Type and select **Generate Documentation**.  

   The extension will:
   1. **Clear** all existing MongoDB collections.  
   2. **Insert** every object from your `docs.json` into its matching collection (`functions`, `parameters`, etc.).

5. **Verify** in MongoDB Compass  
   Open your `docu-mate-db` and confirm that all seven collections are populated with your data.  

---
Author: Abhiram A
