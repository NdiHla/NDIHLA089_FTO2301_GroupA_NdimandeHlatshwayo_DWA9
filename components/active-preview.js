// @ts-check
/* eslint-disable import/extensions */
/* eslint-disable no-restricted-syntax */

import { authors, books } from "../modules/data.js";

const template = document.createElement("template");

template.innerHTML = /* html */ `
<style>
    * {
    box-sizing: border-box;
    }

    @keyframes enter {
        from {
            transform: translateY(10rem);
        }
        to {
            transform: translateY(0);
        }
    }

    .wrapper {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    border-width: 0;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    animation-name: enter;
    animation-duration: 0.6s;
    z-index: 10;
    background-color: rgba(var(--color-light), 1);
    }

    @media (min-width: 30rem) {
    .wrapper {
        max-width: 30rem;
        left: 0%;
        top: 0;
        border-radius: 8px;;
        }
    }

    .preview {
    overflow: hidden;
    margin: -1rem;
    display: flex;
    align-items: center;
    justify-content: center;
    }

    .blur {
    width: 100%;
    height: 200px;
    filter: blur(10px);
    opacity: 0.5;
    transform: scale(2);
    }

    .image {
    max-width: 10rem;
    position: absolute;
    top: 1.5m;
    left: calc(50% - 5rem);
    border-radius: 2px;
    box-shadow: 0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12);
    }

    .content {
    padding: 2rem 1.5rem;
    text-align: center;
    padding-top: 3rem;
    }

    .title {
    padding: 1rem 0 0.25rem;
    font-size: 1.25rem;
    font-weight: bold;
    line-height: 1;
    letter-spacing: -0.1px;
    max-width: 25rem;
    margin: 0 auto;
    color: rgba(var(--color-dark), 0.8)
    }

    .data {
    font-size: 0.9rem;
    display: -webkit-box;
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;  
    overflow: hidden;
    color: rgba(var(--color-dark), 0.8)
    }

    .data_secondary {
    color: rgba(var(--color-dark), 0.6)
    }

    .row {
    display: flex;
    gap: 0.5rem;
    margin: 0 auto;
    justify-content: center;
    }

    .button {
    font-family: Roboto, sans-serif;
    background-color: rgba(var(--color-blue), 0.1);
    transition: background-color 0.1s;
    border-width: 0;
    border-radius: 6px;
    height: 2.75rem;
    cursor: pointer;
    width: 50%;
    color: rgba(var(--color-blue), 1);
    font-size: 1rem;
    border: 1px solid rgba(var(--color-blue), 1);
    }

    .button_primary {
    background-color: rgba(var(--color-blue), 1);
    color: rgba(var(--color-force-light), 1);
    }

    .button:hover {
    background-color: rgba(var((var(--color-blue))), 0.2);
    }

    .button_primary:hover {
    background-color: rgba(var(--color-blue), 0.8);
    color: rgba(var(--color-force-light), 1);
    }
</style>

<dialog class="wrapper" data-list-active>
    <div class="preview">
        <img class="blur" data-list-blur src=""/>
        <img class="image" data-list-image src=""/>
    </div>

    <div class="content">
        <h3 class="title" data-list-title></h3>
        <div class="data" data-list-subtitle></div>
        <p class="data data_secondary" data-list-description></p>
    </div>

    <div class="row">
        <button class="button button_primary" data-list-close>Close</button>
    </div>
</dialog>
`;

class ActivePreview extends HTMLElement {
  #event = undefined;

  /**
   * @type {Object}
   */
  #elements = {
    overlay: undefined,
    blur: undefined,
    image: undefined,
    title: undefined,
    subtitle: undefined,
    description: undefined,
    close: undefined,
  };

  /**
   * @type {ShadowRoot}
   */
  #inner = this.attachShadow({ mode: "open" });

  constructor() {
    super();
    const { content } = template;
    this.#inner.appendChild(content.cloneNode(true));
  }

  connectedCallback() {
    this.#elements = {
      overlay: this.#inner.querySelector("[data-list-active]"),
      blur: this.#inner.querySelector("[data-list-blur]"),
      image: this.#inner.querySelector("[data-list-image]"),
      title: this.#inner.querySelector("[data-list-title]"),
      subtitle: this.#inner.querySelector("[data-list-subtitle]"),
      description: this.#inner.querySelector("[data-list-description]"),
      close: this.#inner.querySelector("[data-list-close]"),
    };

    this.#elements.close.addEventListener("click", () => {
      this.#elements.overlay.open = false;
    });
  }

  get event() {
    return this.#event;
  }

  /**
   * @param {Object} event - triggered by event listener on book preview clicked
   */
  set event(event) {
    const pathArray = Array.from(event.path || event.composedPath());
    let active = null;
    for (const node of pathArray) {
      if (active) break;

      if (node?.dataset?.preview) {
        let result = null;

        for (const singleBook of books) {
          if (result) break;
          if (singleBook.id === node?.dataset?.preview) result = singleBook;
        }

        active = result;
      }
    }

    this.#elements.blur.src = active.image;
    this.#elements.image.src = active.image;
    this.#elements.title.innerText = active.title;
    this.#elements.subtitle.innerText = `${authors[active.author]} (${new Date(
      active.published
    ).getFullYear()})`;
    this.#elements.description.innerText = active.description;

    this.#elements.overlay.open = true;
  }
}

customElements.define("active-preview", ActivePreview);
