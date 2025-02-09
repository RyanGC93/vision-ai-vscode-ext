import * as vscode from "vscode";
import { SidebarProvider } from "./SidebarProvider";

const apikey = 'AIzaSyBjfOPlVrvW_mkq4fIecXLfbZRTPjTLYpo'

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider("vision-sidebar", sidebarProvider)
  );

  const explainSelectionButton = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left
  );

  explainSelectionButton.text = "$(comment-discussion) Explain Code";
  explainSelectionButton.command = "vision.explainSelection";
  explainSelectionButton.show();

  // Register a command to insert text at the cursor position
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      "insertTextAtCursor",
      (editor, edit, text) => {
        console.log("insertTextAtCursor", text);
        editor.selections.forEach((selection) => {
          edit.insert(selection.active, text);
        });
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vision.explainSelection", () => {
      if (!apikey) {
        vscode.window.showInformationMessage(
          "No API key set. Please set your API key in the Vision extension settings."
        );
        return;
      }

      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active text editor");
        return;
      }

      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      if (!text) {
        vscode.window.showInformationMessage("No text selected");
        return;
      }

      vscode.commands.executeCommand(
        "workbench.view.extension.vision-sidebar-view"
      );

      const language = activeTextEditor.document.languageId;

      sidebarProvider._view?.webview.postMessage({
        type: "explain-selection",
        value: {
          text: text,
          language: language,
          apikey: apikey,
        },
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vision.suggestComment", () => {
      if (!apikey) {
        vscode.window.showInformationMessage(
          "No API key set. Please set your API key in the Vision extension settings."
        );
        return;
      }

      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active text editor");
        return;
      }

      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      if (!text) {
        vscode.window.showInformationMessage("No text selected");
        return;
      }

      vscode.commands.executeCommand(
        "workbench.view.extension.vision-sidebar-view"
      );

      const language = activeTextEditor.document.languageId;

      sidebarProvider._view?.webview.postMessage({
        type: "add-relevant-comment",
        value: {
          text: text,
          language: language,
          apikey: apikey,
        },
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vision.getSuggestedPlan", () => {
      if (!apikey) {
        vscode.window.showInformationMessage(
          "No API key set. Please set your API key in the Vision extension settings."
        );
        return;
      }

      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active text editor");
        return;
      }

      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      if (!text) {
        vscode.window.showInformationMessage("No text selected");
        return;
      }

      vscode.commands.executeCommand(
        "workbench.view.extension.vision-sidebar-view"
      );

      const language = activeTextEditor.document.languageId;

      sidebarProvider._view?.webview.postMessage({
        type: "suggested-plan",
        value: {
          text: text,
          language: language,
          apikey: apikey,
        },
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vision.explainTest", () => {
      if (!apikey) {
        vscode.window.showInformationMessage(
          "No API key set. Please set your API key in the Vision extension settings."
        );
        return;
      }

      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active text editor");
        return;
      }

      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      if (!text) {
        vscode.window.showInformationMessage("No text selected");
        return;
      }

      vscode.commands.executeCommand(
        "workbench.view.extension.vision-sidebar-view"
      );

      const language = activeTextEditor.document.languageId;

      sidebarProvider._view?.webview.postMessage({
        type: "suggested-test",
        value: {
          text: text,
          language: language,
          apikey: apikey,
        },
      });
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("vision.promptSelection", () => {
      if (!apikey) {
        vscode.window.showInformationMessage(
          "No API key set. Please set your API key in the Vision extension settings."
        );
        return;
      }

      const { activeTextEditor } = vscode.window;

      if (!activeTextEditor) {
        vscode.window.showInformationMessage("No active text editor");
        return;
      }

      const text = activeTextEditor.document.getText(
        activeTextEditor.selection
      );

      if (!text) {
        vscode.window.showInformationMessage("No text selected");
        return;
      }

      vscode.commands.executeCommand(
        "workbench.view.extension.vision-sidebar-view"
      );

      const language = activeTextEditor.document.languageId;

      sidebarProvider._view?.webview.postMessage({
        type: "prompt-selection",
        value: {
          text: text,
          language: language,
          apikey: apikey,
        },
      });
    })
  );
}

export function deactivate() {}