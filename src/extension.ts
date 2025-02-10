import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";
import { SidebarProvider } from "./SidebarProvider";
import { FileViewProvider } from "./FileViewProvider";
import { registerCommands } from "./commandsRegistration";

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);
  const fileViewProvider = new FileViewProvider(context);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vision-sidebar", sidebarProvider)
  );

  // Call file selection & rendering
  fileViewProvider.showFileSelectionDialog();

  // Initialize and register all commands
  registerCommands(context, sidebarProvider);
}

export function deactivate() {}
