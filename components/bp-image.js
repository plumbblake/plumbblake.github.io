import spreadAttributes from "../js/spreadAttributes.js";

class Image extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        img {
            display: block;
            width: 100%;
            height: auto;
            aspect-ratio: ${this.getAttribute("aspect-ratio") || "auto"};
        }`;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <img ${spreadAttributes(this.attributes, ["aspect-ratio"])} />
        `;
  }
}

customElements.define("bp-image", Image);
