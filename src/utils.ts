import * as vscode from "vscode";

export function getSelectedText(): string | null {
  const { activeTextEditor } = vscode.window;
  if (!activeTextEditor) {
    vscode.window.showInformationMessage("No active text editor.");
    return null;
  }

  const text = activeTextEditor.document.getText(activeTextEditor.selection);
  if (!text) {
    vscode.window.showInformationMessage("No text selected.");
    return null;
  }

  return text;
}
