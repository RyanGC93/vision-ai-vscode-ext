import * as vscode from "vscode";
import * as path from "path";

export class FileViewProvider {
  private context: vscode.ExtensionContext;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public async showFileSelectionDialog() {
    const options: vscode.OpenDialogOptions = {
      canSelectMany: false,
      openLabel: "Select File",
      filters: { "All Files": ["*"] },
    };

    try {
      const fileUri = await vscode.window.showOpenDialog(options);
      if (fileUri && fileUri[0]) {
        this.openFile(fileUri[0].fsPath);
      }
    } catch (error) {
      console.error("Error during file selection:", error);
      vscode.window.showErrorMessage("An error occurred while selecting a file.");
    }
  }

  private openFile(filePath: string) {
    vscode.workspace.openTextDocument(filePath).then((document) => {
      vscode.window.showTextDocument(document);
    });
  }
}
