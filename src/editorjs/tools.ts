import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";

type Tools = {
  [toolName: string]: ToolConstructable | ToolSettings;
};

export const tools: Tools = {};
