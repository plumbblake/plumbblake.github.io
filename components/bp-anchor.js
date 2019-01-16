import spreadAttributes from "../js/spreadAttributes.js";

class Anchor extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        a {
            color: var(--white);
            text-decoration: none;
        }

        a:hover {
            color: var(--primary-color);
        }
        
        :host([active]) a {
            color: var(--primary-color);
        }

        `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <a ${spreadAttributes(this.attributes)}><slot></slot></a>
        `;
  }
}

customElements.define("bp-anchor", Anchor);
