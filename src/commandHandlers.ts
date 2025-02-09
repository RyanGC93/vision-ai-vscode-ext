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
  if (!text) return;

  vscode.commands.executeCommand("workbench.view.extension.vision-sidebar-view");

  const language = vscode.window.activeTextEditor?.document.languageId;
  sidebarProvider._view?.webview.postMessage({
    type: type,
    value: { text, language, apikey: API_KEY },
  });
}
