import spreadAttributes from "../js/spreadAttributes.js";

class Polaroid extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host {
            display: block;
            border: 5px solid var(--white);
            box-shadow: 0 4px 6px rgba(0,0,0,.3);
        }`;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <slot></slot>
        `;
  }
}

customElements.define("bp-polaroid", Polaroid);
