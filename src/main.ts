import EditorJS from "@editorjs/editorjs";

const editor = new EditorJS({
  holder: "app-editor",
  defaultBlock: "paragraph",
  i18n: {
    messages: {
      ui: {
        popover: {
          Filter: "探す",
          "Nothing found": "見つかりません",
        },
      },
      blockTunes: {
        delete: {
          Delete: "削除",
        },
        moveUp: {
          "Move up": "上へ",
        },
        moveDown: {
          "Move down": "下へ",
        },
      },
      toolNames: {
        Text: "テキスト",
        Heading: "見出し",
        List: "リスト",
        Link: "リンク",
        Bold: "太字",
        Italic: "斜体",
      },
    },
  },
});
