import spreadAttributes from "../js/spreadAttributes.js";

class Text1 extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host {
            margin: 0;
            font-size: 28px;
            line-height: 1.2;
        }  

        @media(min-width: 600px) {
            :host {
                font-size: 32px;
            }
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
