import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { registerCommands } from "./commandsRegistration";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vision-sidebar", sidebarProvider)
  );

  // Initialize and register all commands
  registerCommands(context, sidebarProvider);
}

export function deactivate() {}
