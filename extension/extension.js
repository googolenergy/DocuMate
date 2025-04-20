const vscode = require('vscode');
const fs = require('fs');
const path = require('path');
const { clearAllCollections, insertAllData } = require('./parsemongo');

function activate(context) {
  let disposable = vscode.commands.registerCommand('documate.generateDocs', async function () {
    vscode.window.showInformationMessage('DocuMate: Starting documentation process...');

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage('No workspace folder found.');
      return;
    }

    const rootPath = workspaceFolders[0].uri.fsPath;
    const mainJsonPath = path.join(rootPath, 'docs.json');

    try {
      if (!fs.existsSync(mainJsonPath)) {
        vscode.window.showErrorMessage('docs.json not found in root directory.');
        return;
      }

      const jsonData = JSON.parse(fs.readFileSync(mainJsonPath, 'utf-8'));

      await clearAllCollections();

      await insertAllData(jsonData);

      vscode.window.showInformationMessage('DocuMate: Documentation inserted successfully.');
    } catch (err) {
      vscode.window.showErrorMessage('Error processing documentation.');
      console.error(err);
    }
  });

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
};
