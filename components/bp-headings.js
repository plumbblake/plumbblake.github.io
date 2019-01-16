import spreadAttributes from "../js/spreadAttributes.js";

class H1 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        h1 {
            margin: 0;
            font-size: 64px;
            line-height: 1.2;
        }    
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <h1 ${spreadAttributes(this.attributes)}><slot></slot></h1>
        `;
  }
}

customElements.define("bp-heading1", H1);
