import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { getSelectedText } from "./utils";
import { API_KEY } from "./config";

export function handleCommand(type: string, sidebarProvider: SidebarProvider) {
  if (!API_KEY) {
    vscode.window.showInformationMessage("No API key set. Please configure it in the extension settings.");
    return;
  }

  const text = getSelectedText();
  const language = vscode.window.activeTextEditor?.document.languageId;

  switch (type) {
    case "explain-selection":
    case "add-relevant-comment":
    case "suggested-plan":
    case "suggested-test":
    case "prompt-selection":
      if (!text) return;
      vscode.commands.executeCommand("workbench.view.extension.vision-sidebar-view");
      sidebarProvider._view?.webview.postMessage({
        type,
        value: { text, language, apikey: API_KEY },
      });
      break;

    case "file-view":
      // Handle file view logic
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor detected.");
        return;
      }
      const document = editor.document;
      const fileContent = document.getText();
      vscode.commands.executeCommand("workbench.view.extension.vision-sidebar-view");
      sidebarProvider._view?.webview.postMessage({
        type,
        value: { content: fileContent, language, apikey: API_KEY },
      });
      break;

    default:
      vscode.window.showErrorMessage(`Unknown command type: ${type}`);
  }
}
