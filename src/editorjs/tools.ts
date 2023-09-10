import { ToolConstructable, ToolSettings } from "@editorjs/editorjs";
// @ts-ignore
import { ImageTool } from "./plugins";

type Tools = {
  [toolName: string]: ToolConstructable | ToolSettings;
};

export const tools: Tools = {
  image: ImageTool,
};
