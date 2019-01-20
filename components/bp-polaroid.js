import spreadAttributes from "../js/spreadAttributes.js";

class Polaroid extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host {
            display: block;
            border: var(--spacing-8) solid var(--white);
            box-shadow: 0 var(--spacing-4) var(--spacing-8) var(--mask-color);
        }`;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <slot></slot>
        `;
  }
}

customElements.define("bp-polaroid", Polaroid);
