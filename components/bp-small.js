class Small extends HTMLElement {
  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    const styles = `
        :host {
            margin-top: 32px;
            display: block;
            font-size: 0.7em;
            line-height: 1.2;
        }    
    `;

    shadowRoot.innerHTML = `
            <style>${styles}</style>
            <slot></slot>
        `;
  }
}

customElements.define("bp-small", Small);
