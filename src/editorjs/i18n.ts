import { I18nConfig } from "@editorjs/editorjs";

export const i18n: I18nConfig = {
  messages: {
    ui: {
      blockTunes: {
        toggler: {
          "Click to tune": "クリックして調整",
          "or drag to move": "ドラッグして移動",
        },
      },
      popover: {
        Filter: "探す",
        "Nothing found": "見つかりません",
      },
      toolbar: {
        toolbox: {
          Add: "追加",
        },
      },
    },
    blockTunes: {
      delete: {
        "Click to delete": "クリックして削除",
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
};
