import EditorJS from "@editorjs/editorjs";
import { config } from "./editorjs";

const editor = new EditorJS(config);

const buttonPost = document.getElementById("button-post");

buttonPost!.addEventListener("click", async () => {
  const output = await editor.save();
  console.log(output);
});
