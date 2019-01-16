import spreadAttributes from "../js/spreadAttributes.js";

class Image extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        img {
            width: 100%;
            height: auto;
        }`;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <img ${spreadAttributes(this.attributes)} />
        `;
  }
}

customElements.define("bp-image", Image);
