import spreadAttributes from "../js/spreadAttributes.js";

class Text1 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host {
            margin: 0;
            font-size: var(--font-size-18);
            line-height: 1.2;
        }  
           
        :host([center]) {
            text-align: center;
        }
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <slot></slot>
        `;
  }
}

customElements.define("bp-text1", Text1);
