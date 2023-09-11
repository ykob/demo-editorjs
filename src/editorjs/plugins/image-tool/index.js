import "./index.css";
import { IconPicture } from "@codexteam/icons";
import { make } from "../../utils";

export default class SimpleImage {
  constructor({ data, config, api, readOnly }) {
    this.api = api;
    this.readOnly = readOnly;
    this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;
    this.CSS = {
      baseClass: this.api.styles.block,
      loading: this.api.styles.loader,
      input: this.api.styles.input,
      wrapper: "cdx-simple-image",
      imageHolder: "cdx-simple-image__picture",
    };
    this.nodes = {
      wrapper: null,
      imageHolder: null,
      image: null,
      loadButton: null,
    };
    this.data = {
      url: data.url || "",
      caption: data.caption || "",
    };
    this.isDropped = false;
  }
  get data() {
    return this._data;
  }
  set data(data) {
    this._data = Object.assign({}, this.data, data);

    if (this.nodes.image) {
      this.nodes.image.src = this.data.url;
    }

    if (this.nodes.caption) {
      this.nodes.caption.innerHTML = this.data.caption;
    }
  }
  static get isReadOnlySupported() {
    return true;
  }
  onDropHandler(file) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    return new Promise((resolve) => {
      reader.onload = (event) => {
        resolve({
          url: event.target.result,
          caption: file.name,
        });
      };
    });
  }
  onPaste(event) {
    this.isDropped = true;
    switch (event.type) {
      case "tag": {
        const img = event.detail.data;

        this.data = {
          url: img.src,
        };
        break;
      }
      case "pattern": {
        const { data: text } = event.detail;

        this.data = {
          url: text,
        };
        break;
      }
      case "file": {
        const { file } = event.detail;

        this.onDropHandler(file).then((data) => {
          this.data = data;
        });
        break;
      }
    }
  }
  static get pasteConfig() {
    return {
      patterns: {
        image: /https?:\/\/\S+\.(gif|jpe?g|tiff|png|webp)$/i,
      },
      tags: [
        {
          img: { src: true },
        },
      ],
      files: {
        mimeTypes: ["image/*"],
      },
    };
  }
  render() {
    const wrapper = make("div", [this.CSS.baseClass, this.CSS.wrapper]),
      loader = make("div", this.CSS.loading),
      loadButton = make("input", [], {
        type: "file",
        accept: "image/*",
      }),
      imageHolder = make("div", this.CSS.imageHolder),
      image = make("img");

    if (this.data.url) {
      image.src = this.data.url;
    } else {
      wrapper.appendChild(loadButton);
      loadButton.onchange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);

        this.data = {
          url: url,
          caption: file.name,
        };

        loadButton.remove();
      };
    }

    image.onload = () => {
      wrapper.classList.remove(this.CSS.loading);
      imageHolder.appendChild(image);
      wrapper.appendChild(imageHolder);
      loader.remove();
      loadButton.remove();
    };

    image.onerror = (e) => {
      api.Notifies.show("Failed to load an image");
    };

    this.nodes.imageHolder = imageHolder;
    this.nodes.wrapper = wrapper;
    this.nodes.image = image;

    return wrapper;
  }
  save(blockContent) {
    const image = blockContent.querySelector("img"),
      caption = blockContent.querySelector("." + this.CSS.input);

    if (!image) {
      return this.data;
    }

    return Object.assign(this.data, {
      url: image.src,
      caption: caption.innerHTML,
    });
  }
  static get sanitize() {
    return {
      url: {},
      caption: {
        br: true,
      },
    };
  }
  static get toolbox() {
    return {
      icon: IconPicture,
      title: "画像",
    };
  }
}
