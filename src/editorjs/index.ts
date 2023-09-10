import { EditorConfig } from "@editorjs/editorjs";
import { tools } from "./tools";
import { i18n } from "./i18n";

export const config: EditorConfig = {
  holder: "app-editor",
  tools,
  i18n,
};
