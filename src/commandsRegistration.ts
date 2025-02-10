import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";
import { handleCommand } from "./commandHandlers";

export function registerCommands(context: vscode.ExtensionContext, sidebarProvider: SidebarProvider) {
  const commands = [
    { name: "vision.explainSelection", type: "explain-selection" },
    { name: "vision.suggestComment", type: "add-relevant-comment" },
    { name: "vision.getSuggestedPlan", type: "suggested-plan" },
    { name: "vision.explainTest", type: "suggested-test" },
    { name: "vision.promptSelection", type: "prompt-selection" },
    { name: "vision.fileView", type: "file-view" } // Added new command
  ];

  // Register all commands
  for (const cmd of commands) {
    context.subscriptions.push(
      vscode.commands.registerCommand(cmd.name, () => handleCommand(cmd.type, sidebarProvider))
    );
  }

  // Register text insertion command separately
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand("insertTextAtCursor", (editor, edit, text) => {
      console.log("insertTextAtCursor", text);
      editor.selections.forEach(selection => edit.insert(selection.active, text));
    })
  );

  // Create and register status bar button
  const explainSelectionButton = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  explainSelectionButton.text = "$(comment-discussion) Explain Code";
  explainSelectionButton.command = "vision.explainSelection";
  explainSelectionButton.show();
  context.subscriptions.push(explainSelectionButton);
}
